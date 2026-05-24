"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";

const CONTACT_REASONS = [
  { id: "order", label: "Question about an order" },
  { id: "custom", label: "Custom commission inquiry" },
  { id: "corporate", label: "Corporate / bulk gifting" },
  { id: "press", label: "Press or stockist inquiry" },
  { id: "other", label: "Something else" },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [reason, setReason] = useState("other");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="page-enter">
      {/* Header */}
      <section style={{ padding: "80px 0 60px" }}>
        <div className="container" style={{ maxWidth: 960 }}>
          <div className="reveal">
            <p className="eyebrow" style={{ marginBottom: 16 }}>
              Get in touch
            </p>
            <h1
              className="display"
              style={{
                fontSize: "clamp(56px, 7vw, 96px)",
                margin: "0 0 24px",
                fontWeight: 400,
                lineHeight: 0.92,
              }}
            >
              Let&rsquo;s talk about{" "}
              <em
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  color: "var(--terracotta)",
                }}
              >
                your piece.
              </em>
            </h1>
            <p
              style={{
                fontSize: 18,
                color: "var(--muted)",
                maxWidth: 540,
                lineHeight: 1.6,
              }}
            >
              Questions, commissions, wholesale — use the form or reach out
              directly. We reply within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "0 0 120px" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr",
              gap: 80,
              alignItems: "start",
            }}
          >
            {/* Left: contact details */}
            <div className="reveal" style={{ position: "sticky", top: 100 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 32,
                }}
              >
                {[
                  {
                    label: "Email",
                    value: "hello@outofjersey.com",
                    href: "mailto:hello@outofjersey.com",
                    note: "General questions & orders",
                  },
                  {
                    label: "Custom commissions",
                    value: "custom@outofjersey.com",
                    href: "mailto:custom@outofjersey.com",
                    note: "For all commission briefs",
                  },
                  {
                    label: "Instagram",
                    value: "@outofjersey.engraving",
                    href: "#",
                    note: "DMs open · usually fastest",
                  },
                  {
                    label: "WhatsApp",
                    value: "+1 (555) 555-0177",
                    href: "#",
                    note: "Business hours EST",
                  },
                ].map((c) => (
                  <div key={c.label}>
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                        margin: "0 0 6px",
                      }}
                    >
                      {c.label}
                    </p>
                    <a
                      href={c.href}
                      style={{
                        display: "block",
                        fontFamily: "var(--font-display)",
                        fontStyle: "italic",
                        fontSize: 22,
                        color: "var(--ink)",
                        textDecoration: "none",
                        marginBottom: 4,
                      }}
                    >
                      {c.value}
                    </a>
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--muted-soft)",
                        margin: 0,
                      }}
                    >
                      {c.note}
                    </p>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 48,
                  padding: "28px",
                  background: "var(--cream-2)",
                  borderRadius: "var(--r-md)",
                }}
              >
                <p
                  className="eyebrow"
                  style={{ marginBottom: 10 }}
                >
                  Studio hours
                </p>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--ink-soft)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  Monday–Friday, 9am–5pm EST
                  <br />
                  Charlotte, North Carolina
                  <br />
                  <em style={{ color: "var(--muted)" }}>
                    Closed weekends &amp; major US holidays
                  </em>
                </p>
              </div>

              <p
                style={{
                  marginTop: 24,
                  fontSize: 13,
                  color: "var(--muted)",
                  lineHeight: 1.6,
                }}
              >
                For custom commissions, use the{" "}
                <Link
                  href="/custom"
                  style={{
                    color: "var(--ink)",
                    textDecoration: "underline",
                  }}
                >
                  dedicated brief form
                </Link>{" "}
                — it's faster than email.
              </p>
            </div>

            {/* Right: contact form */}
            <div
              className="reveal"
              style={{
                background: "var(--cream)",
                border: "1px solid var(--line)",
                borderRadius: "var(--r-lg)",
                padding: 40,
              }}
            >
              {sent ? (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div
                    className="display-italic"
                    style={{
                      fontSize: 80,
                      color: "var(--terracotta)",
                      lineHeight: 1,
                    }}
                  >
                    ✦
                  </div>
                  <h3
                    className="display"
                    style={{
                      fontSize: 36,
                      margin: "20px 0 12px",
                      fontWeight: 400,
                    }}
                  >
                    Message sent.
                  </h3>
                  <p
                    style={{
                      color: "var(--muted)",
                      maxWidth: 340,
                      margin: "0 auto",
                      fontSize: 15,
                      lineHeight: 1.6,
                    }}
                  >
                    We&rsquo;ll be back in touch within 24 hours, usually
                    same day.
                  </p>
                  <Link
                    href="/shop"
                    className="btn btn-primary"
                    style={{ marginTop: 32 }}
                  >
                    Browse the shop <ArrowIcon size={14} />
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3
                    className="serif"
                    style={{ fontSize: 22, margin: "0 0 24px" }}
                  >
                    Send a message
                  </h3>

                  {/* Reason */}
                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>What&rsquo;s this about?</label>
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        flexWrap: "wrap",
                      }}
                    >
                      {CONTACT_REASONS.map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setReason(r.id)}
                          style={{
                            padding: "8px 14px",
                            borderRadius: "var(--r-pill)",
                            border: `1px solid ${
                              reason === r.id ? "var(--ink)" : "var(--line)"
                            }`,
                            background:
                              reason === r.id ? "var(--ink)" : "transparent",
                            color:
                              reason === r.id ? "var(--cream)" : "var(--ink)",
                            fontSize: 13,
                            cursor: "pointer",
                            transition: "all .2s",
                          }}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                      marginBottom: 16,
                    }}
                  >
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
                      style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!name || !email || !message}
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      opacity: !name || !email || !message ? 0.45 : 1,
                    }}
                  >
                    Send message <ArrowIcon size={14} />
                  </button>

                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--muted)",
                      marginTop: 16,
                      textAlign: "center",
                    }}
                  >
                    We respond within 24 hours, usually same business day.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--ink)",
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  border: "1px solid var(--line)",
  borderRadius: "var(--r-sm)",
  background: "var(--cream)",
  color: "var(--ink)",
  fontSize: 15,
  fontFamily: "var(--font-body)",
  outline: "none",
  boxSizing: "border-box",
};
