"use client";

import { useState } from "react";
import { engravingFonts } from "@/lib/data";
import { ProductGlyph } from "@/components/ProductGlyph";
import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";

export function HomeCustomizerTeaser() {
  const [text, setText] = useState("Imani");
  const [fontIdx, setFontIdx] = useState(1); // default italic script
  const font = engravingFonts[fontIdx];

  const engraving = {
    text,
    fontCss: font.css,
    italic: font.italic,
    weight: font.weight,
    caps: (font as { caps?: boolean }).caps,
    monogram: (font as { monogram?: boolean }).monogram,
    size: (font as { monogram?: boolean }).monogram ? 64 : 18,
  };

  return (
    <section
      style={{
        background: "var(--ink)",
        color: "var(--cream)",
        padding: "120px 0",
        overflow: "hidden",
      }}
    >
      <div className="container">
        <div
          className="layout-customizer"
        >
          {/* Left: copy + controls */}
          <div className="reveal">
            <p className="eyebrow" style={{ color: "var(--brass-light)", marginBottom: 20 }}>
              Live preview
            </p>
            <h2
              className="display"
              style={{
                fontSize: "clamp(40px, 5vw, 64px)",
                margin: "0 0 24px",
              }}
            >
              Type a name.{" "}
              <em
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  color: "var(--brass-light)",
                }}
              >
                See it engraved
              </em>{" "}
              in real time.
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 16,
                lineHeight: 1.7,
                maxWidth: 440,
                marginBottom: 36,
              }}
            >
              Every piece is engraved by hand, one at a time. Try the customizer
              — pick a font, watch the preview update, then order with confidence.
            </p>

            {/* Text input */}
            <div
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.3)",
                paddingBottom: 10,
                marginBottom: 28,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a name or message…"
                maxLength={32}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: 0,
                  outline: 0,
                  color: "var(--cream)",
                  fontSize: 22,
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.01em",
                }}
              />
              <span
                style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", flexShrink: 0 }}
              >
                {text.length}/32
              </span>
            </div>

            {/* Font selector */}
            <div style={{ marginBottom: 40 }}>
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: 12,
                  fontWeight: 600,
                }}
              >
                Font style
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {engravingFonts.map((f, i) => (
                  <button
                    key={f.id}
                    onClick={() => setFontIdx(i)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "var(--r-pill)",
                      border: `1px solid ${fontIdx === i ? "var(--brass-light)" : "rgba(255,255,255,0.2)"}`,
                      background: fontIdx === i ? "rgba(212,178,122,0.12)" : "transparent",
                      color: fontIdx === i ? "var(--brass-light)" : "rgba(255,255,255,0.65)",
                      fontSize: 13,
                      cursor: "pointer",
                      transition: "all .2s",
                      fontFamily: (f as { monogram?: boolean }).monogram
                        ? "'Cormorant Garamond', Georgia, serif"
                        : f.css,
                      fontStyle: f.italic ? "italic" : "normal",
                      fontWeight: f.weight,
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <Link
              href="/shop"
              className="btn btn-primary"
              style={{
                background: "var(--brass)",
                borderColor: "var(--brass)",
                color: "var(--ink)",
              }}
            >
              Shop all products <ArrowIcon size={14} />
            </Link>
          </div>

          {/* Right: live preview */}
          <div
            className="reveal"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* Glow */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: "20%",
                background: "radial-gradient(ellipse at center, rgba(181,138,79,0.18) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "relative",
                filter: "drop-shadow(0 32px 64px rgba(0,0,0,0.5))",
                transform: "rotate(-3deg)",
              }}
            >
              <ProductGlyph
                type="tumbler-tall"
                size={280}
                color="var(--terracotta)"
                engraving={engraving}
              />
            </div>

            {/* Label callout */}
            {text && (
              <div
                style={{
                  position: "absolute",
                  bottom: "10%",
                  right: "5%",
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "var(--r-md)",
                  padding: "12px 16px",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.7)",
                  maxWidth: 160,
                  lineHeight: 1.5,
                }}
              >
                <span style={{ color: "var(--brass-light)", display: "block", marginBottom: 2 }}>
                  Engraving preview
                </span>
                {font.label} · {text.length} char{text.length !== 1 ? "s" : ""}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
