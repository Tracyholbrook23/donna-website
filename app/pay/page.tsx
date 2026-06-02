"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const btnPrimary: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  background: "var(--terracotta)",
  color: "#fff",
  border: "none",
  borderRadius: "var(--r-pill)",
  padding: "14px 32px",
  fontSize: 15,
  fontWeight: 600,
  letterSpacing: "0.01em",
  cursor: "pointer",
  transition: "background 0.18s var(--ease)",
  width: "100%",
};

// ── Commission Fee card ──────────────────────────────────────────────────────────────
function CommissionFeeCard() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handlePay = async () => {
    setLoading(true);
    setError("");
    try {
      const res  = await fetch("/api/checkout", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ type: "deposit" }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Failed");
      window.location.href = data.url;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: "#fff",
      border: "1.5px solid var(--line)",
      borderRadius: "var(--r-lg)",
      padding: "48px 44px",
      boxShadow: "var(--shadow-md)",
      display: "flex",
      flexDirection: "column",
      gap: 28,
      maxWidth: 600,
      margin: "0 auto",
    }}>
      {/* Badge */}
      <div>
        <span style={{
          background: "var(--blush)",
          color: "var(--terracotta-deep)",
          borderRadius: "var(--r-pill)",
          padding: "4px 14px",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}>Step 1 of your order</span>
      </div>

      {/* Heading */}
      <div>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 400,
          margin: "0 0 12px",
          lineHeight: 1.05,
        }}>
          Custom Order{" "}
          <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>Commission Fee</em>
        </h2>
        <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
          Ready to start your custom piece? The $20 commission fee reserves your studio slot
          and covers Donna&rsquo;s design time. It&rsquo;s non-refundable and is separate from
          your final order total. See{" "}
          <Link href="/policies" style={{ color: "var(--terracotta)", textDecoration: "underline" }}>
            our custom order policy
          </Link>{" "}for full details.
        </p>
      </div>

      {/* Price callout */}
      <div style={{
        background: "var(--cream-2)",
        borderRadius: "var(--r-md)",
        padding: "24px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div>
          <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Design fee</p>
          <p style={{ margin: 0, fontSize: 36, fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--ink)" }}>$20.00</p>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: "var(--muted)", lineHeight: 1.5, textAlign: "right" }}>Non-refundable<br />separate from final total</p>
      </div>

      {/* Tip */}
      <div style={{
        display: "flex",
        gap: 10,
        padding: "14px 18px",
        background: "var(--cream-2)",
        borderRadius: "var(--r-sm)",
        border: "1px solid var(--line)",
      }}>
        <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
        <p style={{ margin: 0, fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>
          <strong style={{ color: "var(--ink)" }}>Haven&rsquo;t submitted an inquiry yet?</strong>{" "}
          <Link href="/custom" style={{ color: "var(--terracotta)" }}>Start with the custom form first →</Link>
        </p>
      </div>

      {error && (
        <p style={{ color: "var(--terracotta-deep)", fontSize: 14, margin: 0 }}>{error}</p>
      )}

      <button
        onClick={handlePay}
        disabled={loading}
        style={{ ...btnPrimary, opacity: loading ? 0.7 : 1 }}
      >
        {loading ? "Redirecting…" : "Pay $20 — Secure Checkout"}
      </button>

      <p style={{ fontSize: 12, color: "var(--muted-soft)", textAlign: "center", margin: 0 }}>
        Secured by Square · SSL encrypted · No card info stored
      </p>
    </div>
  );
}

// ── Canceled banner ───────────────────────────────────────────────────────────
function CanceledBanner() {
  const params = useSearchParams();
  if (!params.get("canceled")) return null;
  return (
    <div style={{
      background: "#FFF8EC",
      border: "1.5px solid rgba(181, 138, 79, 0.3)",
      borderRadius: "var(--r-md)",
      padding: "16px 24px",
      marginBottom: 32,
      fontSize: 14,
      color: "var(--ink-soft)",
      maxWidth: 600,
      margin: "0 auto 32px",
    }}>
      <strong>Payment canceled.</strong> No charge was made. Take your time — we&rsquo;re here when you&rsquo;re ready.
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function PayPage() {
  return (
    <main className="page-enter">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 0 60px" }}>
        <div className="container" style={{ maxWidth: 960 }}>
          <div className="reveal" style={{ textAlign: "center" }}>
            <p className="eyebrow" style={{ marginBottom: 16 }}>Secure payment</p>
            <h1
              className="display"
              style={{ fontSize: "clamp(52px, 7vw, 96px)", margin: "0 0 24px", fontWeight: 400, lineHeight: 0.92 }}
            >
              Reserve your{" "}
              <em style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--terracotta)" }}>
                studio slot.
              </em>
            </h1>
            <p style={{ fontSize: 18, color: "var(--muted)", maxWidth: 500, lineHeight: 1.6, margin: "0 auto" }}>
              Pay the $20 commission fee to get your custom order started.
              Donna will be in touch within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <section style={{ padding: "0 0 48px" }}>
        <div className="container" style={{ maxWidth: 680 }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            background: "var(--line)",
            borderRadius: "var(--r-md)",
            overflow: "hidden",
            border: "1px solid var(--line)",
          }}>
            {[
              { n: "01", t: "Submit an inquiry", d: "Fill out the custom order form or DM on Instagram." },
              { n: "02", t: "Get your quote",    d: "Donna confirms your design and price within 24 hrs." },
              { n: "03", t: "Pay commission fee",  d: "Pay $20 here to reserve your slot and kick things off." },
            ].map(s => (
              <div key={s.n} style={{ background: "var(--cream-2)", padding: "24px 20px" }}>
                <p style={{ margin: "0 0 6px", fontFamily: "var(--font-display)", fontSize: 13, color: "var(--terracotta)", fontWeight: 600 }}>{s.n}</p>
                <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>{s.t}</p>
                <p style={{ margin: 0, fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Canceled banner ─────────────────────────────────────────────── */}
      <div className="container">
        <Suspense fallback={null}>
          <CanceledBanner />
        </Suspense>
      </div>

      {/* ── Commission Fee card ────────────────────────────────────────────────── */}
      <section style={{ padding: "0 0 80px" }}>
        <div className="container reveal">
          <CommissionFeeCard />
        </div>
      </section>

      {/* ── Trust strip ─────────────────────────────────────────────────── */}
      <section style={{ padding: "40px 0 80px", borderTop: "1px solid var(--line)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <p style={{ fontSize: 14, color: "var(--muted)", maxWidth: 480, margin: "0 auto 20px", lineHeight: 1.7 }}>
            Questions before paying?{" "}
            <Link href="/contact" style={{ color: "var(--terracotta)" }}>Contact Donna</Link> — she&rsquo;ll
            never charge anything without your knowledge and approval.
          </p>
          <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
            {["🔒 SSL encrypted", "💳 Square secure checkout", "📧 Receipt emailed to you"].map(t => (
              <span key={t} style={{ fontSize: 13, color: "var(--muted-soft)", fontWeight: 500 }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
