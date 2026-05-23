"use client";

import { useState } from "react";
import { testimonials } from "@/lib/data";
import { StarIcon } from "@/components/Icons";

export function HomeTestimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  return (
    <section
      style={{
        padding: "120px 0",
        background: "var(--cream-2)",
        overflow: "hidden",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: 80,
            alignItems: "start",
          }}
        >
          {/* Left: kicker + stat */}
          <div className="reveal" style={{ paddingTop: 8 }}>
            <p className="eyebrow" style={{ marginBottom: 16 }}>
              In their words
            </p>
            <h2
              className="display"
              style={{ fontSize: "clamp(36px, 4vw, 52px)", margin: "0 0 20px" }}
            >
              1,840+{" "}
              <em
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                }}
              >
                five-star
              </em>{" "}
              letters.
            </h2>
            <p
              style={{
                color: "var(--muted)",
                fontSize: 14,
                lineHeight: 1.7,
                maxWidth: 280,
                marginBottom: 40,
              }}
            >
              Real customers. Real gifts. Real moments you can&rsquo;t buy
              twice.
            </p>

            {/* Navigation */}
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  border: "1px solid var(--line)",
                  background: "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  color: "var(--ink)",
                  transition: "background .2s",
                }}
              >
                ←
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  border: "1px solid var(--line)",
                  background: "var(--ink)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  color: "var(--cream)",
                  transition: "background .2s",
                }}
              >
                →
              </button>
            </div>

            {/* Dots */}
            <div style={{ display: "flex", gap: 6, marginTop: 24 }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  style={{
                    width: i === active ? 24 : 6,
                    height: 6,
                    borderRadius: "var(--r-pill)",
                    background: i === active ? "var(--ink)" : "var(--line)",
                    border: 0,
                    cursor: "pointer",
                    transition: "all .3s var(--ease)",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right: quote card */}
          <div
            className="reveal"
            key={active}
            style={{
              background: "var(--cream)",
              borderRadius: "var(--r-xl)",
              padding: "52px 56px",
              boxShadow: "var(--shadow-lg)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Large quote mark */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: -20,
                left: 40,
                fontSize: 200,
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                color: "var(--cream-3)",
                lineHeight: 1,
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              &ldquo;
            </div>

            {/* Stars */}
            <div
              style={{ display: "flex", gap: 4, marginBottom: 28, position: "relative" }}
            >
              {Array.from({ length: t.rating }).map((_, i) => (
                <StarIcon key={i} size={18} filled />
              ))}
            </div>

            <blockquote
              style={{
                margin: 0,
                fontSize: "clamp(20px, 2.2vw, 26px)",
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                lineHeight: 1.45,
                letterSpacing: "-0.015em",
                color: "var(--ink)",
                position: "relative",
                marginBottom: 36,
              }}
            >
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {/* Avatar placeholder */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "var(--terracotta-soft)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "var(--cream)",
                  fontFamily: "var(--font-display)",
                  flexShrink: 0,
                }}
              >
                {t.name.charAt(0)}
              </div>
              <div>
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: 15,
                    margin: 0,
                    color: "var(--ink)",
                  }}
                >
                  {t.name}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    margin: 0,
                    color: "var(--muted)",
                    marginTop: 2,
                  }}
                >
                  {t.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
