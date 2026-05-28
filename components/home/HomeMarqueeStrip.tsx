"use client";

import { useEffect, useRef } from "react";

const ITEMS = [
  "Custom laser engraving — woman owned & operated",
  "Every piece made to order · no two are alike",
  "1,840+ five-star reviews",
  "Tumblers · Boards · Knives · Wallets · More",
  "Quotes within 24 hours · personal replies every time",
  "Gift-ready packaging on every order",
];

export function HomeMarqueeStrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const SPEED = 55; // px/sec
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

  const repeated = [...ITEMS, ...ITEMS];

  return (
    <section
      style={{
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        padding: "18px 0",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      <div
        ref={trackRef}
        style={{ display: "flex", width: "max-content", willChange: "transform" }}
      >
        {repeated.map((it, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 64,
              paddingRight: 64,
              fontSize: 13,
              color: "var(--ink-soft)",
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
            }}
          >
            {it} <span style={{ color: "var(--brass)" }}>✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
