"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { collections } from "@/lib/data";
import { ProductGlyph, ProductType } from "@/components/ProductGlyph";
import { ArrowIcon } from "@/components/Icons";

type WixProduct = {
  _id?: string | null;
  name?: string | null;
  slug?: string | null;
  priceData?: { formatted?: { price?: string | null } } | null;
  media?: { mainMedia?: { image?: { url?: string | null } } } | null;
};

// "All" tab + every collection from lib/data (mirrors Wix exactly)
const TABS = [
  { id: "all", label: "All", collection: null as string | null },
  ...collections.map((c) => ({ id: c.id, label: c.name, collection: c.id as string | null })),
];

// Map collection id → best-fit placeholder glyph
const COLLECTION_GLYPHS: Record<string, ProductType[]> = {
  "all":                         ["tumbler", "board", "decanter", "wallet", "box", "tumbler-tall", "tumbler", "board"],
  "powder-coated-tumblers":      ["tumbler", "tumbler-tall", "tumbler", "tumbler-tall", "tumbler", "tumbler-tall", "tumbler", "tumbler-tall"],
  "stainless-steel-tumblers":    ["tumbler", "tumbler-tall", "tumbler", "tumbler-tall", "tumbler", "tumbler-tall", "tumbler", "tumbler-tall"],
  "sublimation-tumblers-blanks": ["tumbler", "tumbler-tall", "tumbler", "tumbler-tall", "tumbler", "tumbler-tall", "tumbler", "tumbler-tall"],
  "cutting-boards":              ["board", "board-round", "board", "board-round", "board", "board-round", "board", "board-round"],
  "marble-wood":                 ["board-round", "board", "board-round", "board", "board-round", "board", "board-round", "board"],
  "gourmet-knife-set":           ["wallet", "wallet", "wallet", "wallet", "wallet", "wallet", "wallet", "wallet"],
  "grill-bbq":                   ["board", "board", "board", "board", "board", "board", "board", "board"],
  "decanters-sets":              ["decanter", "glass", "decanter", "glass", "decanter", "glass", "decanter", "glass"],
  "wood-boxes":                  ["box", "box", "box", "box", "box", "box", "box", "box"],
  "wood-pendant-jewelry":        ["wallet", "wallet", "wallet", "wallet", "wallet", "wallet", "wallet", "wallet"],
  "laserette":                   ["wallet", "box", "wallet", "box", "wallet", "box", "wallet", "box"],
  "pocket-knives":               ["wallet", "wallet", "wallet", "wallet", "wallet", "wallet", "wallet", "wallet"],
  "pens-pencils":                ["wallet", "wallet", "wallet", "wallet", "wallet", "wallet", "wallet", "wallet"],
  "hammer-set":                  ["box", "box", "box", "box", "box", "box", "box", "box"],
  "acrylics":                    ["board-round", "board-round", "board-round", "board-round", "board-round", "board-round", "board-round", "board-round"],
};

function SkeletonCard() {
  return (
    <div
      style={{
        background: "var(--cream)",
        borderRadius: "var(--r-md)",
        overflow: "hidden",
        border: "1px solid var(--line-soft)",
      }}
    >
      <div
        style={{
          aspectRatio: "1/1",
          background: "var(--cream-3)",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
      <div style={{ padding: "14px 16px 16px" }}>
        <div style={{ height: 14, width: "65%", background: "var(--cream-3)", borderRadius: 4, marginBottom: 8, animation: "pulse 1.5s ease-in-out infinite" }} />
        <div style={{ height: 13, width: "35%", background: "var(--cream-3)", borderRadius: 4, animation: "pulse 1.5s ease-in-out infinite" }} />
      </div>
    </div>
  );
}

interface Props {
  initialProducts: WixProduct[];
}

export function HomeBestsellersClient({ initialProducts }: Props) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [products, setProducts] = useState<WixProduct[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);

  const fetchProducts = useCallback(async (collectionId: string | null) => {
    // "All" tab always reuses the server-fetched initial products
    if (!collectionId) {
      setProducts(initialProducts);
      setEmpty(initialProducts.length === 0);
      return;
    }
    setLoading(true);
    setEmpty(false);
    try {
      const res = await fetch(`/api/products?collection=${collectionId}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data: WixProduct[] = await res.json();
      setProducts(data.slice(0, 8));
      setEmpty(data.length === 0);
    } catch {
      setProducts([]);
      setEmpty(true);
    } finally {
      setLoading(false);
    }
  }, [initialProducts]);

  const handleTabClick = (tab: { id: string; label: string; collection: string | null }) => {
    if (tab.id === activeTab) return;
    setActiveTab(tab.id);
    fetchProducts(tab.collection);
  };

  const glyphs = COLLECTION_GLYPHS[activeTab] ?? COLLECTION_GLYPHS["all"];
  const displayLimit = 8;
  const displayList = loading ? Array(displayLimit).fill(null) : products;

  return (
    <section style={{ padding: "80px 0 60px", background: "var(--cream-2)" }}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
        .bestseller-tab {
          padding: 8px 18px;
          border-radius: 999px;
          border: 1.5px solid var(--line);
          background: transparent;
          font-size: 13px;
          font-weight: 500;
          color: var(--ink-soft);
          cursor: pointer;
          transition: background 0.18s, color 0.18s, border-color 0.18s;
          white-space: nowrap;
          font-family: var(--font-body);
          letter-spacing: 0.01em;
        }
        .bestseller-tab:hover {
          border-color: var(--ink);
          color: var(--ink);
        }
        .bestseller-tab.active {
          background: var(--ink);
          color: var(--cream);
          border-color: var(--ink);
        }
        .bs-grid-wrap {
          transition: opacity 0.2s;
        }
        .bs-grid-wrap.loading {
          opacity: 0.55;
          pointer-events: none;
        }
      `}</style>

      <div className="container">
        {/* Header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 32,
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

        {/* Category tabs */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 40,
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`bestseller-tab${activeTab === tab.id ? " active" : ""}`}
              onClick={() => handleTabClick(tab)}
              aria-pressed={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {empty && !loading && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "var(--ink-soft)",
            }}
          >
            <p style={{ fontSize: 15, marginBottom: 16 }}>
              No products in this category yet.
            </p>
            <Link
              href="/shop"
              style={{
                color: "var(--terracotta)",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "underline",
              }}
            >
              Browse all products →
            </Link>
          </div>
        )}

        {/* Product grid */}
        {!empty && (
        <div className={`layout-4col bs-grid-wrap${loading ? " loading" : ""}`}>
          {(loading ? Array(displayLimit).fill(null) : displayList).slice(0, displayLimit).map((p: WixProduct | null, i: number) => {
            const imageUrl = p?.media?.mainMedia?.image?.url ?? null;
            const price = p?.priceData?.formatted?.price ?? null;
            const slug = p?.slug ?? p?._id ?? "";
            const glyphType = glyphs[i % glyphs.length];

            return p && !loading ? (
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
            ) : (
              <SkeletonCard key={i} />
            );
          })}
        </div>
        )}
      </div>
    </section>
  );
}
