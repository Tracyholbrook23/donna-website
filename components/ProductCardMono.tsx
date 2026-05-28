"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductGlyph } from "@/components/ProductGlyph";
import type { ProductType } from "@/components/ProductGlyph";

// ── Shared noise canvas — generated once per browser session ─────────────────
let _noiseDataUrl = "";
function getNoiseDataUrl(): string {
  if (_noiseDataUrl) return _noiseDataUrl;
  if (typeof window === "undefined") return "";
  const sz = 256;
  const canvas = document.createElement("canvas");
  canvas.width = sz;
  canvas.height = sz;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(sz, sz);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = (Math.random() * 255) | 0;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  _noiseDataUrl = canvas.toDataURL();
  return _noiseDataUrl;
}

// ── Tunable constants ─────────────────────────────────────────────────────────
const TILT_MAX  = 13;    // degrees max tilt
const PERSP     = 760;   // perspective px
const LIFT_Z    = 26;    // translateZ on hover (px)
const EASE      = 0.09;  // lerp factor
const SPEC_SZ   = 52;    // primary specular radius %
const SPEC_BR   = 0.55;  // primary specular brightness
const SPEC_SH   = 0.36;  // specular sharpness (stop position, 0=hard)
const SPEC2_SZ  = 80;    // secondary specular radius %
const SPEC2_BR  = 0.18;  // secondary brightness
const GLOW_STR  = 0.32;  // white outer glow opacity
const NOISE_OP  = 0.052; // grain opacity
const SCAN_OP   = 0.35;  // scan-line opacity
const EDGE_STR  = 0.62;  // rim highlight opacity

// ── Public types ──────────────────────────────────────────────────────────────
export interface CardProduct {
  _id?: string | null;
  name?: string | null;
  slug?: string | null;
  priceData?: { formatted?: { price?: string | null } | null } | null;
  media?: { mainMedia?: { image?: { url?: string | null } | null } | null } | null;
}

interface Props {
  product: CardProduct;
  index?: number;
  glyphType?: ProductType;
}

