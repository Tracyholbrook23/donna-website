"use client";

import { useEffect } from "react";

/**
 * CursorTrail — custom laser-dot cursor + ember particle trail.
 * Only activates on fine-pointer (mouse) devices; touch screens are unaffected.
 *
 * Visual design:
 *  • Small solid terracotta dot that snaps to the cursor instantly.
 *  • A slightly larger ring that lags behind (targeting-reticle feel).
 *  • Spark/ember particles in brand colours that scatter upward and fade.
 *  • Ring expands when hovering over links & buttons.
 */
export function CursorTrail() {
  useEffect(() => {
    // Skip on touch / stylus-only devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    /* ── Inject cursor:none globally ── */
    const style = document.createElement("style");
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    /* ── Cursor dot (snaps to mouse) ── */
    const dot = Object.assign(document.createElement("div"), {});
    Object.assign(dot.style, {
      position:      "fixed",
      width:         "8px",
      height:        "8px",
      background:    "var(--terracotta)",
      borderRadius:  "50%",
      pointerEvents: "none",
      zIndex:        "999999",
      transform:     "translate(-50%, -50%)",
      left:          "-100px",
      top:           "-100px",
      transition:    "width .15s, height .15s, background .2s",
      willChange:    "left, top",
      mixBlendMode:  "normal",
    });

    /* ── Cursor ring (lags behind) ── */
    const ring = Object.assign(document.createElement("div"), {});
    Object.assign(ring.style, {
      position:      "fixed",
      width:         "34px",
      height:        "34px",
      border:        "1.5px solid var(--terracotta)",
      borderRadius:  "50%",
      pointerEvents: "none",
      zIndex:        "999998",
      transform:     "translate(-50%, -50%)",
      left:          "-100px",
      top:           "-100px",
      opacity:       "0.65",
      transition:    "width .18s, height .18s, opacity .18s, border-color .2s",
      willChange:    "left, top",
    });

    document.body.appendChild(dot);
    document.body.appendChild(ring);

    /* ── Trail canvas ── */
    const canvas = document.createElement("canvas");
    Object.assign(canvas.style, {
      position:      "fixed",
      inset:         "0",
      width:         "100%",
      height:        "100%",
      pointerEvents: "none",
      zIndex:        "999996",
    });
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* Brand spark colours */
    const COLORS = [
      "#B9533A", "#B58A4F", "#D9836A",
      "#E3A992", "#8E3A26", "#D4B27A",
    ];

    type Spark = {
      x: number; y: number;
      vx: number; vy: number;
      life: number;   // 1 → 0
      decay: number;  // life lost per second
      size: number;
      color: string;
    };
    const sparks: Spark[] = [];

    /* Tracking state */
    let mx = -200, my = -200;
    let ringX = -200, ringY = -200;
    let spawnX = -200, spawnY = -200;
    let isHovering = false;

    /* ── Pointer move ── */
    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;

      // Dot snaps instantly
      dot.style.left = mx + "px";
      dot.style.top  = my + "px";

      // Spawn sparks based on distance travelled
      const dx   = mx - spawnX;
      const dy   = my - spawnY;
      const dist = Math.hypot(dx, dy);

      if (dist > 8) {
        const count = Math.min(Math.ceil(dist / 12), 5);
        for (let i = 0; i < count; i++) {
          const t = i / count;
          sparks.push({
            x:     spawnX + dx * t + (Math.random() - 0.5) * 4,
            y:     spawnY + dy * t + (Math.random() - 0.5) * 4,
            vx:    (Math.random() - 0.5) * 2.2,
            vy:    -(Math.random() * 2.4 + 0.6),
            life:  1,
            decay: 1.4 + Math.random() * 1.0,
            size:  1.8 + Math.random() * 3.2,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
          });
        }
        spawnX = mx;
        spawnY = my;
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    /* ── Hover state via delegation ── */
    const onOver = (e: Event) => {
      const el = (e.target as Element).closest("a, button, [role='button'], .btn");
      if (el && !isHovering) {
        isHovering = true;
        dot.style.width      = "12px";
        dot.style.height     = "12px";
        dot.style.background = "var(--brass)";
        ring.style.width     = "48px";
        ring.style.height    = "48px";
        ring.style.opacity   = "0.9";
        ring.style.borderColor = "var(--brass)";
      } else if (!el && isHovering) {
        isHovering = false;
        dot.style.width      = "8px";
        dot.style.height     = "8px";
        dot.style.background = "var(--terracotta)";
        ring.style.width     = "34px";
        ring.style.height    = "34px";
        ring.style.opacity   = "0.65";
        ring.style.borderColor = "var(--terracotta)";
      }
    };
    document.addEventListener("pointerover", onOver);

    /* ── Click pulse on ring ── */
    const onClick = () => {
      ring.style.transform = "translate(-50%, -50%) scale(1.6)";
      ring.style.opacity   = "0";
      setTimeout(() => {
        ring.style.transition = "none";
        ring.style.transform  = "translate(-50%, -50%) scale(1)";
        ring.style.opacity    = isHovering ? "0.9" : "0.65";
        // Force reflow then re-enable transition
        void ring.offsetWidth;
        ring.style.transition = "width .18s, height .18s, opacity .18s, border-color .2s, transform .3s";
      }, 320);
    };
    document.addEventListener("click", onClick);

    /* ── rAF loop ── */
    let lastTime = performance.now();
    let raf: number;

    const draw = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Lerp ring
      ringX += (mx - ringX) * 0.13;
      ringY += (my - ringY) * 0.13;
      ring.style.left = ringX + "px";
      ring.style.top  = ringY + "px";

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update + draw sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        p.life -= dt * p.decay;
        if (p.life <= 0) { sparks.splice(i, 1); continue; }

        p.x  += p.vx;
        p.y  += p.vy;
        p.vy += 0.08; // gravity
        p.vx *= 0.97; // drag

        const alpha = p.life * p.life;
        const r     = p.size * Math.max(p.life, 0.05);

        // Main spark dot
        ctx.globalAlpha = alpha * 0.9;
        ctx.fillStyle   = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();

        // Soft glow halo on larger sparks
        if (p.size > 3.5 && p.life > 0.4) {
          ctx.globalAlpha = alpha * 0.18;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      style.remove();
      dot.remove();
      ring.remove();
      canvas.remove();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
