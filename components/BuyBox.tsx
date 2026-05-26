"use client";

import { useState, useEffect } from "react";
import { engravingPlacements } from "@/lib/data";
import { StarIcon, PlusIcon } from "@/components/Icons";
import { useCart } from "@/lib/cartContext";

// Wix product type (v1 API — some fields can be null)
export interface WixMediaItem {
  _id?: string | null;
  title?: string | null;
  image?: { url?: string | null; altText?: string | null } | null;
}

export interface WixProduct {
  _id?: string | null;
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  priceData?: { formatted?: { price?: string | null } | null; price?: number | null } | null;
  media?: {
    mainMedia?: { image?: { url?: string | null } | null } | null;
    items?: WixMediaItem[] | null;
  } | null;
  productOptions?: Array<{
    name?: string | null;
    optionType?: string | null;
    choices?: Array<{
      value?: string | null;
      description?: string | null;
      inStock?: boolean | null;
      visible?: boolean | null;
      /** Wix links a gallery image to each color choice in the dashboard */
      linkedMediaItems?: WixMediaItem[] | null;
    }> | null;
  }> | null;
}

interface BuyBoxProps {
  product: WixProduct;
  /** Called when a color swatch is clicked with the selected color name. */
  onColorSelect?: (colorName: string) => void;
  /** Externally-driven color selection coming from the thumbnail rail. */
  colorOverride?: string | null;
}

// ─── Color swatch map ─────────────────────────────────────────────────────────
// Covers all colors in this catalog: PCT, Laserette, wood boxes, pendants, knives
const SWATCH_COLORS: Record<string, string> = {
  // Neutrals
  "black": "#1a1a1a",
  "matte black": "#1a1a1a",
  "midnight black": "#1a1a1a",
  "glossy black": "#1a1a1a",
  "black metal": "#2a2a2a",
  "white": "#f5f0e8",
  "matte white": "#f5f0e8",
  "silver": "#c0c0c0",
  "gunmetal": "#4a4e54",
  "stainless": "#c8c8c8",
  // Metallics
  "gold": "#c8985a",
  "rose gold": "#b76e79",
  "copper": "#b55a2a",
  "bronze": "#8c6239",
  "brass": "#b5a642",
  // Blues
  "navy": "#1c2b4a",
  "navy blue": "#1c2b4a",
  "blue": "#2a5fa8",
  "royal blue": "#2456a4",
  "light blue": "#6aafe6",
  "sky blue": "#87ceeb",
  "baby blue": "#89cff0",
  "dark blue": "#1c3050",
  "teal": "#2a8b8b",
  "turquoise": "#40e0d0",
  "aqua": "#00c8c8",
  // Reds / Pinks
  "red": "#b03a2e",
  "dark red": "#8b0000",
  "maroon": "#6b0f1a",
  "burgundy": "#7c2036",
  "wine": "#7c1b34",
  "pink": "#e8789b",
  "hot pink": "#d4006a",
  "blush": "#f0b8c4",
  "rose": "#c8697a",
  "mauve": "#b07080",
  "coral": "#e07055",
  "terracotta": "#b9533a",
  // Greens
  "green": "#3d7a4e",
  "forest green": "#3d5848",
  "army green": "#4b5320",
  "olive": "#6b6b28",
  "hunter green": "#355e3b",
  "sage": "#87a878",
  "mint": "#98d8c8",
  // Warm tones
  "orange": "#d4602a",
  "burnt orange": "#b84800",
  "yellow": "#e0c040",
  "mustard": "#c8a800",
  "sand": "#c8b88a",
  "tan": "#c8a87a",
  "khaki": "#b8a878",
  "caramel": "#9c6830",
  "mocha": "#7a4e38",
  "brown": "#6b4226",
  "chestnut": "#7b3f2a",
  // Purples
  "purple": "#6a3d8f",
  "lavender": "#a080c0",
  "plum": "#5a2d5a",
  "violet": "#7a30c0",
  // Leather / Laserette tones
  "rawhide": "#c8a06a",
  "natural": "#d4b878",
  "gray": "#9a9a9a",
  "grey": "#9a9a9a",
  // Wood tones (boxes, pendants, knives)
  "rosewood": "#7a3030",
  "walnut": "#5a3820",
  "dark walnut": "#3a2015",
  "cherry": "#8b2a2a",
  "burl": "#6a4a30",
  // Electro / split finishes
  "black / gold": "linear-gradient(135deg, #1a1a1a 50%, #c8985a 50%)",
  "white / gold": "linear-gradient(135deg, #f5f0e8 50%, #c8985a 50%)",
  "black/gold": "linear-gradient(135deg, #1a1a1a 50%, #c8985a 50%)",
  "white/gold": "linear-gradient(135deg, #f5f0e8 50%, #c8985a 50%)",
  "black / rainbow": "linear-gradient(135deg, #1a1a1a 35%, #e55 50%, #f90 65%, #5c5 80%, #48f 100%)",
  "white / rainbow": "linear-gradient(135deg, #f5f0e8 35%, #e55 50%, #f90 65%, #5c5 80%, #48f 100%)",
  "black/rainbow": "linear-gradient(135deg, #1a1a1a 35%, #e55 50%, #f90 65%, #5c5 80%, #48f 100%)",
  "white/rainbow": "linear-gradient(135deg, #f5f0e8 35%, #e55 50%, #f90 65%, #5c5 80%, #48f 100%)",
};

