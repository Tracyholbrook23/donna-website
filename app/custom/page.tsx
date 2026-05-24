"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";

const PROCESS_STEPS = [
  {
    n: "01",
    t: "Brief",
    d: "Use the form below or email. Include the gift, the recipient, the deadline, and any imagery you want incorporated.",
    time: "5 min · you",
  },
  {
    n: "02",
    t: "Quote",
    d: "Within 24 hours we send a quote, a recommended material, and a realistic timeline. 50% deposit reserves your studio slot.",
    time: "24 hrs · studio",
  },
  {
    n: "03",
    t: "Proof",
    d: "We sketch the engraving and send a digital proof. Two rounds of revisions included. We won't engrave until you sign off.",
    time: "48–72 hrs · together",
  },
  {
    n: "04",
    t: "Engrave",
    d: "We cut the piece, photograph it, ship it gift-ready in kraft and twine, with a hand-written card.",
    time: "1–3 wks · studio",
  },
];

const ORDER_TYPES = [
  {
    id: "corporate",
    label: "Corporate / Bulk gifting",
    desc: "10+ matching pieces, branded or monogrammed.",
  },
  {
    id: "wedding",
    label: "Wedding party set",
    desc: "Bridesmaids, groomsmen, parents, favors.",
  },
  {
    id: "family",
    label: "Family heirloom",
    desc: "One-off piece. Family tree, crest, custom artwork.",
  },
  {
    id: "logo",
    label: "Logo or brand engraving",
    desc: "Your business mark on tumblers, boards, leather.",
  },
  {
    id: "sketch",
    label: "From a sketch",
    desc: "You draw it, we engrave it. Kids' art, signatures, handwriting.",
  },
  {
    id: "other",
    label: "Something else",
    desc: "Describe it in the brief. We reply within 24 hours.",
  },
];

interface FormData {
  type: string;
  occasion: string;
  deadline: string;
  budget: string;
  description: string;
  name: string;
  email: string;
  phone: string;
  contact: string;
}

