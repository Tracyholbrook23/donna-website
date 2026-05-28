"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductGlyph, ProductType } from "@/components/ProductGlyph";
import { ArrowIcon } from "@/components/Icons";

type WixProduct = {
  _id?: string | null;
  name?: string | null;
  slug?: string | null;
  priceData?: { formatted?: { price?: string | null } } | null;
  media?: { mainMedia?: { image?: { url?: string | null } } } | null;
};

const GLYPH_TYPES: ProductType[] = ["tumbler", "board", "decanter", "wallet", "box", "tumbler-tall", "tumbler", "board"];

interface Props {
  initialProducts: WixProduct[];
}

export function HomeBestsellersClient({ initialProducts }: Props) {
  return (
    <section style={{ padding: "80px 0 60px", background: "var(--cream-2)" }}>
      <div className="container">
        {/* Header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 40,
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div className="reveal-left">
            <p className="eyebrow">Fan favorites</p>
            <h2
              className="display"
              style={{ fontSize: "clamp(36px,5vw,68px)", margin: "12px 0 0", fontWeight: 400 }}
            >
              Most{" "}
              <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>ordered.</em>
            </h2>
          </div>
          <Link
            href="/shop"
            style={{
              color: "var(--ink)",
              fontSize: 14,
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              borderBottom: "1px solid var(--ink)",
              paddingBottom: 4,
              textDecoration: "none",
            }}
          >
            View all <ArrowIcon size={14} />
          </Link>
        </div>

        {/* Product grid */}
        <div className="layout-4col">
          {initialProducts.slice(0, 8).map((p, i) => {
            const imageUrl = p?.media?.mainMedia?.image?.url ?? null;
            const price = p?.priceData?.formatted?.price ?? null;
            const slug = p?.slug ?? p?._id ?? "";
            const glyphType = GLYPH_TYPES[i % GLYPH_TYPES.length];

            return (
              <Link
                key={p._id ?? i}
                href={`/product/${slug}`}
                className="reveal-scale lift-on-hover spring-press"
                data-tilt="5"
                style={{
                  background: "var(--cream)",
                  borderRadius: "var(--r-md)",
                  overflow: "hidden",
                  textDecoration: "none",
                  color: "var(--ink)",
                  border: "1px solid var(--line-soft)",
                  display: "block",
                  transitionDelay: `${i * 0.04}s`,
                }}
              >
                <div
                  className="card-hover"
                  style={{
                    aspectRatio: "1/1",
                    background: "#f8f4ed",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={p.name ?? "Product"}
                      fill
                      className="object-cover card-media"
                      sizes="25vw"
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                      }}
                    >
                      <ProductGlyph type={glyphType} size={160} />
                    </div>
                  )}
                </div>
                <div style={{ padding: "14px 16px 16px" }}>
                  <h3
                    className="serif"
                    style={{ fontSize: 15, margin: "0 0 6px", fontWeight: 500, lineHeight: 1.3 }}
                  >
                    {p.name ?? "Product"}
                  </h3>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {price && <span style={{ fontSize: 15, fontWeight: 600 }}>{price}</span>}
                    <span style={{ fontSize: 12, color: "var(--terracotta)", fontWeight: 500 }}>
                      Personalize →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
