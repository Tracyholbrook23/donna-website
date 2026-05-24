"use client";

import { useState } from "react";
import { engravingPlacements } from "@/lib/data";
import { StarIcon, PlusIcon } from "@/components/Icons";
import { useCart } from "@/lib/cartContext";

// Wix product type (v1 API — some fields can be null)
export interface WixProduct {
  _id?: string | null;
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  priceData?: { formatted?: { price?: string | null } | null; price?: number | null } | null;
  media?: { mainMedia?: { image?: { url?: string | null } | null } | null } | null;
  productOptions?: Array<{
    name?: string | null;
    optionType?: string | null;
    choices?: Array<{
      value?: string | null;
      description?: string | null;
      inStock?: boolean | null;
      visible?: boolean | null;
    }> | null;
  }> | null;
}

interface BuyBoxProps {
  product: WixProduct;
}

const SWATCH_COLORS: Record<string, string> = {
  black: "#1F1410",
  "midnight black": "#1F1410",
  white: "#F5F0E8",
  silver: "#C0C0C0",
  "rose gold": "#B76E79",
  gold: "#C8985A",
  terracotta: "#B9533A",
  "forest green": "#3D5848",
  navy: "#1C2B4A",
  red: "#B03A2E",
};

function colorForChoice(name: string): string {
  const key = name.toLowerCase();
  return SWATCH_COLORS[key] ?? "#888";
}

