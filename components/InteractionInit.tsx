"use client";

import { useEffect } from "react";

// Wires up button ripple, magnetic hover, tilt cards, and counter animations.
// Runs once on mount and re-runs whenever new DOM nodes appear (Next.js navigations).
export function InteractionInit() {
  useEffect(() => {
    // ── 1. Button click ripples ───────────────────
    const handlePointerDown = (e: PointerEvent) => {
      const btn = (e.target as Element).closest(".btn") as HTMLElement | null;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const rx = ((e.clientX - rect.left) / rect.width) * 100;
      const ry = ((e.clientY - rect.top) / rect.height) * 100;
      btn.style.setProperty("--rx", rx + "%");
      btn.style.setProperty("--ry", ry + "%");
      btn.classList.remove("is-pressed");
      void btn.offsetWidth; // force reflow so animation restarts
      btn.classList.add("is-pressed");
      setTimeout(() => btn.classList.remove("is-pressed"), 600);
    };
    document.addEventListener("pointerdown", handlePointerDown);

    // ── 2. Magnetic hover ────────────────────────
    const handlePointerMove = (e: PointerEvent) => {
      document
        .querySelectorAll<HTMLElement>("[data-magnetic]")
        .forEach((el) => {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const dist = Math.hypot(dx, dy);
          const max = parseInt(el.dataset.magnetic ?? "80");
          if (dist < max) {
            const strength = (max - dist) / max;
            el.style.transform = `translate(${dx * 0.15 * strength}px, ${dy * 0.15 * strength}px)`;
          } else {
            el.style.transform = "";
          }
        });
    };
    document.addEventListener("pointermove", handlePointerMove);

    // ── 3. Tilt cards ────────────────────────────
    const attachTilt = () => {
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
        if ((el as HTMLElement & { __tiltAttached?: boolean }).__tiltAttached)
          return;
        (el as HTMLElement & { __tiltAttached?: boolean }).__tiltAttached =
          true;
        const max = parseFloat(el.dataset.tilt ?? "6");
        const onMove = (e: PointerEvent) => {
          const rect = el.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width;
          const py = (e.clientY - rect.top) / rect.height;
          const rx = (0.5 - py) * max;
          const ry = (px - 0.5) * max;
          el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
        };
        const onLeave = () => {
          el.style.transform = "";
        };
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
      });
    };

    // ── 4. Counter animation ─────────────────────
    const animateCounters = () => {
      document
        .querySelectorAll<HTMLElement>(
          "[data-counter]:not(.counter-done)"
        )
        .forEach((el) => {
          const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              el.classList.add("counter-done");
              const target = parseFloat(el.dataset.counter ?? "0");
              const suffix = el.dataset.suffix ?? "";
              const prefix = el.dataset.prefix ?? "";
              const duration = 1200;
              const start = performance.now();
              const tick = (now: number) => {
                const t = Math.min(1, (now - start) / duration);
                const eased = 1 - Math.pow(1 - t, 3);
                const v = target * eased;
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

    // ── 5. Scroll reveal ─────────────────────────
    const attachReveal = () => {
      const els = document.querySelectorAll(".reveal:not(.visible)");
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("visible");
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
      );
      els.forEach((el) => obs.observe(el));
    };

    const reattach = () => {
      attachTilt();
      animateCounters();
      attachReveal();
    };

    reattach();

    // Re-run on DOM mutations (client-side navigations add new nodes)
    let timer: ReturnType<typeof setTimeout>;
    const mo = new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(reattach, 80);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointermove", handlePointerMove);
      mo.disconnect();
    };
  }, []);

  return null;
}
