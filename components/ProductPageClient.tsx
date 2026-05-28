"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { BuyBox } from "@/components/BuyBox";
import { ProductGlyph } from "@/components/ProductGlyph";
import type { WixProduct, WixMediaItem } from "@/components/BuyBox";
import type { ProductType } from "@/components/ProductGlyph";

// ── Hover effect constants (matches ProductCardMono) ─────────────────────────
const TILT_MAX = 10;
const PERSP    = 900;
const LIFT_Z   = 18;
const EASE     = 0.08;
const SPEC_SZ  = 52;
const SPEC_BR  = 0.45;
const SPEC_SH  = 0.36;
const SPEC2_SZ = 80;
const SPEC2_BR = 0.14;
const GLOW_STR = 0.28;
const EDGE_STR = 0.55;

interface ProductPageClientProps {
  product: WixProduct;
  glyphType: ProductType;
}

type ProductOptions = NonNullable<WixProduct["productOptions"]>;

function resolveColorForImage(url: string | null, options: ProductOptions): string | null {
  if (!url) return null;
  for (const opt of options) {
    const name = (opt.name ?? "").toLowerCase().trim();
    if (opt.optionType !== "color" && name !== "color" && name !== "colour" && name !== "finish color" && name !== "color / finish") continue;
    for (const choice of opt.choices ?? []) {
      for (const media of choice.linkedMediaItems ?? []) {
        if (media.image?.url === url) return choice.value ?? choice.description ?? null;
      }
    }
  }
  return null;
}

export function ProductPageClient({ product, glyphType }: ProductPageClientProps) {
  const allImages: WixMediaItem[] = (() => {
    const items = product.media?.items ?? [];
    const mainUrl = product.media?.mainMedia?.image?.url;
    const seen = new Set<string>();
    const out: WixMediaItem[] = [];
    for (const item of items) {
      const url = item.image?.url;
      if (url && !seen.has(url)) { seen.add(url); out.push(item); }
    }
    if (out.length === 0 && mainUrl) out.push({ _id: "main", image: { url: mainUrl } });
    return out;
  })();

  const firstUrl = allImages[0]?.image?.url ?? null;
  const [activeUrl, setActiveUrl] = useState<string | null>(firstUrl);
  const [activeIdx, setActiveIdx] = useState(0);
  const [colorOverride, setColorOverride] = useState<string | null>(null);

  function selectImage(url: string | null | undefined, idx: number) {
    setActiveUrl(url ?? null);
    setActiveIdx(idx);
    const resolved = resolveColorForImage(url ?? null, product.productOptions ?? []);
    setColorOverride(resolved);
  }

  function handleColorSelect(colorName: string) {
    const color = colorName.toLowerCase().trim();
    const idx = allImages.findIndex((img) => {
      const alt = (img.image?.altText ?? "").toLowerCase();
      const title = (img.title ?? "").toLowerCase();
      return alt.includes(color) || title.includes(color);
    });
    if (idx >= 0) { setActiveUrl(allImages[idx].image?.url ?? null); setActiveIdx(idx); }
  }

  const thumbImages = allImages.length > 0 ? allImages.slice(0, 6) : [];
  const showThumbs  = thumbImages.length > 1;

  // ── 3-D hover effect on the main image ────────────────────────────────────
  const imgRef  = useRef<HTMLDivElement>(null);
  const specRef = useRef<HTMLDivElement>(null);
  const rafRef  = useRef<number>(0);
  const tgt = useRef({ rx: 0, ry: 0, mx: 0.5, my: 0.5, lz: 0, sop: 0 });
  const cur = useRef({ rx: 0, ry: 0, mx: 0.5, my: 0.5, lz: 0, sop: 0 });

  const animate = useCallback(() => {
    const el   = imgRef.current;
    const spec = specRef.current;
    if (el) {
      const c = cur.current;
      const t = tgt.current;
      const f = EASE;
      c.rx  += (t.rx  - c.rx)  * f;
      c.ry  += (t.ry  - c.ry)  * f;
      c.mx  += (t.mx  - c.mx)  * f;
      c.my  += (t.my  - c.my)  * f;
      c.lz  += (t.lz  - c.lz)  * f;
      c.sop += (t.sop - c.sop) * f;

      const p = Math.max(0, Math.min(1, c.lz / LIFT_Z));
      el.style.transform = `perspective(${PERSP}px) rotateX(${c.rx}deg) rotateY(${c.ry}deg) translateZ(${c.lz}px)`;

      const glowOp     = 0.0  + GLOW_STR * p;
      const shadowY    = 4    + 24 * p;
      const shadowBlur = 12   + 44 * p;
      const shadowDark = 0.08 + 0.22 * p;
      const rimOp      = 0.08 + (EDGE_STR - 0.08) * p;

      el.style.boxShadow = [
        `0 ${shadowY}px ${shadowBlur}px rgba(0,0,0,${shadowDark})`,
        `0 0 ${32 * p}px rgba(255,255,255,${glowOp})`,
        `inset 0 1px 0 rgba(255,255,255,${rimOp})`,
        `inset 0 -1px 0 rgba(255,255,255,0.03)`,
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
    const r = imgRef.current?.getBoundingClientRect();
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
    tgt.current.rx = tgt.current.ry = 0;
    tgt.current.mx = tgt.current.my = 0.5;
    tgt.current.lz  = 0;
    tgt.current.sop = 0;
  }, []);

  return (
    <div className="layout-product-page" style={{ gap: 64 }}>
      {/* ── Gallery ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: showThumbs ? "80px 1fr" : "1fr",
          gap: 16,
          alignItems: "start",
        }}
      >
        {/* Thumbnails */}
        {showThumbs && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {thumbImages.map((item, i) => {
              const thumbUrl = item?.image?.url;
              const isActive = i === activeIdx;
              return (
                <button
                  key={i}
                  onClick={() => thumbUrl && selectImage(thumbUrl, i)}
                  aria-label={`View image ${i + 1}`}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "var(--r-sm)",
                    border: `1.5px solid ${isActive ? "var(--ink)" : "var(--line)"}`,
                    padding: 6,
                    background: "var(--cream-2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    cursor: thumbUrl ? "pointer" : "default",
                    transition: "border-color .15s",
                  }}
                >
                  {thumbUrl ? (
                    <Image
                      src={thumbUrl}
                      alt={`Product image ${i + 1}`}
                      width={56}
                      height={56}
                      style={{ objectFit: "cover", borderRadius: 4 }}
                    />
                  ) : (
                    <ProductGlyph type={glyphType} size={48} />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Main image — hover effect applied here */}
        <div
          ref={imgRef}
          onMouseMove={onMouseMove}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{
            aspectRatio: "4/5",
            background: "var(--cream-2)",
            borderRadius: "var(--r-md)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            willChange: "transform",
            cursor: "default",
          }}
        >
          {activeUrl ? (
            <Image
              key={activeUrl}
              src={activeUrl}
              alt={product.name ?? "Product image"}
              fill
              style={{ objectFit: "cover" }}
              priority
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          ) : (
            <ProductGlyph type={glyphType} size={380} color="var(--terracotta)" />
          )}

          {/* Specular overlay */}
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

          {/* Rim highlight */}
          <div
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              height: 1,
              background: `rgba(255,255,255,${EDGE_STR})`,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* ── BuyBox ──────────────────────────────────────────────────────────── */}
      <BuyBox product={product} onColorSelect={handleColorSelect} colorOverride={colorOverride} />
    </div>
  );
}
