"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";

const CONTACT_REASONS = [
  { id: "order",     label: "Question about an order" },
  { id: "custom",    label: "Custom commission inquiry" },
  { id: "corporate", label: "Corporate / bulk gifting" },
  { id: "press",     label: "Press or stockist inquiry" },
  { id: "other",     label: "Something else" },
];

export default function ContactPage() {
  const [sent, setSent]           = useState(false);
  const [sending, setSending]     = useState(false);
  const [sendError, setSendError] = useState("");
  const [reason, setReason]       = useState("other");
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [message, setMessage]     = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError("");

    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ reason, name, email, message }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setSendError("Something went wrong. Please try again or DM us on Instagram.");
    } finally {
      setSending(false);
    }
  };

  const isCustom = reason === "custom";

  return (
    <main className="page-enter">

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 0 60px" }}>
        <div className="container" style={{ maxWidth: 960 }}>
          <div className="reveal">
            <p className="eyebrow" style={{ marginBottom: 16 }}>Get in touch</p>
            <h1
              className="display"
              style={{ fontSize: "clamp(52px, 7vw, 96px)", margin: "0 0 24px", fontWeight: 400, lineHeight: 0.92 }}
            >
              Let&rsquo;s talk about{" "}
              <em style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--terracotta)" }}>
                your piece.
              </em>
            </h1>
            <p style={{ fontSize: 18, color: "var(--muted)", maxWidth: 520, lineHeight: 1.6 }}>
              Questions, commissions, wholesale — use the form or reach out directly.
              We reply within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <section style={{ padding: "0 0 120px" }}>
        <div className="container">
          <div className="layout-contact" style={{ gap: 80 }}>

            {/* ── Left: contact details ────────────────────────────────── */}
            <div className="reveal" style={{ position: "sticky", top: 100, alignSelf: "start" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

                {/* Instagram — only confirmed real contact */}
                <ContactDetail
                  label="Instagram"
                  value="@outofjerseycreations"
                  href="https://www.instagram.com/outofjerseycreations"
                  note="DMs open · usually fastest"
                />

                {/* Email — placeholder until Donna confirms */}
                <ContactDetail
                  label="Email"
                  value="hello@outofjerseycreationshub.com"
                  href="mailto:hello@outofjerseycreationshub.com"
                  note="General questions & orders"
                />

                <ContactDetail
                  label="Custom commissions"
                  value="custom@outofjerseycreationshub.com"
                  href="mailto:custom@outofjerseycreationshub.com"
                  note="For all commission briefs"
                />

              </div>

              {/* Studio hours */}
              <div style={{
                marginTop: 48,
                padding: "24px 28px",
                background: "var(--cream-2)",
                borderRadius: "var(--r-md)",
                border: "1px solid var(--line)",
              }}>
                <p className="eyebrow" style={{ marginBottom: 10 }}>Studio hours</p>
                <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.75, margin: 0 }}>
                  Monday–Friday, 9am–5pm PT
                  <br />
                  California, USA
                  <br />
                  <em style={{ color: "var(--muted)" }}>Closed weekends &amp; major US holidays</em>
                </p>
              </div>

              <p style={{ marginTop: 20, fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
                For custom commissions, use the{" "}
                <Link href="/custom" style={{ color: "var(--ink)", textDecoration: "underline" }}>
                  dedicated brief form
                </Link>{" "}
                — it&rsquo;s faster than email.
              </p>
            </div>

            {/* ── Right: form ──────────────────────────────────────────── */}
            <div className="reveal">
              <div style={{
                background: "var(--cream)",
                border: "1px solid var(--line)",
                borderRadius: "var(--r-lg)",
                padding: 40,
                boxShadow: "var(--shadow-md)",
              }}>

                {sent ? (
                  /* ── Success ── */
                  <div style={{ textAlign: "center", padding: "48px 20px" }}>
                    <div style={{
                      width: 64, height: 64, borderRadius: "50%",
                      background: "var(--forest)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 24px",
                      boxShadow: "0 0 0 10px rgba(61,88,72,0.1)",
                    }}>
                      <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                    </div>
                    <h3 className="display" style={{ fontSize: 36, margin: "0 0 12px", fontWeight: 400 }}>
                      Message sent.
                    </h3>
                    <p style={{ color: "var(--muted)", maxWidth: 320, margin: "0 auto 32px", fontSize: 15, lineHeight: 1.6 }}>
                      Donna will be in touch within 24 hours, usually same day.
                    </p>
                    <Link href="/shop" className="btn btn-primary">
                      Browse the gallery <ArrowIcon size={14} />
                    </Link>
                  </div>

                ) : (
                  <form onSubmit={handleSubmit}>
                    <h3 className="serif" style={{ fontSize: 22, margin: "0 0 24px" }}>
                      Send a message
                    </h3>

                    {/* Reason chips */}
                    <div style={{ marginBottom: 20 }}>
                      <label style={labelStyle}>What&rsquo;s this about?</label>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {CONTACT_REASONS.map((r) => {
                          const sel = reason === r.id;
                          return (
                            <button
                              key={r.id}
                              type="button"
                              onClick={() => setReason(r.id)}
                              style={{
                                padding: "8px 14px",
                                borderRadius: "var(--r-pill)",
                                border: `1.5px solid ${sel ? "var(--ink)" : "var(--line)"}`,
                                background: sel ? "var(--ink)" : "transparent",
                                color: sel ? "var(--cream)" : "var(--ink)",
                                fontSize: 13,
                                cursor: "pointer",
                                transition: "all .18s",
                                outline: "none",
                              }}
                            >
                              {r.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Commission nudge — shown when "Custom commission inquiry" is selected */}
                    {isCustom && (
                      <div style={{
                        background: "rgba(185,83,58,0.07)",
                        border: "1.5px solid rgba(185,83,58,0.25)",
                        borderRadius: "var(--r-md)",
                        padding: "18px 20px",
                        marginBottom: 20,
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        flexWrap: "wrap",
                      }}>
                        <div style={{ flex: 1, minWidth: 200 }}>
                          <p style={{ fontSize: 14, fontWeight: 700, margin: "0 0 4px", color: "var(--terracotta)" }}>
                            Get a faster response with the brief form
                          </p>
                          <p style={{ fontSize: 13, color: "var(--ink)", margin: 0, lineHeight: 1.55, opacity: 0.8 }}>
                            Our dedicated custom order form lets you share product details, upload inspiration,
                            and describe your vision — so Donna can send a quote right away.
                          </p>
                        </div>
                        <Link
                          href="/custom"
                          className="btn btn-primary"
                          style={{ flexShrink: 0, fontSize: 13, padding: "10px 18px" }}
                        >
                          Use the brief form <ArrowIcon size={12} />
                        </Link>
                      </div>
                    )}

                    {/* Name + Email */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                      <div>
                        <label style={labelStyle}>
                          Name <span style={{ color: "var(--terracotta)" }}>*</span>
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          required
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>
                          Email <span style={{ color: "var(--terracotta)" }}>*</span>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@email.com"
                          required
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div style={{ marginBottom: 24 }}>
                      <label style={labelStyle}>
                        Message <span style={{ color: "var(--terracotta)" }}>*</span>
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="What can we help you with?"
                        rows={6}
                        required
                        style={{ ...inputStyle, resize: "vertical", minHeight: 130 }}
                      />
                    </div>

                    {/* Error */}
                    {sendError && (
                      <p style={{
                        fontSize: 13, color: "var(--terracotta)",
                        background: "rgba(185,83,58,0.08)",
                        border: "1px solid rgba(185,83,58,0.2)",
                        borderRadius: "var(--r-sm)",
                        padding: "11px 16px",
                        marginBottom: 16,
                      }}>
                        {sendError}
                      </p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={sending || !name || !email || !message}
                      className="btn btn-primary"
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        gap: 10,
                        opacity: sending || !name || !email || !message ? 0.45 : 1,
                      }}
                    >
                      {sending ? (
                        <>
                          <span style={{
                            display: "inline-block",
                            width: 14, height: 14,
                            border: "2px solid rgba(255,255,255,0.4)",
                            borderTopColor: "#fff",
                            borderRadius: "50%",
                            animation: "spin 0.7s linear infinite",
                          }} />
                          Sending…
                        </>
                      ) : (
                        <>Send message <ArrowIcon size={14} /></>
                      )}
                    </button>

                    <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 14, textAlign: "center" }}>
                      We respond within 24 hours, usually same business day.
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ContactDetail({ label, value, href, note }: {
  label: string; value: string; href: string; note: string;
}) {
  return (
    <div>
      <p style={{
        fontSize: 11, fontWeight: 600, letterSpacing: "0.14em",
        textTransform: "uppercase", color: "var(--muted)", margin: "0 0 6px",
      }}>
        {label}
      </p>
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        style={{
          display: "block",
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 22,
          color: "var(--ink)",
          textDecoration: "none",
          marginBottom: 4,
        }}>
        {value}
      </a>
      <p style={{ fontSize: 13, color: "var(--muted-soft)", margin: 0 }}>{note}</p>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--ink)",
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  border: "1.5px solid var(--line)",
  borderRadius: "var(--r-sm)",
  background: "var(--cream)",
  color: "var(--ink)",
  fontSize: 15,
  fontFamily: "var(--font-body)",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color .15s",
};
