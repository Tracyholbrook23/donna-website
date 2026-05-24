"use client";

import { useEffect, useRef } from "react";

/**
 * Animated mesh gradient background — brand colours drifting softly.
 * Uses mix-blend-mode: soft-light so it tints sections without covering them.
 * The 6th blob follows the mouse for an interactive, fidget-friendly feel.
 */
export function MeshGradient() {
  const mouseBlobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = window.innerWidth * 0.5;
    let my = window.innerHeight * 0.45;
    let targetX = mx;
    let targetY = my;
    let raf: number;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      // Smooth lerp toward cursor
      mx += (targetX - mx) * 0.06;
      my += (targetY - my) * 0.06;

      if (mouseBlobRef.current) {
        mouseBlobRef.current.style.left = `${mx}px`;
        mouseBlobRef.current.style.top  = `${my}px`;
      }
      raf = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="mesh-root" aria-hidden="true">
      {/* Static drifting blobs — brand palette */}
      <div className="mesh-blob mesh-1" />  {/* terracotta — top-left */}
      <div className="mesh-blob mesh-2" />  {/* brass/gold  — top-right */}
      <div className="mesh-blob mesh-3" />  {/* forest      — bottom-left */}
      <div className="mesh-blob mesh-4" />  {/* clay/blush  — bottom-right */}
      <div className="mesh-blob mesh-5" />  {/* warm amber  — center */}
      {/* Mouse-tracking blob */}
      <div ref={mouseBlobRef} className="mesh-blob mesh-mouse" />
    </div>
  );
}
