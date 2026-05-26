"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cartContext";
import { PlusIcon } from "@/components/Icons";

export default function CartPage() {
  const { cartItems, cartCount, cartSubtotal, loading, removeFromCart, updateQty, goToCheckout } =
    useCart();

  const isEmpty = cartItems.length === 0;

  return (
    <main style={{ minHeight: "70vh", padding: "60px 0 100px" }}>
      <div className="container" style={{ maxWidth: 900 }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <p className="eyebrow" style={{ marginBottom: 8 }}>Your bag</p>
          <h1
            className="display"
            style={{ fontSize: "clamp(36px,5vw,60px)", fontWeight: 400, margin: 0 }}
          >
            {isEmpty
              ? <>Your cart is <em style={{ color: "var(--terracotta)", fontStyle: "italic" }}>empty.</em></>
              : <>{cartCount} {cartCount === 1 ? "item" : "items"} in your <em style={{ color: "var(--terracotta)", fontStyle: "italic" }}>bag.</em></>
            }
          </h1>
        </div>

        {isEmpty ? (
          <EmptyCart />
        ) : (
          <div className="layout-cart">
            {/* Line items */}
            <div className="cart-items">
              {cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onRemove={removeFromCart}
                  onUpdateQty={updateQty}
                  disabled={loading}
                />
              ))}
            </div>

            {/* Order summary */}
            <div
              className="cart-summary"
              style={{
                position: "sticky",
                top: 100,
                background: "var(--cream-2)",
                borderRadius: "var(--r-md)",
                padding: 32,
                border: "1px solid var(--line-soft)",
              }}
            >
              <h2
                className="serif"
                style={{ fontSize: 22, margin: "0 0 24px", fontWeight: 500 }}
              >
                Order summary
              </h2>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 12,
                  fontSize: 14,
                  color: "var(--muted)",
                }}
              >
                <span>Subtotal ({cartCount} {cartCount === 1 ? "item" : "items"})</span>
                <span style={{ color: "var(--ink)", fontWeight: 600 }}>{cartSubtotal}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 24,
                  fontSize: 14,
                  color: "var(--muted)",
                }}
              >
                <span>Shipping</span>
                <span style={{ color: "var(--forest)", fontWeight: 500 }}>
                  Calculated at checkout
                </span>
              </div>

              <div
                style={{
                  borderTop: "1px solid var(--line)",
                  paddingTop: 20,
                  marginBottom: 24,
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                <span>Estimated total</span>
                <span>{cartSubtotal}</span>
              </div>

              <button
                className="btn btn-primary"
                onClick={goToCheckout}
                disabled={loading || isEmpty}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  fontSize: 15,
                  padding: "16px 24px",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Loading…" : "Proceed to Checkout →"}
              </button>

              <p
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  color: "var(--muted)",
                  marginTop: 14,
                }}
              >
                Secure checkout powered by Wix
              </p>

              {/* Trust row */}
              <div
                style={{
                  marginTop: 20,
                  paddingTop: 20,
                  borderTop: "1px solid var(--line-soft)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  fontSize: 12,
                  color: "var(--muted)",
                }}
              >
                {["✦ Ships in 3–5 business days", "✦ Insured shipping", "✦ Free returns on stock items"].map(
                  (b) => <span key={b}>{b}</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// ─── Line item row ─────────────────────────────────────────────────────────────

function CartItem({
  item,
  onRemove,
  onUpdateQty,
  disabled,
}: {
  item: ReturnType<typeof useCart>["cartItems"][number];
  onRemove: (id: string) => Promise<void>;
  onUpdateQty: (id: string, qty: number) => Promise<void>;
  disabled: boolean;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "88px 1fr auto",
        gap: 20,
        padding: "24px 0",
        borderBottom: "1px solid var(--line-soft)",
        alignItems: "center",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          width: 88,
          height: 88,
          borderRadius: "var(--r-sm)",
          overflow: "hidden",
          background: "var(--cream-3)",
          position: "relative",
          flexShrink: 0,
        }}
      >
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.productName ?? "Product"}
            fill
            style={{ objectFit: "cover" }}
            sizes="88px"
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              color: "var(--muted-soft)",
            }}
          >
            ✦
          </div>
        )}
      </div>

      {/* Details */}
      <div style={{ minWidth: 0 }}>
        <p
          className="serif"
          style={{
            fontSize: 17,
            fontWeight: 500,
            margin: "0 0 4px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.productName}
        </p>
        {item.options && (
          <p
            style={{
              fontSize: 12,
              color: "var(--muted)",
              margin: "0 0 12px",
            }}
          >
            {item.options}
          </p>
        )}

        {/* Qty controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          <button
            onClick={() => onUpdateQty(item._id, Math.max(1, (item.quantity ?? 1) - 1))}
            disabled={disabled || (item.quantity ?? 1) <= 1}
            aria-label="Decrease quantity"
            style={{
              width: 32,
              height: 32,
              border: "1px solid var(--line)",
              borderRadius: "var(--r-pill) 0 0 var(--r-pill)",
              background: "transparent",
              cursor: "pointer",
              fontSize: 18,
              color: "var(--ink)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: (item.quantity ?? 1) <= 1 ? 0.4 : 1,
            }}
          >
            −
          </button>
          <span
            style={{
              width: 36,
              height: 32,
              border: "1px solid var(--line)",
              borderLeft: "none",
              borderRight: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQty(item._id, (item.quantity ?? 1) + 1)}
            disabled={disabled}
            aria-label="Increase quantity"
            style={{
              width: 32,
              height: 32,
              border: "1px solid var(--line)",
              borderRadius: "0 var(--r-pill) var(--r-pill) 0",
              background: "transparent",
              cursor: "pointer",
              color: "var(--ink)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PlusIcon size={12} />
          </button>

          <button
            onClick={() => onRemove(item._id)}
            disabled={disabled}
            style={{
              marginLeft: 16,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 12,
              color: "var(--muted)",
              padding: "4px 0",
              textDecoration: "underline",
              textUnderlineOffset: 2,
            }}
          >
            Remove
          </button>
        </div>
      </div>

      {/* Price */}
      <div
        style={{
          textAlign: "right",
          flexShrink: 0,
        }}
      >
        <span
          className="serif"
          style={{ fontSize: 18, fontWeight: 500 }}
        >
          {item.price ?? "—"}
        </span>
      </div>
    </div>
  );
}

// ─── Empty state ───────────────────────────────────────────────────────────────

function EmptyCart() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "60px 0 40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "var(--cream-2)",
          border: "1px solid var(--line)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 32,
          color: "var(--muted-soft)",
        }}
      >
        ✦
      </div>
      <div>
        <p style={{ fontSize: 16, color: "var(--muted)", margin: "0 0 4px" }}>
          Nothing here yet.
        </p>
        <p style={{ fontSize: 14, color: "var(--muted-soft)", margin: 0 }}>
          Browse the shop and add something you love.
        </p>
      </div>
      <Link href="/shop" className="btn btn-primary" style={{ fontSize: 14 }}>
        Shop Now →
      </Link>
    </div>
  );
}