export default function CustomPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    type: "",
    occasion: "",
    deadline: "",
    budget: "",
    description: "",
    name: "",
    email: "",
    phone: "",
    contact: "email",
  });

  const update = (k: keyof FormData, v: string) =>
    setFormData((d) => ({ ...d, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/custom-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch {
      // ignore — show success anyway (email may still send)
    }
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <main className="page-enter">
      {/* Hero */}
      <section style={{ padding: "60px 0 40px" }}>
        <div className="container">
          <div className="layout-custom-split" style={{ alignItems: "end" }}>
            <div className="reveal">
              <p className="eyebrow" style={{ marginBottom: 16 }}>
                By commission
              </p>
              <h1
                className="display"
                style={{
                  fontSize: "clamp(56px, 8vw, 110px)",
                  margin: "0 0 24px",
                  fontWeight: 400,
                  lineHeight: 0.9,
                }}
              >
                Tell me what you&rsquo;re{" "}
                <em
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    color: "var(--terracotta)",
                  }}
                >
                  picturing.
                </em>
              </h1>
              <p
                style={{
                  fontSize: 18,
                  color: "var(--muted)",
                  lineHeight: 1.6,
                  maxWidth: 540,
                }}
              >
                Single pieces, family heirlooms, wedding sets, corporate
                gifts, or something only you can describe. Briefs go straight
                to me. Quotes within 24 hours.
              </p>
            </div>

            <div className="reveal" style={{ position: "relative" }}>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4/5",
                  borderRadius: "var(--r-xl)",
                  overflow: "hidden",
                  background: "var(--cream-2)",
                }}
              >
                <Image
                  src="/photos/cutting-boards-family.jpg"
                  alt="Custom commission — engraved family tree board"
                  width={700}
                  height={875}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 16,
                  left: 16,
                  background: "var(--cream)",
                  padding: "12px 18px",
                  borderRadius: "var(--r-pill)",
                  boxShadow: "var(--shadow-md)",
                  fontSize: 13,
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "var(--forest)",
                    flexShrink: 0,
                  }}
                />
                Currently accepting commissions
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <div className="reveal" style={{ marginBottom: 56 }}>
            <p className="eyebrow" style={{ marginBottom: 12 }}>
              How it works
            </p>
            <h2
              className="display"
              style={{
                fontSize: "clamp(40px, 5vw, 64px)",
                margin: 0,
                fontWeight: 400,
              }}
            >
              From brief to delivery, in{" "}
              <em
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  color: "var(--terracotta)",
                }}
              >
                four steps.
              </em>
            </h2>
          </div>

          <div className="layout-custom-cards" style={{ gap: 24 }}>
            {PROCESS_STEPS.map((s) => (
              <div
                key={s.n}
                className="reveal"
                style={{
                  background: "var(--cream)",
                  padding: 28,
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r-md)",
                }}
              >
                <span
                  className="display-italic"
                  style={{
                    fontSize: 56,
                    color: "var(--terracotta)",
                    lineHeight: 1,
                    display: "block",
                    marginBottom: 16,
                  }}
                >
                  {s.n}
                </span>
                <h3
                  className="serif"
                  style={{ fontSize: 22, margin: "0 0 8px" }}
                >
                  {s.t}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--muted)",
                    lineHeight: 1.6,
                    margin: "0 0 16px",
                  }}
                >
                  {s.d}
                </p>
                <p
                  style={{
                    fontSize: 11,
                    color: "var(--muted-soft)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    margin: 0,
                  }}
                >
                  {s.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry form */}
      <section style={{ padding: "80px 0 120px" }}>
        <div className="container">
          <div className="layout-custom-form" style={{ gap: 80 }}>
            {/* Left: sidebar copy */}
            <div className="reveal" style={{ position: "sticky", top: 100 }}>
              <p className="eyebrow" style={{ marginBottom: 12 }}>
                Send a brief
              </p>
              <h2
                className="display"
                style={{
                  fontSize: "clamp(36px, 4.5vw, 56px)",
                  margin: "0 0 24px",
                  fontWeight: 400,
                }}
              >
                Walk me through your idea.
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: "var(--muted)",
                  lineHeight: 1.6,
                  marginBottom: 40,
                }}
              >
                Don&rsquo;t overthink it. Even a rough idea is enough —
                I&rsquo;ll come back with options.
              </p>

              <div
                style={{ paddingTop: 32, borderTop: "1px solid var(--line)" }}
              >
                <p
                  className="eyebrow"
                  style={{ marginBottom: 14 }}
                >
                  Or reach me directly
                </p>
                <a
                  href="mailto:custom@outofjersey.com"
                  style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    fontStyle: "italic",
                    color: "var(--ink)",
                    textDecoration: "none",
                    marginBottom: 8,
                  }}
                >
                  custom@outofjersey.com
                </a>
                <a
                  href="#"
                  style={{
                    display: "block",
                    fontSize: 13,
                    color: "var(--muted)",
                    textDecoration: "none",
                    marginBottom: 4,
                  }}
                >
                  DM @outofjersey.engraving on Instagram
                </a>
                <a
                  href="#"
                  style={{
                    display: "block",
                    fontSize: 13,
                    color: "var(--muted)",
                    textDecoration: "none",
                  }}
                >
                  WhatsApp · +1 (704) 555-0177
                </a>
              </div>
            </div>

            {/* Right: form */}
            <div
              className="reveal"
              style={{
                background: "var(--cream)",
                border: "1px solid var(--line)",
                borderRadius: "var(--r-lg)",
                padding: 40,
              }}
            >
              {submitted ? (
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
                    style={{ fontSize: 36, margin: "20px 0 12px", fontWeight: 400 }}
                  >
                    Brief received.
                  </h3>
                  <p
                    style={{
                      color: "var(--muted)",
                      maxWidth: 360,
                      margin: "0 auto",
                      fontSize: 15,
                      lineHeight: 1.6,
                    }}
                  >
                    You&rsquo;ll hear from me within 24 hours — usually
                    faster. In the meantime, here&rsquo;s some reading on how
                    commissions work.
                  </p>
                  <Link
                    href="/policies/custom"
                    className="btn btn-primary"
                    style={{ marginTop: 32 }}
                  >
                    Custom order policy <ArrowIcon size={13} />
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Step progress bar */}
                  <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        style={{
                          flex: 1,
                          height: 4,
                          borderRadius: 2,
                          background: s <= step ? "var(--ink)" : "var(--cream-3)",
                          transition: "background .3s",
                        }}
                      />
                    ))}
                  </div>

                  {/* Step 1: Type */}
                  {step === 1 && (
                    <div>
                      <h3
                        className="serif"
                        style={{ fontSize: 22, margin: "0 0 6px" }}
                      >
                        What are you commissioning?
                      </h3>
                      <p
                        style={{
                          fontSize: 14,
                          color: "var(--muted)",
                          marginBottom: 24,
                        }}
                      >
                        Step 1 of 3
                      </p>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 12,
                          marginBottom: 28,
                        }}
                      >
                        {ORDER_TYPES.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => update("type", t.id)}
                            style={{
                              textAlign: "left",
                              padding: 16,
                              borderRadius: "var(--r-md)",
                              border: `1.5px solid ${
                                formData.type === t.id
                                  ? "var(--ink)"
                                  : "var(--line)"
                              }`,
                              background:
                                formData.type === t.id
                                  ? "var(--cream-2)"
                                  : "transparent",
                              cursor: "pointer",
                              transition: "all .2s",
                            }}
                          >
                            <p
                              style={{
                                fontSize: 14,
                                fontWeight: 600,
                                margin: "0 0 4px",
                                color: "var(--ink)",
                              }}
                            >
                              {t.label}
                            </p>
                            <p
                              style={{
                                fontSize: 12,
                                color: "var(--muted)",
                                margin: 0,
                                lineHeight: 1.4,
                              }}
                            >
                              {t.desc}
                            </p>
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={!formData.type}
                        className="btn btn-primary"
                        style={{
                          width: "100%",
                          justifyContent: "center",
                          opacity: formData.type ? 1 : 0.4,
                        }}
                      >
                        Continue <ArrowIcon size={14} />
                      </button>
                    </div>
                  )}

                  {/* Step 2: Details */}
                  {step === 2 && (
                    <div>
                      <h3
                        className="serif"
                        style={{ fontSize: 22, margin: "0 0 6px" }}
                      >
                        Tell me about the project.
                      </h3>
                      <p
                        style={{
                          fontSize: 14,
                          color: "var(--muted)",
                          marginBottom: 24,
                        }}
                      >
                        Step 2 of 3
                      </p>

                      <FieldGroup label="Occasion / recipient">
                        <input
                          type="text"
                          value={formData.occasion}
                          onChange={(e) => update("occasion", e.target.value)}
                          placeholder="e.g. Mom's 60th birthday, company retreat gift"
                          className="form-input"
                          style={inputStyle}
                        />
                      </FieldGroup>

                      <FieldGroup label="Ideal deadline">
                        <input
                          type="date"
                          value={formData.deadline}
                          onChange={(e) => update("deadline", e.target.value)}
                          style={inputStyle}
                        />
                      </FieldGroup>

                      <FieldGroup label="Budget range">
                        <select
                          value={formData.budget}
                          onChange={(e) => update("budget", e.target.value)}
                          style={inputStyle}
                        >
                          <option value="">Select a range</option>
                          <option value="under-100">Under $100</option>
                          <option value="100-300">$100–$300</option>
                          <option value="300-600">$300–$600</option>
                          <option value="600-1500">$600–$1,500</option>
                          <option value="1500+">$1,500+</option>
                          <option value="flexible">Flexible / open</option>
                        </select>
                      </FieldGroup>

                      <FieldGroup label="Describe what you're envisioning">
                        <textarea
                          value={formData.description}
                          onChange={(e) =>
                            update("description", e.target.value)
                          }
                          placeholder="The more detail the better — recipient, message, imagery, materials, feel…"
                          rows={5}
                          style={{
                            ...inputStyle,
                            resize: "vertical",
                            minHeight: 120,
                          }}
                        />
                      </FieldGroup>

                      <div
                        style={{ display: "flex", gap: 12, marginTop: 8 }}
                      >
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          style={{
                            padding: "14px 20px",
                            border: "1px solid var(--line)",
                            borderRadius: "var(--r-pill)",
                            background: "transparent",
                            cursor: "pointer",
                            fontSize: 14,
                            color: "var(--ink)",
                          }}
                        >
                          ←
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          disabled={!formData.description}
                          className="btn btn-primary"
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            opacity: formData.description ? 1 : 0.4,
                          }}
                        >
                          Continue <ArrowIcon size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Contact */}
                  {step === 3 && (
                    <div>
                      <h3
                        className="serif"
                        style={{ fontSize: 22, margin: "0 0 6px" }}
                      >
                        How should I reach you?
                      </h3>
                      <p
                        style={{
                          fontSize: 14,
                          color: "var(--muted)",
                          marginBottom: 24,
                        }}
                      >
                        Step 3 of 3 · Last step
                      </p>

                      <FieldGroup label="Your name" required>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => update("name", e.target.value)}
                          placeholder="First and last name"
                          required
                          style={inputStyle}
                        />
                      </FieldGroup>

                      <FieldGroup label="Email address" required>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="your@email.com"
                          required
                          style={inputStyle}
                        />
                      </FieldGroup>

                      <FieldGroup label="Phone (optional)">
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          placeholder="+1 (704) 555-0000"
                          style={inputStyle}
                        />
                      </FieldGroup>

                      <FieldGroup label="Preferred contact method">
                        <div style={{ display: "flex", gap: 12 }}>
                          {["email", "phone", "either"].map((c) => (
                            <label
                              key={c}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                fontSize: 14,
                                cursor: "pointer",
                                textTransform: "capitalize",
                              }}
                            >
                              <input
                                type="radio"
                                name="contact"
                                value={c}
                                checked={formData.contact === c}
                                onChange={() => update("contact", c)}
                                style={{ accentColor: "var(--terracotta)" }}
                              />
                              {c}
                            </label>
                          ))}
                        </div>
                      </FieldGroup>

                      <p
                        style={{
                          fontSize: 12,
                          color: "var(--muted)",
                          marginBottom: 20,
                          lineHeight: 1.6,
                        }}
                      >
                        Your information is only used to respond to your
                        inquiry. No spam, ever.
                      </p>

                      <div style={{ display: "flex", gap: 12 }}>
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          style={{
                            padding: "14px 20px",
                            border: "1px solid var(--line)",
                            borderRadius: "var(--r-pill)",
                            background: "transparent",
                            cursor: "pointer",
                            fontSize: 14,
                            color: "var(--ink)",
                          }}
                        >
                          ←
                        </button>
                        <button
                          type="submit"
                          disabled={
                            submitting || !formData.name || !formData.email
                          }
                          className="btn btn-primary"
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            opacity:
                              submitting ||
                              !formData.name ||
                              !formData.email
                                ? 0.5
                                : 1,
                          }}
                        >
                          {submitting ? "Sending…" : "Send brief →"}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function FieldGroup({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label
        style={{
          display: "block",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--ink)",
          marginBottom: 8,
        }}
      >
        {label}
        {required && (
          <span style={{ color: "var(--terracotta)", marginLeft: 4 }}>*</span>
        )}
      </label>
      {children}
    </div>
  );
}

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