export function BuyBox({ product }: BuyBoxProps) {
  const { addToCart, buyNow, loading: cartLoading } = useCart();
  const [qty, setQty] = useState(1);
  const [engraveOn, setEngraveOn] = useState(true);
  const [engText, setEngText] = useState("");
  const [engPlacement, setEngPlacement] = useState("front-center");
  const [variantIdx, setVariantIdx] = useState(0);
  const [adding, setAdding] = useState(false);
  const [buyingNow, setBuyingNow] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  // Color options from Wix product
  const colorOption = product.productOptions?.find(
    (o) => o.optionType === "color" || o.name?.toLowerCase() === "color"
  );
  const choices = colorOption?.choices ?? [];

  const cartParams = () => ({
    productId: product._id ?? "",
    quantity: qty,
    ...(engraveOn && engText ? { engravingText: engText, engravingPlacement: engPlacement } : {}),
  });

  const handleAddToCart = async () => {
    if (!product._id) return;
    setAdding(true);
    setError("");
    try {
      await addToCart(cartParams());
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  const handleBuyNow = async () => {
    if (!product._id) return;
    setBuyingNow(true);
    setError("");
    try {
      await buyNow(cartParams());
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setBuyingNow(false);
    }
  };

  return (
    <div style={{ position: "sticky", top: 100 }}>
      {/* Rating row */}
      <div
        style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}
      >
        <div style={{ display: "flex", gap: 3 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} size={14} filled />
          ))}
        </div>
        <span style={{ fontSize: 13, color: "var(--muted)" }}>
          4.9 · 128 reviews
        </span>
      </div>

      {/* Name + price */}
      <h1
        className="display"
        style={{
          fontSize: "clamp(36px, 4.5vw, 56px)",
          margin: "0 0 8px",
          fontWeight: 400,
          lineHeight: 1,
        }}
      >
        {product.name}
      </h1>

      {product.description && (
        <p
          style={{
            fontSize: 15,
            color: "var(--muted)",
            margin: "0 0 20px",
            lineHeight: 1.6,
          }}
          dangerouslySetInnerHTML={{
            __html: product.description.replace(/<[^>]+>/g, ""),
          }}
        />
      )}

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 14,
          marginBottom: 28,
        }}
      >
        <span
          className="serif"
          style={{ fontSize: 30, fontWeight: 500 }}
        >
          {product.priceData?.formatted?.price ?? "—"}
        </span>
        <span
          style={{
            fontSize: 11,
            padding: "4px 12px",
            borderRadius: "var(--r-pill)",
            background: "rgba(61,88,72,0.1)",
            color: "var(--forest)",
            fontWeight: 600,
            letterSpacing: "0.04em",
          }}
        >
          Free shipping over $125
        </span>
      </div>

      {/* Color swatches */}
      {choices.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <span
              style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}
            >
              Color ·{" "}
              <span style={{ fontWeight: 400, color: "var(--muted)" }}>
                {choices[variantIdx]?.description ?? choices[variantIdx]?.value}
              </span>
            </span>
            <span style={{ fontSize: 11, color: "var(--muted-soft)" }}>
              {choices.length} options
            </span>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {choices.map((c, i) => (
              <button
                key={i}
                onClick={() => setVariantIdx(i)}
                aria-label={c.description ?? c.value ?? `Option ${i + 1}`}
                title={c.description ?? c.value ?? ""}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: colorForChoice(c.value ?? c.description ?? ""),
                  border: `2px solid ${i === variantIdx ? "var(--ink)" : "transparent"}`,
                  boxShadow: "0 0 0 1px var(--line) inset, 0 0 0 3px var(--cream) inset",
                  cursor: "pointer",
                  padding: 0,
                  transition: "border-color .2s",
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Engraving panel */}
      <div
        style={{
          marginBottom: 28,
          background: "var(--cream-2)",
          borderRadius: "var(--r-md)",
          padding: 24,
          border: "1px solid var(--line-soft)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 12,
            marginBottom: engraveOn ? 20 : 0,
          }}
        >
          <div>
            <p className="eyebrow" style={{ color: "var(--brass)", marginBottom: 4 }}>
              Make it yours
            </p>
            <h3 className="serif" style={{ fontSize: 18, margin: "0 0 2px" }}>
              Personalize your engraving
            </h3>
            <p style={{ fontSize: 12, color: "var(--muted)", margin: 0 }}>
              Included with your order
            </p>
          </div>
          {/* Toggle */}
          <button
            onClick={() => setEngraveOn((v) => !v)}
            aria-label={engraveOn ? "Skip engraving" : "Add engraving"}
            style={{
              width: 44,
              height: 26,
              borderRadius: 13,
              background: engraveOn ? "var(--ink)" : "var(--cream-3)",
              border: "none",
              cursor: "pointer",
              position: "relative",
              flexShrink: 0,
              transition: "background .25s",
            }}
          >
            <span
              style={{
                position: "absolute",
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "var(--cream)",
                top: 3,
                left: engraveOn ? 21 : 3,
                transition: "left .25s",
              }}
            />
          </button>
        </div>

        {engraveOn && (
          <>
            {/* Text input */}
            <div
              style={{
                borderBottom: "1px solid var(--line)",
                paddingBottom: 8,
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <input
                type="text"
                value={engText}
                onChange={(e) => setEngText(e.target.value)}
                placeholder="Type your text here…"
                maxLength={40}
                style={{
                  flex: 1,
                  border: 0,
                  outline: 0,
                  background: "transparent",
                  fontSize: 17,
                  fontFamily: "var(--font-display)",
                  color: "var(--ink)",
                }}
              />
              <span
                style={{ fontSize: 11, color: "var(--muted-soft)", flexShrink: 0 }}
              >
                {engText.length}/40
              </span>
            </div>

            {/* Placement */}
            <div>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: 8,
                }}
              >
                Placement
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {engravingPlacements.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setEngPlacement(p.id)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "var(--r-pill)",
                      border: `1px solid ${engPlacement === p.id ? "var(--ink)" : "var(--line)"}`,
                      background:
                        engPlacement === p.id ? "var(--ink)" : "transparent",
                      color: engPlacement === p.id ? "var(--cream)" : "var(--ink)",
                      fontSize: 12,
                      cursor: "pointer",
                      transition: "all .2s",
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

          </>
        )}
      </div>

      {/* Qty + Add to cart */}
      <div
        style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}
      >
        {/* Qty */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid var(--line)",
            borderRadius: "var(--r-pill)",
            overflow: "hidden",
          }}
        >
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            style={{
              width: 44,
              height: 52,
              border: 0,
              background: "transparent",
              cursor: "pointer",
              fontSize: 18,
              color: "var(--ink)",
            }}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span
            style={{
              width: 36,
              textAlign: "center",
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => q + 1)}
            style={{
              width: 44,
              height: 52,
              border: 0,
              background: "transparent",
              cursor: "pointer",
              color: "var(--ink)",
            }}
            aria-label="Increase quantity"
          >
            <PlusIcon size={16} />
          </button>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          disabled={adding || cartLoading}
          className="btn btn-primary"
          style={{
            flex: 1,
            justifyContent: "center",
            fontSize: 15,
            background: added ? "var(--forest)" : "var(--ink)",
            borderColor: added ? "var(--forest)" : "var(--ink)",
            transition: "background .3s, border-color .3s",
            opacity: adding || cartLoading ? 0.7 : 1,
          }}
        >
          {adding ? "Adding…" : added ? "Added ✓" : "Add to cart"}
        </button>
      </div>

      {/* Buy Now */}
      <button
        onClick={handleBuyNow}
        disabled={buyingNow || cartLoading}
        className="btn btn-secondary"
        style={{
          width: "100%",
          justifyContent: "center",
          fontSize: 15,
          marginBottom: 4,
          opacity: buyingNow || cartLoading ? 0.7 : 1,
        }}
      >
        {buyingNow ? "Loading checkout…" : "Buy it now"}
      </button>

      {error && (
        <p style={{ fontSize: 13, color: "var(--terracotta)", marginBottom: 12 }}>
          {error}
        </p>
      )}

      {/* Trust badges */}
      <div
        style={{
          display: "flex",
          gap: 20,
          fontSize: 12,
          color: "var(--muted)",
          paddingTop: 16,
          borderTop: "1px solid var(--line-soft)",
        }}
      >
        {["✦ Ships in 3–5 days", "✦ Free returns (stock)", "✦ Insured shipping"].map(
          (b) => (
            <span key={b}>{b}</span>
          )
        )}
      </div>
    </div>
  );
}

