import Image from "next/image";
import Link from "next/link";
import CustomInquiryForm from "@/components/CustomInquiryForm";

// ── Process steps data ────────────────────────────────────────────────────────

const PROCESS_STEPS = [
  {
    n: "01",
    t: "Share your vision",
    d: "Use the form below, DM on Instagram, or email directly. A rough idea is all you need — Donna will help shape the rest.",
    time: "5 min · you",
  },
  {
    n: "02",
    t: "Receive your quote",
    d: "Within 24 hours, Donna sends a personalized quote, material recommendation, and realistic timeline. No obligation.",
    time: "24 hrs · Donna",
  },
  {
    n: "03",
    t: "$20 design fee",
    d: "A $20 non-refundable initiation fee reserves your studio slot and covers the initial design work. Credited toward your final total.",
    time: "Reserves your slot",
    highlight: true,
  },
  {
    n: "04",
    t: "Approve your proof",
    d: "Donna sends a digital proof of your design. Two rounds of revisions included. Nothing is engraved until you sign off.",
    time: "48–72 hrs · together",
  },
  {
    n: "05",
    t: "Made & shipped",
    d: "Your piece is laser-engraved, photographed, and shipped gift-ready in kraft and twine with a hand-written card.",
    time: "1–3 wks · Donna",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CustomPage() {
  return (
    <main className="page-enter">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: "60px 0 40px" }}>
        <div className="container">
          <div className="layout-custom-split" style={{ alignItems: "end" }}>

            <div className="reveal">
              <p className="eyebrow" style={{ marginBottom: 16 }}>By commission</p>
              <h1
                className="display"
                style={{ fontSize: "clamp(52px, 8vw, 104px)", margin: "0 0 24px", fontWeight: 400, lineHeight: 0.9 }}
              >
                Tell me what you&rsquo;re{" "}
                <em style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--terracotta)" }}>
                  picturing.
                </em>
              </h1>
              <p style={{ fontSize: 18, color: "var(--muted)", lineHeight: 1.6, maxWidth: 520 }}>
                Single pieces, family heirlooms, wedding sets, or bulk corporate gifts. Every order
                starts with a conversation — no shopping carts, no templates. Quotes within 24 hours.
              </p>
            </div>

            <div className="reveal" style={{ position: "relative" }}>
              <div style={{
                width: "100%",
                aspectRatio: "4/5",
                borderRadius: "var(--r-xl)",
                overflow: "hidden",
                background: "var(--cream-2)",
              }}>
                <Image
                  src="/photos/cutting-boards-family.jpg"
                  alt="Custom commission — engraved family tree board"
                  width={700}
                  height={875}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              {/* Status badge */}
              <div style={{
                position: "absolute", bottom: 16, left: 16,
                background: "var(--cream)",
                padding: "12px 18px",
                borderRadius: "var(--r-pill)",
                boxShadow: "var(--shadow-md)",
                fontSize: 13,
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <span style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: "var(--forest)", flexShrink: 0,
                }} />
                Currently accepting commissions
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">

          <div className="reveal" style={{ marginBottom: 56 }}>
            <p className="eyebrow" style={{ marginBottom: 12 }}>How it works</p>
            <h2
              className="display"
              style={{ fontSize: "clamp(36px, 5vw, 60px)", margin: 0, fontWeight: 400 }}
            >
              Brief to delivery,{" "}
              <em style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--terracotta)" }}>
                five steps.
              </em>
            </h2>
          </div>

          <div className="layout-custom-cards" style={{ gap: 14 }}>
            {PROCESS_STEPS.map((s) => (
              <div
                key={s.n}
                className="reveal"
                style={{
                  background: s.highlight ? "var(--terracotta)" : "var(--cream)",
                  padding: "28px 24px",
                  border: s.highlight ? "none" : "1px solid var(--line)",
                  borderRadius: "var(--r-md)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {s.highlight && (
                  <div aria-hidden style={{
                    position: "absolute", right: -16, top: -16,
                    fontSize: 72, opacity: 0.12,
                    fontFamily: "var(--font-display)", fontStyle: "italic",
                    color: "#fff", lineHeight: 1,
                    userSelect: "none", pointerEvents: "none",
                  }}>$20</div>
                )}
                <span className="display-italic" style={{
                  fontSize: 52, lineHeight: 1, display: "block", marginBottom: 14,
                  color: s.highlight ? "rgba(255,255,255,0.45)" : "var(--terracotta)",
                }}>
                  {s.n}
                </span>
                <h3 className="serif" style={{
                  fontSize: 20, margin: "0 0 8px",
                  color: s.highlight ? "#fff" : "var(--ink)",
                }}>
                  {s.t}
                </h3>
                <p style={{
                  fontSize: 13, lineHeight: 1.6, margin: "0 0 16px",
                  color: s.highlight ? "rgba(255,255,255,0.85)" : "var(--muted)",
                }}>
                  {s.d}
                </p>
                <p style={{
                  fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", margin: 0,
                  color: s.highlight ? "rgba(255,255,255,0.55)" : "var(--muted-soft)",
                }}>
                  {s.time}
                </p>
              </div>
            ))}
          </div>

          {/* $20 fee callout */}
          <div className="reveal" style={{
            marginTop: 28,
            background: "var(--cream-2)",
            border: "1px solid var(--line)",
            borderRadius: "var(--r-md)",
            padding: "20px 24px",
            display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap",
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: "50%",
              background: "var(--terracotta)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 16, flexShrink: 0, marginTop: 2,
            }}>✦</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 700, margin: "0 0 5px", color: "var(--ink)" }}>
                About the $20 non-refundable design fee
              </p>
              <p style={{ fontSize: 14, color: "var(--muted)", margin: 0, lineHeight: 1.65 }}>
                Before Donna begins custom work, a $20 initiation fee is collected. This covers time spent
                creating your initial design concept, digital proof, and reserving your studio slot. It&rsquo;s
                non-refundable because real work starts immediately — but it is{" "}
                <strong>credited toward your final order total</strong> when the piece is completed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Inquiry form ─────────────────────────────────────────────────── */}
      <section style={{ padding: "40px 0 120px", background: "var(--cream-2)" }}>
        <div className="container">
          <div className="layout-custom-form" style={{ gap: 72 }}>

            {/* Left: sticky sidebar copy */}
            <div className="reveal" style={{ position: "sticky", top: 100, alignSelf: "start" }}>
              <p className="eyebrow" style={{ marginBottom: 12 }}>Send a brief</p>
              <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 52px)", margin: "0 0 20px", fontWeight: 400 }}>
                Walk me through{" "}
                <em style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--terracotta)" }}>
                  your idea.
                </em>
              </h2>
              <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.65, marginBottom: 36 }}>
                Don&rsquo;t overthink it. Even a rough idea is enough — Donna will come back with options,
                questions, and a personalized quote within 24 hours.
              </p>

              {/* Trust signals */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 40 }}>
                {[
                  { icon: "⏱️", text: "Quote within 24 hours" },
                  { icon: "✏️", text: "2 rounds of revisions included" },
                  { icon: "📦", text: "Ships gift-ready with hand-written card" },
                  { icon: "🔒", text: "Nothing engraved until you approve" },
                ].map((t) => (
                  <div key={t.text} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ fontSize: 16, width: 24, textAlign: "center" }}>{t.icon}</span>
                    <span style={{ fontSize: 13, color: "var(--muted)" }}>{t.text}</span>
                  </div>
                ))}
              </div>

              <div style={{ paddingTop: 28, borderTop: "1px solid var(--line)" }}>
                <p className="eyebrow" style={{ marginBottom: 12 }}>Or reach me directly</p>
                <Link
                  href="https://www.instagram.com/outofjerseycreations"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontSize: 20,
                    fontStyle: "italic",
                    color: "var(--ink)",
                    textDecoration: "none",
                    marginBottom: 4,
                  }}
                >
                  @outofjerseycreations
                </Link>
                <p style={{ fontSize: 12, color: "var(--muted)", margin: 0 }}>
                  Instagram · DM or message anytime
                </p>
              </div>
            </div>

            {/* Right: the form */}
            <div className="reveal">
              <div style={{
                background: "var(--cream)",
                border: "1px solid var(--line)",
                borderRadius: "var(--r-lg)",
                padding: "40px 36px",
                boxShadow: "var(--shadow-md)",
              }}>
                <CustomInquiryForm />
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
