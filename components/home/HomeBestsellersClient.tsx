"use client";

import Link from "next/link";
import { ProductType } from "@/components/ProductGlyph";
import { ArrowIcon } from "@/components/Icons";
import { ProductCardMono } from "@/components/ProductCardMono";

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
          {initialProducts.slice(0, 8).map((p, i) => (
            <div
              key={p._id ?? i}
              className="reveal-scale"
              style={{ transitionDelay: `${i * 0.04}s` }}
            >
              <ProductCardMono
                product={p}
                index={i}
                glyphType={GLYPH_TYPES[i % GLYPH_TYPES.length]}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
