"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// ── Shared button style ───────────────────────────────────────────────────────
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
  transition: "background 0.18s var(--ease), transform 0.14s var(--ease)",
  width: "100%",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--cream)",
  border: "1.5px solid var(--line)",
  borderRadius: "var(--r-sm)",
  padding: "12px 16px",
  fontSize: 15,
  color: "var(--ink)",
  outline: "none",
  fontFamily: "var(--font-body)",
  transition: "border-color 0.15s",
};

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1.5px solid var(--line)",
  borderRadius: "var(--r-lg)",
  padding: "40px 36px",
  boxShadow: "var(--shadow-md)",
  display: "flex",
  flexDirection: "column",
  gap: 24,
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  fontSize: 13,
  fontWeight: 600,
  color: "var(--ink-soft)",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
};

// ── Deposit card ──────────────────────────────────────────────────────────────
function DepositCard() {
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
    <div style={cardStyle}>
      {/* Badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
          fontSize: "clamp(26px, 4vw, 34px)",
          fontWeight: 400,
          margin: "0 0 10px",
          lineHeight: 1.1,
        }}>
          Custom Order{" "}
          <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>Deposit</em>
        </h2>
        <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
          Ready to start your custom piece? A $20 design fee reserves your studio slot and
          covers Donna&rsquo;s initial design work. It&rsquo;s non-refundable and applied to
          your final total per{" "}
          <Link href="/policies" style={{ color: "var(--terracotta)", textDecoration: "underline" }}>
            our custom order policy
          </Link>.
        </p>
      </div>

      {/* Price callout */}
      <div style={{
        background: "var(--cream-2)",
        borderRadius: "var(--r-md)",
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div>
          <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Design fee</p>
          <p style={{ margin: 0, fontSize: 32, fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--ink)" }}>$20.00</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ margin: 0, fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>Applied to your<br />final balance</p>
        </div>
      </div>

      {/* Trust note */}
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
          <strong style={{ color: "var(--ink)" }}>Already submitted an inquiry?</strong> Great — pay your deposit here and Donna will be in touch within 24 hours to discuss your design. Haven&rsquo;t inquired yet?{" "}
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
        {loading ? "Redirecting…" : "Pay $20 Deposit — Secure Checkout"}
      </button>

      <p style={{ fontSize: 12, color: "var(--muted-soft)", textAlign: "center", margin: 0 }}>
        Secured by Stripe · SSL encrypted · No card info stored
      </p>
    </div>
  );
}

// ── Balance card ──────────────────────────────────────────────────────────────
function BalanceCard() {
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [phone,    setPhone]    = useState("");
  const [orderRef, setOrderRef] = useState("");
  const [amount,   setAmount]   = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const parsed = parseFloat(amount);
    if (!name || !email || !parsed || parsed < 1) {
      setError("Please fill in your name, email, and a valid amount.");
      return;
    }
    setLoading(true);
    try {
      const res  = await fetch("/api/checkout", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ type: "balance", name, email, phone, orderRef, amount: parsed }),
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
    <div style={cardStyle}>
      <div>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(26px, 4vw, 34px)",
          fontWeight: 400,
          margin: "0 0 10px",
          lineHeight: 1.1,
        }}>
          Pay Remaining{" "}
          <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>Balance</em>
        </h2>
        <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
          For customers who have received a final confirmed total from Donna. Enter the exact amount
          she quoted you.
        </p>
      </div>

      {/* Warning note */}
      <div style={{
        display: "flex",
        gap: 10,
        padding: "14px 18px",
        background: "#FFF8EC",
        borderRadius: "var(--r-sm)",
        border: "1px solid rgba(181, 138, 79, 0.3)",
      }}>
        <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
        <p style={{ margin: 0, fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5 }}>
          <strong>Only pay here after Donna has confirmed your final total.</strong> If you haven&rsquo;t received a quote yet,{" "}
          <Link href="/contact" style={{ color: "var(--brass)" }}>contact Donna first</Link>.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <label style={labelStyle}>
            Name *
            <input required value={name} onChange={e => setName(e.target.value)}
              placeholder="Your full name" style={inputStyle} />
          </label>
          <label style={labelStyle}>
            Email *
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com" style={inputStyle} />
          </label>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <label style={labelStyle}>
            Phone
            <input value={phone} onChange={e => setPhone(e.target.value)}
              placeholder="(optional)" style={inputStyle} />
          </label>
          <label style={labelStyle}>
            Order reference
            <input value={orderRef} onChange={e => setOrderRef(e.target.value)}
              placeholder="e.g. Wedding boards" style={inputStyle} />
          </label>
        </div>
        <label style={labelStyle}>
          Payment amount *
          <div style={{ position: "relative" }}>
            <span style={{
              position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
              color: "var(--muted)", fontWeight: 600, fontSize: 16,
            }}>$</span>
            <input required type="number" min="1" step="0.01"
              value={amount} onChange={e => setAmount(e.target.value)}
              placeholder="0.00"
              style={{ ...inputStyle, paddingLeft: 30 }} />
          </div>
        </label>

        {error && <p style={{ color: "var(--terracotta-deep)", fontSize: 14, margin: 0 }}>{error}</p>}

        <button type="submit" disabled={loading} style={{ ...btnPrimary, marginTop: 4, opacity: loading ? 0.7 : 1 }}>
          {loading ? "Redirecting…" : "Pay Balance — Secure Checkout"}
        </button>
      </form>

      <p style={{ fontSize: 12, color: "var(--muted-soft)", textAlign: "center", margin: 0 }}>
        Secured by Stripe · SSL encrypted · No card info stored
      </p>
    </div>
  );
}

