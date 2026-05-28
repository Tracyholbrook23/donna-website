"use client";

import { useEffect, useRef } from "react";
import { announcementMessages } from "@/lib/data";

export function AnnouncementBar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Speed: pixels per second
    const SPEED = 60;
    let lastTime: number | null = null;

    function tick(now: number) {
      if (lastTime === null) lastTime = now;
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      const half = track!.scrollWidth / 2;
      posRef.current += SPEED * delta;
      if (posRef.current >= half) posRef.current -= half;

      track!.style.transform = `translateX(-${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Two copies for seamless loop
  const repeated = [...announcementMessages, ...announcementMessages];

  return (
    <div
      style={{
        background: "var(--ink)",
        color: "var(--cream)",
        fontSize: 12,
        letterSpacing: "0.04em",
        padding: "10px 0",
        overflow: "hidden",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        userSelect: "none",
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: 0,
          width: "max-content",
          willChange: "transform",
        }}
      >
        {repeated.map((m, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 64,
              paddingRight: 64,
            }}
          >
            {m}
            <span style={{ opacity: 0.4 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
