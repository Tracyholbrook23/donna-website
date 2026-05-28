"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowIcon } from "@/components/Icons";
import { useCart } from "@/lib/cartContext";
import type { WixProduct } from "@/components/ShopClient";
import type { ProductType } from "@/components/ProductGlyph";
import { ProductGlyph } from "@/components/ProductGlyph";

function glyphFor(p: WixProduct, idx: number): ProductType {
  const name = (p.name ?? "").toLowerCase();
  if (name.includes("tumbler") || name.includes("cup")) return "tumbler";
  if (name.includes("board")) return "board";
  if (name.includes("wallet") || name.includes("leather")) return "wallet";
  if (name.includes("decanter") || name.includes("whiskey")) return "decanter";
  if (name.includes("box")) return "box";
  const types: ProductType[] = ["tumbler", "board", "wallet", "tumbler-tall", "decanter", "box"];
  return types[idx % types.length];
}

interface Props {
  products: WixProduct[];
}

export function FanFavoritesClient({ products }: Props) {
  return (
    <main className="page-enter">
      {/* Hero */}
      <section style={{ padding: "80px 0 40px" }}>
        <div className="container">
          <div style={{ maxWidth: 640 }}>
            <p className="eyebrow reveal" style={{ marginBottom: 14 }}>
              Ready to ship
            </p>
            <h1
              className="display reveal reveal-delay-1"
              style={{ fontSize: "clamp(48px, 7vw, 88px)", margin: "0 0 20px", fontWeight: 400, lineHeight: 0.9 }}
            >
              Fan{" "}
              <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>Favorites</em>
            </h1>
            <p
              className="reveal reveal-delay-2"
              style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.65, maxWidth: 520, margin: 0 }}
            >
              A small selection of pieces Donna has already engraved and ready
              to ship. These are the only items on the site available for direct
              purchase — no custom consultation needed.
            </p>
          </div>

          {/* Callout banner */}
          <div
            className="reveal reveal-delay-3"
            style={{
              marginTop: 36,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              background: "var(--forest)",
              color: "#fff",
              borderRadius: "var(--r-pill)",
              padding: "10px 20px",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.7)", flexShrink: 0 }} />
            Pre-engraved · Ready to ship in 2–3 business days
          </div>
        </div>
      </section>

      {/* Products */}
      <section style={{ padding: "40px 0 80px" }}>
        <div className="container">
          {products.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 20px",
                background: "var(--cream-2)",
                borderRadius: "var(--r-xl)",
                maxWidth: 600,
                margin: "0 auto",
              }}
            >
              <p className="display" style={{ fontSize: 56, opacity: 0.15, marginBottom: 20 }}>✦</p>
              <h2 className="display" style={{ fontSize: 32, margin: "0 0 16px", fontWeight: 400 }}>
                Nothing ready to ship right now.
              </h2>
              <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.6, maxWidth: 400, margin: "0 auto 28px" }}>
                Donna&apos;s focus is custom orders. Check back soon, or request a custom
                piece made just for you.
              </p>
              <Link href="/custom" className="btn btn-primary">
                Start a custom order <ArrowIcon size={14} />
              </Link>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 28,
              }}
            >
              {products.map((p, i) => (
                <FanFavoriteCard key={p._id ?? i} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA band */}
      <section style={{ padding: "0 0 100px" }}>
        <div className="container">
          <div
            className="reveal"
            style={{
              background: "var(--cream-2)",
              borderRadius: "var(--r-xl)",
              padding: "clamp(40px, 5vw, 64px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 32,
              flexWrap: "wrap",
            }}
          >
            <div style={{ maxWidth: 560 }}>
              <p className="eyebrow" style={{ color: "var(--terracotta)", marginBottom: 12 }}>
                Want something more personal?
              </p>
              <h3
                className="display"
                style={{ fontSize: "clamp(28px, 4vw, 44px)", margin: "0 0 12px", fontWeight: 400 }}
              >
                Every piece here can be made custom — with your name, date, or design.
              </h3>
              <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
                Contact Donna with your idea and get a personalized quote within 24 hours.
              </p>
            </div>
            <Link href="/custom" className="btn btn-primary" style={{ flexShrink: 0 }}>
              Start a custom order <ArrowIcon size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── Individual fan favorite card with Add to Cart ─────────────────────── */
function FanFavoriteCard({ product, index }: { product: WixProduct; index: number }) {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const imgUrl = product.media?.mainMedia?.image?.url ?? null;
  const price = product.priceData?.formatted?.price ?? "";
  const glyphType = glyphFor(product, index);

  const handleAddToCart = async () => {
    if (!product._id || adding || added) return;
    setAdding(true);
    try {
      await addToCart({ productId: product._id, quantity: 1 });
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    } catch {
      // silent
    }
    setAdding(false);
  };

  return (
    <div
      className="reveal"
      style={{
        background: "var(--cream)",
        borderRadius: "var(--r-lg)",
        border: "1px solid var(--line)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transitionDelay: `${Math.min(index, 6) * 0.04}s`,
      }}
    >
      {/* Image */}
      <Link
        href={`/product/${product.slug ?? product._id}`}
        style={{ display: "block", textDecoration: "none" }}
      >
        <div
          style={{
            position: "relative",
            aspectRatio: "4/3",
            background: "var(--cream-2)",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {imgUrl ? (
            <Image
              src={imgUrl}
              alt={product.name ?? "Product"}
              fill
              style={{ objectFit: "cover", transition: "transform .4s var(--ease)" }}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <ProductGlyph type={glyphType} size={120} color="var(--terracotta)" />
          )}
          {/* Ready to ship badge */}
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              background: "var(--forest)",
              color: "#fff",
              borderRadius: "var(--r-pill)",
              padding: "4px 12px",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.06em",
            }}
          >
            Ready to ship
          </div>
        </div>
      </Link>

      {/* Info */}
      <div style={{ padding: "20px 20px 24px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
        <div>
          <Link
            href={`/product/${product.slug ?? product._id}`}
            style={{ textDecoration: "none", color: "var(--ink)" }}
          >
            <p style={{ fontSize: 16, fontWeight: 600, margin: "0 0 4px", lineHeight: 1.3 }}>
              {product.name}
            </p>
          </Link>
          {price && price !== "$0.00" && (
            <p style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", margin: 0 }}>
              {price}
            </p>
          )}
        </div>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
          <button
            onClick={handleAddToCart}
            disabled={adding || added}
            className="btn btn-primary"
            style={{
              width: "100%",
              justifyContent: "center",
              opacity: adding ? 0.7 : 1,
              transition: "all .2s",
            }}
          >
            {added ? "Added to cart ✓" : adding ? "Adding…" : "Add to Cart"}
          </button>
          <Link
            href={`/product/${product.slug ?? product._id}`}
            style={{
              textAlign: "center",
              fontSize: 13,
              color: "var(--muted)",
              textDecoration: "none",
              padding: "4px 0",
            }}
          >
            View details →
          </Link>
        </div>
      </div>
    </div>
  );
}
