"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { collections } from "@/lib/data";
import { ProductGlyph } from "@/components/ProductGlyph";
import { ArrowIcon } from "@/components/Icons";
import type { ProductType } from "@/components/ProductGlyph";

// Wix product shape (v1 API — some fields can be null)
export interface WixProduct {
  _id?: string | null;
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  priceData?: { formatted?: { price?: string | null } | null; price?: number | null } | null;
  media?: { mainMedia?: { image?: { url?: string | null } | null } | null } | null;
  productPageUrl?: { base?: string | null; path?: string | null } | null;
}

type SortKey = "featured" | "price-low" | "price-high";

const GLYPH_TYPES: ProductType[] = [
  "tumbler", "board", "wallet", "tumbler-tall", "decanter", "box",
];

function glyphForProduct(p: WixProduct, idx: number): ProductType {
  const name = (p.name ?? "").toLowerCase();
  if (name.includes("tumbler") || name.includes("cup") || name.includes("drink"))
    return "tumbler";
  if (name.includes("board") || name.includes("serv") || name.includes("charcuterie"))
    return "board";
  if (name.includes("wallet") || name.includes("leather")) return "wallet";
  if (name.includes("decanter") || name.includes("carafe")) return "decanter";
  if (name.includes("box") || name.includes("keep")) return "box";
  if (name.includes("glass") || name.includes("flute")) return "glass" as ProductType;
  return GLYPH_TYPES[idx % GLYPH_TYPES.length];
}

const GLYPH_COLORS = [
  "var(--terracotta)",
  "var(--forest)",
  "var(--brass)",
  "var(--ink-soft)",
  "var(--terracotta-deep)",
  "var(--forest-soft)",
];

interface Props {
  initialProducts: WixProduct[];
}