function colorForChoice(name: string): string {
  const key = (name ?? "").toLowerCase().trim();
  return SWATCH_COLORS[key] ?? "#aaa";
}

// Show swatches when the option is named "Color" or similar
function isColorOption(opt: NonNullable<WixProduct["productOptions"]>[0]): boolean {
  const name = (opt?.name ?? "").toLowerCase().trim();
  return (
    opt?.optionType === "color" ||
    name === "color" ||
    name === "colour" ||
    name === "finish color" ||
    name === "color / finish"
  );
}

export function BuyBox({ product, onColorSelect, colorOverride }: BuyBoxProps) {
  const { addToCart, buyNow, loading: cartLoading } = useCart();

  // One entry per option name, initialised to first visible choice
  const [selections, setSelections] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const opt of product.productOptions ?? []) {
      if (!opt.name) continue;
      const first = opt.choices?.find((c) => c.visible !== false);
      if (first) init[opt.name] = first.value ?? first.description ?? "";
    }
    return init;
  });

  // When the thumbnail rail selects a color, sync it into our selections map
  useEffect(() => {
    if (!colorOverride) return;
    const colorOpt = (product.productOptions ?? []).find(isColorOption);
    if (colorOpt?.name) {
      setSelections((prev) => ({ ...prev, [colorOpt.name!]: colorOverride }));
    }
  }, [colorOverride, product.productOptions]);

  const [qty, setQty] = useState(1);
  const [engraveOn, setEngraveOn] = useState(true);
  const [engText, setEngText] = useState("");
  const [engPlacement, setEngPlacement] = useState("front-center");
  const [adding, setAdding] = useState(false);
  const [buyingNow, setBuyingNow] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  const visibleOptions = (product.productOptions ?? []).filter(
    (opt) => (opt.choices?.filter((c) => c.visible !== false).length ?? 0) > 0
  );

  function selectChoice(optName: string, value: string, isColor?: boolean) {
    setSelections((prev) => ({ ...prev, [optName]: value }));
    if (isColor && onColorSelect) {
      onColorSelect(value);
    }
  }

  const cartParams = () => ({
    productId: product._id ?? "",
    quantity: qty,
    selectedOptions: Object.keys(selections).length > 0 ? selections : undefined,
    ...(engraveOn && engText ? { engravingText: engText, engravingPlacement: engPlacement } : {}),
  });

  function pillStyle(active: boolean): React.CSSProperties {
    return {
      padding: "7px 16px",
      borderRadius: "var(--r-pill)",
      border: `1.5px solid ${active ? "var(--ink)" : "var(--line)"}`,
      background: active ? "var(--ink)" : "transparent",
      color: active ? "var(--cream)" : "var(--ink)",
      fontSize: 13,
      fontWeight: active ? 600 : 400,
      cursor: "pointer",
      transition: "all .18s",
    };
  }

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
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 3 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} size={14} filled />
          ))}
        </div>
        <span style={{ fontSize: 13, color: "var(--muted)" }}>4.9 · 128 reviews</span>
      </div>

      {/* Name */}
      <h1
        className="display"
        style={{ fontSize: "clamp(30px, 4vw, 50px)", margin: "0 0 8px", fontWeight: 400, lineHeight: 1.05 }}
      >
        {product.name}
      </h1>

      {product.description && (
        <p
          style={{ fontSize: 14, color: "var(--muted)", margin: "0 0 18px", lineHeight: 1.65 }}
          dangerouslySetInnerHTML={{ __html: product.description.replace(/<[^>]+>/g, "") }}
        />
      )}

      {/* Price */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 28 }}>
        <span className="serif" style={{ fontSize: 30, fontWeight: 500 }}>
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

      {/* ── Product options ───────────────────────────────────────────────────── */}
      {visibleOptions.map((opt) => {
        if (!opt.name) return null;
        const choices = (opt.choices ?? []).filter((c) => c.visible !== false);
        const isColor = isColorOption(opt);
        const currentVal = selections[opt.name] ?? "";

        return (
          <div key={opt.name} style={{ marginBottom: 24 }}>
            {/* Option label row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 10,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>
                {opt.name}
                {currentVal && (
                  <span style={{ fontWeight: 400, color: "var(--muted)" }}> · {currentVal}</span>
                )}
              </span>
              <span style={{ fontSize: 11, color: "var(--muted-soft)" }}>
                {choices.length} option{choices.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Color option — circles removed; color is chosen via the thumbnail rail.
                Non-color options (size, finish, etc.) still render as pill buttons. */}
            {!isColor && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {choices.map((c, i) => {
                  const val = c.value ?? c.description ?? `Option ${i + 1}`;
                  const label = c.description ?? c.value ?? val;
                  const active = currentVal === val;
                  return (
                    <button
                      key={i}
                      onClick={() => selectChoice(opt.name!, val)}
                      disabled={c.inStock === false}
                      style={{
                        ...pillStyle(active),
                        opacity: c.inStock === false ? 0.38 : 1,
                        cursor: c.inStock === false ? "not-allowed" : "pointer",
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* ── Engraving panel ──────────────────────────────────────────────────── */}
      <div
        style={{
          marginBottom: 28,
          background: "var(--cream-2)",
          borderRadius: "var(--r-md)",
          padding: 22,
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
            <p style={{ fontSize: 12, color: "var(--muted)", margin: 0 }}>Included with your order</p>
          </div>
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
              <span style={{ fontSize: 11, color: "var(--muted-soft)", flexShrink: 0 }}>
                {engText.length}/40
              </span>
            </div>

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
                  <button key={p.id} onClick={() => setEngPlacement(p.id)} style={pillStyle(engPlacement === p.id)}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── Qty + Add to cart ─────────────────────────────────────────────────── */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
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
            style={{ width: 44, height: 52, border: 0, background: "transparent", cursor: "pointer", fontSize: 18, color: "var(--ink)" }}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span style={{ width: 36, textAlign: "center", fontSize: 15, fontWeight: 600 }}>{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            style={{ width: 44, height: 52, border: 0, background: "transparent", cursor: "pointer", color: "var(--ink)" }}
            aria-label="Increase quantity"
          >
            <PlusIcon size={16} />
          </button>
        </div>

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

      <button
        onClick={handleBuyNow}
        disabled={buyingNow || cartLoading}
        className="btn btn-secondary"
        style={{ width: "100%", justifyContent: "center", fontSize: 15, marginBottom: 4, opacity: buyingNow || cartLoading ? 0.7 : 1 }}
      >
        {buyingNow ? "Loading checkout…" : "Buy it now"}
      </button>

      {error && (
        <p style={{ fontSize: 13, color: "var(--terracotta)", marginBottom: 12 }}>{error}</p>
      )}

      <div
        style={{
          display: "flex",
          gap: 20,
          fontSize: 12,
          color: "var(--muted)",
          paddingTop: 16,
          borderTop: "1px solid var(--line-soft)",
          flexWrap: "wrap",
        }}
      >
        {["✦ Ships in 3–5 days", "✦ Free returns (stock)", "✦ Insured shipping"].map((b) => (
          <span key={b}>{b}</span>
        ))}
      </div>
    </div>
  );
}
