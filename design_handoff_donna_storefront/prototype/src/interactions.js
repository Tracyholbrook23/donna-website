// ─────────────────────────────────────────────
// Donna's — Lightweight interaction wiring
// Click ripples · magnetic hover · cursor tilt · counter animation
// ─────────────────────────────────────────────

(() => {
  // ─── 1. Button click ripples ───────────────
  // Capture click coords on every .btn, set CSS vars, briefly add .is-pressed
  document.addEventListener('pointerdown', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const rx = ((e.clientX - rect.left) / rect.width) * 100;
    const ry = ((e.clientY - rect.top) / rect.height) * 100;
    btn.style.setProperty('--rx', rx + '%');
    btn.style.setProperty('--ry', ry + '%');
    btn.classList.remove('is-pressed');
    // Reflow so animation restarts
    void btn.offsetWidth;
    btn.classList.add('is-pressed');
    setTimeout(() => btn.classList.remove('is-pressed'), 600);
  });

  // ─── 2. Magnetic hover on buttons with [data-magnetic] ──
  let magneticListenersAttached = false;
  const attachMagnetic = () => {
    if (magneticListenersAttached) return;
    magneticListenersAttached = true;
    document.addEventListener('pointermove', (e) => {
      document.querySelectorAll('[data-magnetic]').forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const max = parseInt(el.dataset.magnetic) || 80;
        if (dist < max) {
          const strength = (max - dist) / max;
          el.style.transform = `translate(${dx * 0.15 * strength}px, ${dy * 0.15 * strength}px)`;
        } else {
          el.style.transform = '';
        }
      });
    });
  };

  // ─── 3. Hero card tilt (mousemove → rotate) ────
  // Elements with [data-tilt] tilt based on cursor distance from their center
  const attachTilt = () => {
    document.querySelectorAll('[data-tilt]').forEach((el) => {
      if (el.__tiltAttached) return;
      el.__tiltAttached = true;
      const max = parseFloat(el.dataset.tilt) || 6;
      el.addEventListener('pointermove', (e) => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rx = (0.5 - py) * max;
        const ry = (px - 0.5) * max;
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
      });
      el.addEventListener('pointerleave', () => {
        el.style.transform = '';
      });
    });
  };

  // ─── 4. Counter animation — count up when visible ──
  const animateCounters = () => {
    document.querySelectorAll('[data-counter]:not(.counter-done)').forEach((el) => {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          el.classList.add('counter-done');
          const target = parseFloat(el.dataset.counter);
          const suffix = el.dataset.suffix || '';
          const prefix = el.dataset.prefix || '';
          const duration = 1200;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            const v = target * eased;
            el.textContent = prefix + (target >= 1000 ? Math.floor(v).toLocaleString() : v.toFixed(1).replace(/\.0$/, '')) + suffix;
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        });
      }, { threshold: 0.4 });
      obs.observe(el);
    });
  };

  // Re-attach on each route change (React mounts new DOM)
  const reattach = () => {
    attachMagnetic();
    attachTilt();
    animateCounters();
  };

  // Initial + observe DOM changes (React renders)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', reattach);
  } else {
    reattach();
  }

  // Watch for new nodes (page navigations re-mount content)
  const mo = new MutationObserver(() => {
    clearTimeout(window.__donnaInteractionTimer);
    window.__donnaInteractionTimer = setTimeout(reattach, 80);
  });
  mo.observe(document.body, { childList: true, subtree: true });
})();