export function ShopClient({ initialProducts }: Props) {
  const [activeCollection, setActiveCollection] = useState("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [maxPrice, setMaxPrice] = useState(200);
  const [filtersOpen, setFiltersOpen] = useState(true);

  const allCollections = [
    { id: "all", name: "Everything", count: initialProducts.length, kicker: "Every piece in the studio, ready to engrave." },
    ...collections,
  ];

  const filtered = useMemo(() => {
    let items = [...initialProducts];
    if (maxPrice < 200) {
      items = items.filter((p) => (p.priceData?.price ?? 0) <= maxPrice);
    }
    if (sort === "price-low") items.sort((a, b) => (a.priceData?.price ?? 0) - (b.priceData?.price ?? 0));
    if (sort === "price-high") items.sort((a, b) => (b.priceData?.price ?? 0) - (a.priceData?.price ?? 0));
    return items;
  }, [initialProducts, sort, maxPrice]);

  const currentCollection = allCollections.find((c) => c.id === activeCollection);

  return (
    <main className="page-enter">
      {/* Header */}
      <section style={{ padding: "80px 0 24px" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div>
              <p className="eyebrow" style={{ marginBottom: 12 }}>
                The shop
              </p>
              <h1
                className="display"
                style={{
                  fontSize: "clamp(48px, 7vw, 96px)",
                  margin: 0,
                  fontWeight: 400,
                  lineHeight: 0.92,
                }}
              >
                {currentCollection?.name ?? "Everything"}
              </h1>
              <p
                style={{
                  color: "var(--muted)",
                  marginTop: 16,
                  fontSize: 16,
                  maxWidth: 560,
                  lineHeight: 1.6,
                }}
              >
                {currentCollection?.id === "all"
                  ? "Every piece in the studio, ready to engrave. Click for the full story."
                  : (currentCollection as { kicker?: string })?.kicker ?? ""}
              </p>
            </div>

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>
                {filtered.length} piece{filtered.length !== 1 ? "s" : ""}
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                style={{
                  padding: "10px 36px 10px 14px",
                  fontSize: 13,
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r-sm)",
                  background: "var(--cream)",
                  color: "var(--ink)",
                  cursor: "pointer",
                  outline: "none",
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%231F1410'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price · low to high</option>
                <option value="price-high">Price · high to low</option>
              </select>
            </div>
          </div>

          {/* Collection tabs */}
          <div
            style={{
              display: "flex",
              gap: 8,
              marginTop: 36,
              overflowX: "auto",
              paddingBottom: 4,
              scrollbarWidth: "none",
            }}
          >
            {allCollections.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCollection(c.id)}
                style={{
                  padding: "10px 18px",
                  borderRadius: "var(--r-pill)",
                  border: `1px solid ${c.id === activeCollection ? "var(--ink)" : "var(--line)"}`,
                  background: c.id === activeCollection ? "var(--ink)" : "transparent",
                  color: c.id === activeCollection ? "var(--cream)" : "var(--ink)",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "all .2s var(--ease)",
                  flexShrink: 0,
                }}
              >
                {c.name}
                <span style={{ fontSize: 11, opacity: 0.55 }}>{c.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Body: sidebar + grid */}
      <section style={{ padding: "40px 0 100px" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: filtersOpen ? "240px 1fr" : "1fr",
              gap: 48,
              alignItems: "start",
            }}
          >
            {/* Sidebar */}
            {filtersOpen && (
              <aside style={{ position: "sticky", top: 100 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 24,
                  }}
                >
                  <h3 className="serif" style={{ fontSize: 18, margin: 0 }}>
                    Filters
                  </h3>
                  <button
                    onClick={() => setFiltersOpen(false)}
                    style={{
                      background: "none",
                      border: 0,
                      cursor: "pointer",
                      fontSize: 13,
                      color: "var(--muted)",
                      padding: "4px 8px",
                    }}
                  >
                    ✕
                  </button>
                </div>

                <FilterGroup label="Price">
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--muted)",
                      marginBottom: 12,
                    }}
                  >
                    $0 — {maxPrice < 200 ? `$${maxPrice}` : "$200+"}
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    step="5"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    style={{ width: "100%", accentColor: "var(--terracotta)" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 11,
                      color: "var(--muted-soft)",
                      marginTop: 4,
                    }}
                  >
                    <span>$0</span>
                    <span>$200+</span>
                  </div>
                </FilterGroup>

                <FilterGroup label="Personalization">
                  {["Engraving included", "Available for monogram", "Custom commission only"].map(
                    (label) => (
                      <label
                        key={label}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "8px 0",
                          fontSize: 14,
                          color: "var(--ink-soft)",
                          cursor: "pointer",
                        }}
                      >
                        <input type="checkbox" style={{ accentColor: "var(--terracotta)" }} />
                        {label}
                      </label>
                    )
                  )}
                </FilterGroup>

                <FilterGroup label="Material">
                  {["Walnut", "Oak", "Acacia", "Leather", "Steel", "Crystal"].map((m) => (
                    <label
                      key={m}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "8px 0",
                        fontSize: 14,
                        color: "var(--ink-soft)",
                        cursor: "pointer",
                      }}
                    >
                      <input type="checkbox" style={{ accentColor: "var(--terracotta)" }} />
                      {m}
                    </label>
                  ))}
                </FilterGroup>

                <FilterGroup label="Occasion">
                  {[
                    "Wedding",
                    "Anniversary",
                    "Birthday",
                    "Graduation",
                    "Housewarming",
                    "Father's Day",
                    "Corporate",
                  ].map((o) => (
                    <label
                      key={o}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "8px 0",
                        fontSize: 14,
                        color: "var(--ink-soft)",
                        cursor: "pointer",
                      }}
                    >
                      <input type="checkbox" style={{ accentColor: "var(--terracotta)" }} />
                      {o}
                    </label>
                  ))}
                </FilterGroup>

                <button
                  onClick={() => {
                    setActiveCollection("all");
                    setMaxPrice(200);
                    setSort("featured");
                  }}
                  style={{
                    marginTop: 12,
                    background: "none",
                    border: 0,
                    fontSize: 12,
                    color: "var(--muted)",
                    cursor: "pointer",
                    padding: "8px 0",
                    textDecoration: "underline",
                  }}
                >
                  Reset all filters
                </button>
              </aside>
            )}

            {/* Product grid */}
            <div>
              {!filtersOpen && (
                <button
                  onClick={() => setFiltersOpen(true)}
                  style={{
                    marginBottom: 24,
                    padding: "10px 20px",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--r-pill)",
                    background: "transparent",
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    color: "var(--ink)",
                  }}
                >
                  Show filters
                </button>
              )}

              {filtered.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "80px 0",
                    color: "var(--muted)",
                  }}
                >
                  <p
                    className="display"
                    style={{ fontSize: 48, opacity: 0.2, marginBottom: 16 }}
                  >
                    ✦
                  </p>
                  <p style={{ fontSize: 18, fontWeight: 500 }}>
                    No pieces match those filters.
                  </p>
                  <p style={{ fontSize: 14, marginTop: 8 }}>
                    Try adjusting the price range or clearing filters.
                  </p>
                </div>
              ) : (
                <div className="layout-shop-grid">
                  {filtered.map((p, i) => (
                    <ProductCard key={p._id ?? i} product={p} index={i} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Commission band */}
      <section style={{ padding: "0 0 100px" }}>
        <div className="container">
          <div
            className="reveal"
            style={{
              background: "var(--cream-2)",
              borderRadius: "var(--r-xl)",
              padding: "clamp(40px, 5vw, 64px)",
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: 48,
              alignItems: "center",
            }}
          >
            <div>
              <p className="eyebrow" style={{ color: "var(--terracotta)", marginBottom: 12 }}>
                Can&rsquo;t find it?
              </p>
              <h3
                className="display"
                style={{ fontSize: "clamp(32px, 4vw, 52px)", margin: "0 0 16px" }}
              >
                Commission a one-off, exactly as you imagine it.
              </h3>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: 16,
                  maxWidth: 540,
                  lineHeight: 1.6,
                  marginBottom: 28,
                }}
              >
                Family crests, custom logos, hand-drawn sketches, full-bleed
                family-tree boards — if you can describe it, we can make it.
                Quotes within 24 hours.
              </p>
              <Link href="/custom" className="btn btn-primary">
                Start a request <ArrowIcon size={14} />
              </Link>
            </div>
            <div
              style={{
                borderRadius: "var(--r-lg)",
                overflow: "hidden",
                aspectRatio: "4/3",
                background: "var(--cream-3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="/photos/cutting-boards-family.jpg"
                alt="Custom commission example — family tree board"
                width={700}
                height={525}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProductCard({ product, index }: { product: WixProduct; index: number }) {
  const imgUrl = product.media?.mainMedia?.image?.url;
  const price = product.priceData?.formatted?.price ?? "";
  const href = `/product/${product.slug ?? product._id}`;
  const glyphType = glyphForProduct(product, index);
  const glyphColor = GLYPH_COLORS[index % GLYPH_COLORS.length];

  return (
    <Link
      href={href}
      className="reveal"
      style={{
        textDecoration: "none",
        color: "var(--ink)",
        display: "block",
      }}
    >
      <div
        data-tilt="4"
        style={{
          borderRadius: "var(--r-lg)",
          overflow: "hidden",
          background: "var(--cream-2)",
          aspectRatio: "3/4",
          position: "relative",
          marginBottom: 14,
          transition: "box-shadow .3s var(--ease)",
        }}
      >
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={product.name ?? "Product"}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ProductGlyph type={glyphType} size={160} color={glyphColor} />
          </div>
        )}

        {/* Hover overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(31,20,16,0)",
            transition: "background .3s var(--ease)",
            display: "flex",
            alignItems: "flex-end",
            padding: 16,
          }}
          className="product-card-overlay"
        />
      </div>

      <div>
        <p
          style={{
            fontSize: 15,
            fontWeight: 500,
            margin: "0 0 4px",
            lineHeight: 1.3,
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

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ borderTop: "1px solid var(--line)", padding: "20px 0" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          background: "none",
          border: 0,
          padding: 0,
          cursor: "pointer",
          color: "var(--ink)",
          marginBottom: open ? 14 : 0,
        }}
      >
        <span
          className="eyebrow"
          style={{ color: "var(--ink)", letterSpacing: "0.14em" }}
        >
          {label}
        </span>
        <span
          style={{
            transform: open ? "rotate(45deg)" : "rotate(0)",
            transition: "transform .25s var(--ease)",
            fontSize: 18,
            lineHeight: 1,
            display: "inline-block",
          }}
        >
          +
        </span>
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}
