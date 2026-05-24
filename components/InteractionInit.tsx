"use client";

import { useEffect } from "react";

/**
 * InteractionInit — wires up all client-side micro-interactions.
 *
 * Effects:
 *  1. Button click ripple (existing)
 *  2. Magnetic hover (existing)
 *  3. Tilt cards (existing)
 *  4. Counter animation (existing)
 *  5. Scroll reveal — now also handles reveal-left / reveal-right / reveal-scale / reveal-blur / reveal-rotate
 *  6. Scroll progress bar
 *  7. Cursor glow that follows the pointer
 *  8. Parallax — elements with [data-parallax="<speed>"]
 *  9. Click particle burst
 * 10. Image hover shimmer (class added automatically)
 */
export function InteractionInit() {
  useEffect(() => {
    // ─────────────────────────────────────────────
    // 1. Scroll progress bar
    // ─────────────────────────────────────────────
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    document.body.appendChild(progressBar);

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      progressBar.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    // ─────────────────────────────────────────────
    // 2. Cursor glow
    // ─────────────────────────────────────────────
    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    document.body.appendChild(glow);

    let glowX = window.innerWidth / 2;
    let glowY = window.innerHeight / 2;
    let glowTargetX = glowX;
    let glowTargetY = glowY;
    let glowRaf: number;

    const tickGlow = () => {
      glowX += (glowTargetX - glowX) * 0.09;
      glowY += (glowTargetY - glowY) * 0.09;
      glow.style.left = `${glowX}px`;
      glow.style.top  = `${glowY}px`;
      glowRaf = requestAnimationFrame(tickGlow);
    };
    tickGlow();

    const updateGlow = (e: PointerEvent) => {
      glowTargetX = e.clientX;
      glowTargetY = e.clientY;
      // Detect if hovering over a dark bg — flip blend mode
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (el) {
        const bg = getComputedStyle(el).backgroundColor;
        const isDark = bg.includes("rgb(3") || bg.includes("rgb(2") || bg.includes("rgb(1");
        glow.classList.toggle("is-over-dark", isDark);
      }
    };
    window.addEventListener("pointermove", updateGlow, { passive: true });

    // ─────────────────────────────────────────────
    // 3. Button click ripples
    // ─────────────────────────────────────────────
    const handlePointerDown = (e: PointerEvent) => {
      const btn = (e.target as Element).closest(".btn") as HTMLElement | null;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const rx = ((e.clientX - rect.left) / rect.width) * 100;
      const ry = ((e.clientY - rect.top) / rect.height) * 100;
      btn.style.setProperty("--rx", rx + "%");
      btn.style.setProperty("--ry", ry + "%");
      btn.classList.remove("is-pressed");
      void btn.offsetWidth;
      btn.classList.add("is-pressed");
      setTimeout(() => btn.classList.remove("is-pressed"), 600);
    };
    document.addEventListener("pointerdown", handlePointerDown);

    // ─────────────────────────────────────────────
    // 4. Click particle burst
    // ─────────────────────────────────────────────
    const PARTICLE_COLORS = ["#B9533A", "#B58A4F", "#8E3A26", "#D4B27A", "#E3A992", "#3D5848"];
    const PARTICLE_COUNT  = 8;

    const spawnParticles = (x: number, y: number) => {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = document.createElement("div");
        p.className = "click-particle";
        const angle    = (Math.PI * 2 / PARTICLE_COUNT) * i + Math.random() * 0.4;
        const dist     = 28 + Math.random() * 40;
        const dx       = Math.cos(angle) * dist;
        const dy       = Math.sin(angle) * dist;
        const color    = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
        const size     = 4 + Math.random() * 5;

        p.style.left   = `${x}px`;
        p.style.top    = `${y}px`;
        p.style.width  = `${size}px`;
        p.style.height = `${size}px`;
        p.style.background = color;
        p.style.setProperty("--particle-travel", `translate(${dx}px, ${dy}px)`);
        p.style.animationDelay = `${Math.random() * 0.08}s`;
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 800);
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Only burst on interactive elements for satisfying feedback
      const el = e.target as Element;
      if (el.closest(".btn, .card-hover, .lift-on-hover, .spring-press, [data-burst]")) {
        spawnParticles(e.clientX, e.clientY);
      }
    };
    document.addEventListener("click", handleClick);

    // ─────────────────────────────────────────────
    // 5. Magnetic hover
    // ─────────────────────────────────────────────
    const handlePointerMove = (e: PointerEvent) => {
      document
        .querySelectorAll<HTMLElement>("[data-magnetic]")
        .forEach((el) => {
          const rect  = el.getBoundingClientRect();
          const cx    = rect.left + rect.width / 2;
          const cy    = rect.top + rect.height / 2;
          const dx    = e.clientX - cx;
          const dy    = e.clientY - cy;
          const dist  = Math.hypot(dx, dy);
          const max   = parseInt(el.dataset.magnetic ?? "80");
          if (dist < max) {
            const strength = (max - dist) / max;
            el.style.transform = `translate(${dx * 0.18 * strength}px, ${dy * 0.18 * strength}px)`;
          } else {
            el.style.transform = "";
          }
        });
    };
    document.addEventListener("pointermove", handlePointerMove);

    // ─────────────────────────────────────────────
    // 6. Tilt cards
    // ─────────────────────────────────────────────
    const attachTilt = () => {
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
        if ((el as HTMLElement & { __tiltAttached?: boolean }).__tiltAttached) return;
        (el as HTMLElement & { __tiltAttached?: boolean }).__tiltAttached = true;
        const max = parseFloat(el.dataset.tilt ?? "6");
        const onMove = (e: PointerEvent) => {
          const rect = el.getBoundingClientRect();
          const px   = (e.clientX - rect.left) / rect.width;
          const py   = (e.clientY - rect.top)  / rect.height;
          const rx   = (0.5 - py) * max;
          const ry   = (px - 0.5) * max;
          el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(4px)`;
        };
        const onLeave = () => { el.style.transform = ""; };
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
      });
    };

    // ─────────────────────────────────────────────
    // 7. Parallax scrolling
    // ─────────────────────────────────────────────
    const updateParallax = () => {
      const sy = window.scrollY;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax ?? "0.3");
        el.style.transform = `translateY(${sy * speed}px)`;
      });
    };
    window.addEventListener("scroll", updateParallax, { passive: true });

    // ─────────────────────────────────────────────
    // 8. Counter animation
    // ─────────────────────────────────────────────
    const animateCounters = () => {
      document
        .querySelectorAll<HTMLElement>("[data-counter]:not(.counter-done)")
        .forEach((el) => {
          const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              el.classList.add("counter-done");
              const target   = parseFloat(el.dataset.counter ?? "0");
              const suffix   = el.dataset.suffix ?? "";
              const prefix   = el.dataset.prefix ?? "";
              const duration = 1200;
              const start    = performance.now();
              const tick = (now: number) => {
                const t      = Math.min(1, (now - start) / duration);
                const eased  = 1 - Math.pow(1 - t, 3);
                const v      = target * eased;
                el.textContent =
                  prefix +
                  (target >= 1000
                    ? Math.floor(v).toLocaleString()
                    : v.toFixed(1).replace(/\.0$/, "")) +
                  suffix;
                if (t < 1) requestAnimationFrame(tick);
              };
              requestAnimationFrame(tick);
              obs.disconnect();
            });
          }, { threshold: 0.4 });
          obs.observe(el);
        });
    };

    // ─────────────────────────────────────────────
    // 9. Scroll reveal — handles all variants
    // ─────────────────────────────────────────────
    const REVEAL_SELECTORS = [
      ".reveal:not(.visible)",
      ".reveal-left:not(.visible)",
      ".reveal-right:not(.visible)",
      ".reveal-scale:not(.visible)",
      ".reveal-blur:not(.visible)",
      ".reveal-rotate:not(.visible)",
    ].join(", ");

    const attachReveal = () => {
      const els = document.querySelectorAll(REVEAL_SELECTORS);
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("visible");
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -50px 0px" }
      );
      els.forEach((el) => obs.observe(el));
    };

    // ─────────────────────────────────────────────
    // 10. Auto-add shimmer to product images on hover
    // ─────────────────────────────────────────────
    const addShimmer = () => {
      document.querySelectorAll<HTMLElement>(".card-hover:not(.shimmer-hover)").forEach((el) => {
        el.classList.add("shimmer-hover");
      });
    };

    // ─────────────────────────────────────────────
    // Orchestrate
    // ─────────────────────────────────────────────
    const reattach = () => {
      attachTilt();
      animateCounters();
      attachReveal();
      addShimmer();
    };
    reattach();

    let timer: ReturnType<typeof setTimeout>;
    const mo = new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(reattach, 80);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("scroll", updateParallax);
      window.removeEventListener("pointermove", updateGlow);
      cancelAnimationFrame(glowRaf);
      progressBar.remove();
      glow.remove();
      mo.disconnect();
    };
  }, []);

  return null;
}
