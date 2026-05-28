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
            <p className="eyebrow">Gallery spotlight</p>
            <h2
              className="display"
              style={{ fontSize: "clamp(36px,5vw,68px)", margin: "12px 0 0", fontWeight: 400 }}
            >
              Popular{" "}
              <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>designs.</em>
            </h2>
            <p style={{ fontSize: 15, color: "var(--muted)", marginTop: 12, maxWidth: 480, lineHeight: 1.6 }}>
              Browse for inspiration — every piece can be made custom for you.
              Contact Donna with your vision and get a quote within 24 hours.
            </p>
          </div>
          <Link
            href="/custom"
            className="btn btn-primary reveal"
          >
            Request a design <ArrowIcon size={14} />
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
                showPrice={false}
              />
            </div>
          ))}
        </div>

        {/* Gallery link */}
        <div style={{ textAlign: "center", marginTop: 48 }}>
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
            Browse the full gallery <ArrowIcon size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
