import Link from "next/link";

export const metadata = {
  title: "Payment Received — Out of Jersey Creations",
};

export default function PaySuccessPage() {
  return (
    <main className="page-enter">
      <section style={{ padding: "120px 0", minHeight: "60vh", display: "flex", alignItems: "center" }}>
        <div className="container" style={{ maxWidth: 640, textAlign: "center" }}>

          {/* Icon */}
          <div style={{
            width: 72, height: 72,
            borderRadius: "50%",
            background: "var(--blush)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 32px",
            fontSize: 32,
          }}>
            ✓
          </div>

          <p className="eyebrow" style={{ marginBottom: 16 }}>Payment received</p>

          <h1 className="display" style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 400,
            margin: "0 0 24px",
            lineHeight: 0.95,
          }}>
            You&rsquo;re all set,{" "}
            <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>thank you.</em>
          </h1>

          <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.7, marginBottom: 40 }}>
            Your payment was processed successfully. You&rsquo;ll receive a receipt by email shortly.
            Donna will be in touch within 24 hours to move your order forward. If you have any
            questions in the meantime,{" "}
            <Link href="/contact" style={{ color: "var(--terracotta)" }}>reach out any time</Link>.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/custom"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "var(--terracotta)", color: "#fff",
                borderRadius: "var(--r-pill)", padding: "13px 28px",
                fontSize: 15, fontWeight: 600, textDecoration: "none",
              }}
            >
              View custom order info
            </Link>
            <Link
              href="/"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "var(--cream-2)", color: "var(--ink)",
                border: "1.5px solid var(--line)",
                borderRadius: "var(--r-pill)", padding: "13px 28px",
                fontSize: 15, fontWeight: 600, textDecoration: "none",
              }}
            >
              Back to home
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}