export function ProductCardMono({ product, index = 0, glyphType = "tumbler" }: Props) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const specRef  = useRef<HTMLDivElement>(null);
  const noiseRef = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number>(0);

  // Mouse/hover target (written on every mouse event)
  const tgt = useRef({ rx: 0, ry: 0, mx: 0.5, my: 0.5, lz: 0, sop: 0 });
  // Current smoothed state (lerped in rAF)
  const cur = useRef({ rx: 0, ry: 0, mx: 0.5, my: 0.5, lz: 0, sop: 0 });

  const imgUrl = product.media?.mainMedia?.image?.url ?? null;
  const price  = product.priceData?.formatted?.price ?? "";
  const href   = `/product/${product.slug ?? product._id}`;

  // Inject noise texture once on mount
  useEffect(() => {
    const url = getNoiseDataUrl();
    if (noiseRef.current && url) {
      noiseRef.current.style.backgroundImage = `url(${url})`;
    }
  }, []);

  // rAF animation loop
  const animate = useCallback(() => {
    const card = cardRef.current;
    const spec = specRef.current;
    if (card) {
      const c = cur.current;
      const t = tgt.current;
      const f = EASE;

      c.rx  = c.rx  + (t.rx  - c.rx)  * f;
      c.ry  = c.ry  + (t.ry  - c.ry)  * f;
      c.mx  = c.mx  + (t.mx  - c.mx)  * f;
      c.my  = c.my  + (t.my  - c.my)  * f;
      c.lz  = c.lz  + (t.lz  - c.lz)  * f;
      c.sop = c.sop + (t.sop - c.sop) * f;

      const progress = Math.max(0, Math.min(1, c.lz / LIFT_Z));

      card.style.transform = `perspective(${PERSP}px) rotateX(${c.rx}deg) rotateY(${c.ry}deg) translateZ(${c.lz}px)`;

      const glowOp    = 0.06 + (GLOW_STR - 0.06)   * progress;
      const shadowY   = 8    + (28 - 8)             * progress;
      const shadowBlur= 20   + (56 - 20)            * progress;
      const shadowDark= 0.25 + (0.6 - 0.25)         * progress;
      const glowBlur  = 40   * progress;
      const rimOp     = 0.12 + (EDGE_STR - 0.12)    * progress;

      card.style.boxShadow = [
        `0 ${shadowY}px ${shadowBlur}px rgba(0,0,0,${shadowDark})`,
        `0 0 ${glowBlur}px rgba(255,255,255,${glowOp})`,
        `inset 0 1px 0 rgba(255,255,255,${rimOp})`,
        `inset 0 -1px 0 rgba(255,255,255,0.04)`,
      ].join(", ");

      if (spec) {
        spec.style.opacity = String(c.sop);
        const px = c.mx * 100;
        const py = c.my * 100;
        spec.style.background = [
          `radial-gradient(${SPEC_SZ}% ${SPEC_SZ}% at ${px}% ${py}%, rgba(255,255,255,${SPEC_BR}) ${SPEC_SH * 100}%, transparent 100%)`,
          `radial-gradient(${SPEC2_SZ}% ${SPEC2_SZ}% at ${px}% ${py}%, rgba(255,255,255,${SPEC2_BR}) 0%, transparent 100%)`,
        ].join(", ");
      }
    }
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top)  / r.height;
    tgt.current.rx = -(y - 0.5) * TILT_MAX * 2;
    tgt.current.ry =  (x - 0.5) * TILT_MAX * 2;
    tgt.current.mx = x;
    tgt.current.my = y;
  }, []);

  const onMouseEnter = useCallback(() => {
    tgt.current.lz  = LIFT_Z;
    tgt.current.sop = 1;
  }, []);

  const onMouseLeave = useCallback(() => {
    tgt.current.rx  = 0;
    tgt.current.ry  = 0;
    tgt.current.mx  = 0.5;
    tgt.current.my  = 0.5;
    tgt.current.lz  = 0;
    tgt.current.sop = 0;
  }, []);

  return (
    <Link href={href} style={{ textDecoration: "none", display: "block" }}>
      {/* ── Dark card ───────────────────────────────────────────────────── */}
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{
          position: "relative",
          borderRadius: "var(--r-lg)",
          overflow: "hidden",
          background: "#0d0d1a",
          aspectRatio: "3/4",
          marginBottom: 14,
          cursor: "pointer",
          willChange: "transform",
          boxShadow:
            "0 8px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Product image */}
        {imgUrl && (
          <Image
            src={imgUrl}
            alt={product.name ?? "Product"}
            fill
            style={{ objectFit: "cover", opacity: 0.88 }}
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        )}

        {/* Glyph fallback */}
        {!imgUrl && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.28,
            }}
          >
            <ProductGlyph type={glyphType} size={140} color="#ffffff" />
          </div>
        )}

        {/* Vignette — darkens edges so text pops */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 40%, rgba(0,0,0,0.55) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Noise grain */}
        <div
          ref={noiseRef}
          style={{
            position: "absolute",
            inset: 0,
            backgroundSize: "256px 256px",
            backgroundRepeat: "repeat",
            opacity: NOISE_OP,
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />

        {/* Scan lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,${SCAN_OP}) 2px, rgba(0,0,0,${SCAN_OP}) 4px)`,
            pointerEvents: "none",
          }}
        />

        {/* Specular highlight — tracks mouse, mixes via screen */}
        <div
          ref={specRef}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />

        {/* Rim — top edge highlight */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: `rgba(255,255,255,${EDGE_STR})`,
            pointerEvents: "none",
          }}
        />

        {/* Bottom label band */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "24px 14px 14px",
            background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
            pointerEvents: "none",
          }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              margin: 0,
              color: "rgba(255,255,255,0.45)",
            }}
          >
            Personalize →
          </p>
        </div>
      </div>

      {/* ── Text below card ─────────────────────────────────────────────── */}
      <div>
        <p
          style={{
            fontSize: 15,
            fontWeight: 500,
            margin: "0 0 4px",
            lineHeight: 1.3,
            color: "var(--ink)",
          }}
        >
          {product.name}
        </p>
        {price && (
          <p style={{ fontSize: 14, color: "var(--muted)", margin: 0 }}>{price}</p>
        )}
      </div>
    </Link>
  );
}
