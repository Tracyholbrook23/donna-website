"use client";

import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { collections } from "@/lib/data";
import { ArrowIcon } from "@/components/Icons";
import type { ProductType } from "@/components/ProductGlyph";
import { ProductCardMono } from "@/components/ProductCardMono";

// Wix product shape (v1 API — some fields can be null)
export interface WixProduct {
  _id?: string | null;
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  priceData?: { formatted?: { price?: string | null } | null; price?: number | null } | null;
  media?: { mainMedia?: { image?: { url?: string | null } | null } | null } | null;
  productPageUrl?: { base?: string | null; path?: string | null } | null;
  collectionIds?: string[] | null;
}

const GLYPH_TYPES: ProductType[] = [
  "tumbler", "board", "wallet", "tumbler-tall", "decanter", "box",
];

function glyphForProduct(p: WixProduct, idx: number): ProductType {
  const name = (p.name ?? "").toLowerCase();
  if (name.includes("tumbler") || name.includes("cup") || name.includes("drink") || name.includes("mug"))
    return "tumbler";
  if (name.includes("board") || name.includes("serv") || name.includes("charcuterie"))
    return "board";
  if (name.includes("wallet") || name.includes("leather")) return "wallet";
  if (name.includes("decanter") || name.includes("carafe")) return "decanter";
  if (name.includes("box") || name.includes("keep")) return "box";
  if (name.includes("glass") || name.includes("flute")) return "glass" as ProductType;
  return GLYPH_TYPES[idx % GLYPH_TYPES.length];
}

interface Props {
  initialProducts: WixProduct[];
}

export function ShopClient({ initialProducts }: Props) {
  const [activeCollection, setActiveCollection] = useState("all");

  const pillsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = pillsRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = pillsRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows, { passive: true });
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollPills = (dir: "left" | "right") => {
    const el = pillsRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 240 : -240, behavior: "smooth" });
  };

  // Build collection tabs — sorted by catalog order, only show categories with products
  const allCollections = useMemo(() => {
    const sorted = [...collections].sort((a, b) => a.sortOrder - b.sortOrder);
    const withCounts = sorted.map((c) => ({
      ...c,
      count: c.wixId
        ? initialProducts.filter((p) => (p.collectionIds ?? []).includes(c.wixId)).length
        : 0,
    }));
    return [
      {
        id: "all",
        name: "Everything",
        wixId: "",
        group: "all",
        featured: 0,
        sortOrder: 0,
        kicker: "Every style in the studio — all available for custom engraving.",
        count: initialProducts.length,
      },
      ...withCounts.filter((c) => c.count > 0),
    ];
  }, [initialProducts]);

  const filtered = useMemo(() => {
    let items = [...initialProducts];
    if (activeCollection !== "all") {
      const match = collections.find((c) => c.id === activeCollection);
      const wixId = match?.wixId;
      if (wixId) {
        items = items.filter((p) => (p.collectionIds ?? []).includes(wixId));
      } else {
        items = [];
      }
    }
    return items;
  }, [initialProducts, activeCollection]);

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
                The Gallery
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
                  ? "Every style in the studio — browse for inspiration, then contact Donna to create yours."
                  : (currentCollection as { kicker?: string })?.kicker ?? ""}
              </p>
            </div>

            {/* Inquiry CTA */}
            <Link href="/custom" className="btn btn-primary reveal">
              Request a Design <ArrowIcon size={14} />
            </Link>
          </div>

          {/* Collection tabs */}
          <div style={{ position: "relative", marginTop: 36 }}>
            {canScrollLeft && (
              <button
                onClick={() => scrollPills("left")}
                aria-label="Scroll categories left"
                style={{
                  position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
                  zIndex: 2, width: 32, height: 32, borderRadius: "50%",
                  border: "1px solid var(--line)", background: "var(--cream)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.10)", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, color: "var(--ink)",
                }}
              >
                ‹
              </button>
            )}
            {canScrollRight && (
              <button
                onClick={() => scrollPills("right")}
                aria-label="Scroll categories right"
                style={{
                  position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
                  zIndex: 2, width: 32, height: 32, borderRadius: "50%",
                  border: "1px solid var(--line)", background: "var(--cream)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.10)", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, color: "var(--ink)",
                }}
              >
                ›
              </button>
            )}
            {canScrollLeft && (
              <div aria-hidden style={{
                position: "absolute", left: 0, top: 0, bottom: 4, width: 48, zIndex: 1,
                background: "linear-gradient(to right, var(--cream) 40%, transparent)",
                pointerEvents: "none",
              }} />
            )}
            {canScrollRight && (
              <div aria-hidden style={{
                position: "absolute", right: 0, top: 0, bottom: 4, width: 48, zIndex: 1,
                background: "linear-gradient(to left, var(--cream) 40%, transparent)",
                pointerEvents: "none",
              }} />
            )}

            <div
              ref={pillsRef}
              style={{
                display: "flex",
                gap: 8,
                overflowX: "auto",
                paddingBottom: 4,
                scrollbarWidth: "none",
                paddingLeft: canScrollLeft ? 40 : 0,
                paddingRight: canScrollRight ? 40 : 0,
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
        </div>
      </section>

      {/* Gallery grid */}
      <section style={{ padding: "40px 0 100px" }}>
        <div className="container">
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--muted)" }}>
              <p className="display" style={{ fontSize: 48, opacity: 0.2, marginBottom: 16 }}>✦</p>
              <p style={{ fontSize: 18, fontWeight: 500 }}>No pieces in this category yet.</p>
              <p style={{ fontSize: 14, marginTop: 8 }}>Check back soon, or contact Donna for anything specific.</p>
            </div>
          ) : (
            <div className="layout-shop-grid">
              {filtered.map((p, i) => (
                <div key={p._id ?? i} className="reveal" style={{ transitionDelay: `${Math.min(i, 8) * 0.03}s` }}>
                  <ProductCardMono product={p} index={i} glyphType={glyphForProduct(p, i)} showPrice={false} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Commission band */}
      <section style={{ padding: "0 0 100px" }}>
        <div className="container">
          <div
            className="reveal layout-commission-band"
            style={{
              background: "var(--ink)",
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
                See something you love?
              </p>
              <h3
                className="display"
                style={{ fontSize: "clamp(32px, 4vw, 52px)", margin: "0 0 16px", color: "var(--cream)" }}
              >
                Contact Donna to make it yours — personalized exactly the way you want.
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 16,
                  maxWidth: 540,
                  lineHeight: 1.6,
                  marginBottom: 28,
                }}
              >
                Every piece here is available for custom engraving with your name, date, message,
                logo, or artwork. Quotes within 24 hours — no order without your approval first.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/custom" className="btn btn-primary">
                  Request a design <ArrowIcon size={14} />
                </Link>
                <a
                  href="https://www.instagram.com/outofjerseycreations"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.3)", color: "var(--cream)" }}
                >
                  DM on Instagram
                </a>
              </div>
            </div>
            <div
              style={{
                borderRadius: "var(--r-lg)",
                overflow: "hidden",
                aspectRatio: "4/3",
                background: "rgba(255,255,255,0.04)",
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