// ── Invoice card ──────────────────────────────────────────────────────────────
function InvoiceCard() {
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [note,    setNote]    = useState("");
  const [amount,  setAmount]  = useState("");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const parsed = parseFloat(amount);
    if (!name || !email || !parsed || parsed < 1) {
      setError("Please fill in your name, email, and a valid amount.");
      return;
    }
    setLoading(true);
    try {
      const res  = await fetch("/api/checkout", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ type: "invoice", name, email, note, amount: parsed }),
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
    <div style={cardStyle}>
      <div>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(26px, 4vw, 34px)",
          fontWeight: 400,
          margin: "0 0 10px",
          lineHeight: 1.1,
        }}>
          Custom{" "}
          <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>Invoice</em>
        </h2>
        <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
          For special orders, bulk gifting, or custom amounts arranged directly with Donna. Enter
          the exact amount from your invoice.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <label style={labelStyle}>
            Name *
            <input required value={name} onChange={e => setName(e.target.value)}
              placeholder="Your full name" style={inputStyle} />
          </label>
          <label style={labelStyle}>
            Email *
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com" style={inputStyle} />
          </label>
        </div>
        <label style={labelStyle}>
          Order note
          <input value={note} onChange={e => setNote(e.target.value)}
            placeholder="e.g. 50 wedding favors" style={inputStyle} />
        </label>
        <label style={labelStyle}>
          Invoice amount *
          <div style={{ position: "relative" }}>
            <span style={{
              position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
              color: "var(--muted)", fontWeight: 600, fontSize: 16,
            }}>$</span>
            <input required type="number" min="1" step="0.01"
              value={amount} onChange={e => setAmount(e.target.value)}
              placeholder="0.00"
              style={{ ...inputStyle, paddingLeft: 30 }} />
          </div>
        </label>

        {error && <p style={{ color: "var(--terracotta-deep)", fontSize: 14, margin: 0 }}>{error}</p>}

        <button type="submit" disabled={loading} style={{ ...btnPrimary, marginTop: 4, opacity: loading ? 0.7 : 1 }}>
          {loading ? "Redirecting…" : "Pay Invoice — Secure Checkout"}
        </button>
      </form>

      <p style={{ fontSize: 12, color: "var(--muted-soft)", textAlign: "center", margin: 0 }}>
        Secured by Stripe · SSL encrypted · No card info stored
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
          <div className="reveal">
            <p className="eyebrow" style={{ marginBottom: 16 }}>Secure payment</p>
            <h1
              className="display"
              style={{ fontSize: "clamp(52px, 7vw, 96px)", margin: "0 0 24px", fontWeight: 400, lineHeight: 0.92 }}
            >
              Pay for your{" "}
              <em style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--terracotta)" }}>
                custom piece.
              </em>
            </h1>
            <p style={{ fontSize: 18, color: "var(--muted)", maxWidth: 560, lineHeight: 1.6 }}>
              All payments are processed securely through Stripe. Choose the option that matches
              where you are in your order.
            </p>
          </div>
        </div>
      </section>

      {/* ── Canceled banner ─────────────────────────────────────────────── */}
      <div className="container" style={{ maxWidth: 960 }}>
        <Suspense fallback={null}>
          <CanceledBanner />
        </Suspense>
      </div>

      {/* ── How this works strip ────────────────────────────────────────── */}
      <section style={{ padding: "0 0 48px" }}>
        <div className="container" style={{ maxWidth: 960 }}>
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
              { n: "01", t: "Submit an inquiry", d: "Use the custom form or contact Donna directly." },
              { n: "02", t: "Get your quote",    d: "Donna confirms your design and final price within 24 hrs." },
              { n: "03", t: "Pay here",          d: "Deposit to start, or balance once Donna confirms your total." },
            ].map(s => (
              <div key={s.n} style={{ background: "var(--cream-2)", padding: "28px 24px" }}>
                <p style={{ margin: "0 0 8px", fontFamily: "var(--font-display)", fontSize: 13, color: "var(--terracotta)", fontWeight: 600, letterSpacing: "0.05em" }}>{s.n}</p>
                <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 15, color: "var(--ink)" }}>{s.t}</p>
                <p style={{ margin: 0, fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Payment cards ───────────────────────────────────────────────── */}
      <section style={{ padding: "0 0 120px" }}>
        <div className="container" style={{ maxWidth: 960, display: "flex", flexDirection: "column", gap: 32 }}>

          {/* Deposit */}
          <div className="reveal">
            <DepositCard />
          </div>

          {/* Balance + Invoice side-by-side on desktop */}
          <div
            className="reveal pay-two-col"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}
          >
            <BalanceCard />
            <InvoiceCard />
          </div>
        </div>
      </section>

      {/* ── Trust footer ────────────────────────────────────────────────── */}
      <section style={{ padding: "48px 0 80px", borderTop: "1px solid var(--line)" }}>
        <div className="container" style={{ maxWidth: 960, textAlign: "center" }}>
          <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 24px" }}>
            Not sure which option to use? <Link href="/contact" style={{ color: "var(--terracotta)" }}>Contact Donna</Link> and she&rsquo;ll
            tell you exactly what to pay. We never charge anything without your knowledge and approval.
          </p>
          <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
            {["🔒 SSL encrypted", "💳 Stripe secure checkout", "📧 Receipt emailed to you"].map(t => (
              <span key={t} style={{ fontSize: 13, color: "var(--muted-soft)", fontWeight: 500 }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Responsive overrides ─────────────────────────────────────────── */}
      <style>{`
        @media (max-width: 700px) {
          .pay-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
