"use client";

import { useState } from "react";
import Image from "next/image";
import { BuyBox } from "@/components/BuyBox";
import { ProductGlyph } from "@/components/ProductGlyph";
import type { WixProduct, WixMediaItem } from "@/components/BuyBox";
import type { ProductType } from "@/components/ProductGlyph";

interface ProductPageClientProps {
  product: WixProduct;
  glyphType: ProductType;
}

type ProductOptions = NonNullable<WixProduct["productOptions"]>;

/** Given an image URL, find the color choice that links to it via linkedMediaItems. */
function resolveColorForImage(url: string | null, options: ProductOptions): string | null {
  if (!url) return null;
  for (const opt of options) {
    const name = (opt.name ?? "").toLowerCase().trim();
    if (opt.optionType !== "color" && name !== "color" && name !== "colour" && name !== "finish color" && name !== "color / finish") continue;
    for (const choice of opt.choices ?? []) {
      for (const media of choice.linkedMediaItems ?? []) {
        if (media.image?.url === url) {
          return choice.value ?? choice.description ?? null;
        }
      }
    }
  }
  return null;
}

export function ProductPageClient({ product, glyphType }: ProductPageClientProps) {
  // Collect all gallery images from Wix (mainMedia first, then the rest)
  const allImages: WixMediaItem[] = (() => {
    const items = product.media?.items ?? [];
    const mainUrl = product.media?.mainMedia?.image?.url;
    // Wix often includes mainMedia inside items[] too — de-dupe by url
    const seen = new Set<string>();
    const out: WixMediaItem[] = [];
    for (const item of items) {
      const url = item.image?.url;
      if (url && !seen.has(url)) {
        seen.add(url);
        out.push(item);
      }
    }
    // If items[] was empty but mainMedia exists, add it
    if (out.length === 0 && mainUrl) {
      out.push({ _id: "main", image: { url: mainUrl } });
    }
    return out;
  })();

  const firstUrl = allImages[0]?.image?.url ?? null;
  const [activeUrl, setActiveUrl] = useState<string | null>(firstUrl);
  const [activeIdx, setActiveIdx] = useState(0);
  // Tracks which color name the currently-selected thumbnail maps to,
  // so BuyBox can include the right color when adding to cart.
  const [colorOverride, setColorOverride] = useState<string | null>(null);

  function selectImage(url: string | null | undefined, idx: number) {
    setActiveUrl(url ?? null);
    setActiveIdx(idx);

    // Resolve which color choice this thumbnail belongs to by matching
    // the image URL against each choice's linkedMediaItems array.
    const resolved = resolveColorForImage(url ?? null, product.productOptions ?? []);
    setColorOverride(resolved);
  }

  /** Called from BuyBox when a color swatch is clicked (kept for symmetry). */
  function handleColorSelect(colorName: string) {
    const color = colorName.toLowerCase().trim();
    const idx = allImages.findIndex((img) => {
      const alt = (img.image?.altText ?? "").toLowerCase();
      const title = (img.title ?? "").toLowerCase();
      return alt.includes(color) || title.includes(color);
    });
    if (idx >= 0) {
      setActiveUrl(allImages[idx].image?.url ?? null);
      setActiveIdx(idx);
    }
  }

  // How many thumbnails to show (cap at 6 so the strip doesn't get too long)
  const thumbImages = allImages.length > 0 ? allImages.slice(0, 6) : [];
  // Only show the thumbnail rail when there are 2+ images
  const showThumbs = thumbImages.length > 1;

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
        {/* Thumbnails — only shown when there are 2+ images */}
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

        {/* Main image */}
        <div
          style={{
            aspectRatio: "4/5",
            background: "var(--cream-2)",
            borderRadius: "var(--r-md)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
            <ProductGlyph
              type={glyphType}
              size={380}
              color="var(--terracotta)"
            />
          )}
        </div>
      </div>

      {/* ── BuyBox ──────────────────────────────────────────────────────────── */}
      <BuyBox product={product} onColorSelect={handleColorSelect} colorOverride={colorOverride} />
    </div>
  );
}
