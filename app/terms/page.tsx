import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Out of Jersey Creations",
  description:
    "Terms and conditions for using the Out of Jersey Creations website and placing custom orders.",
};

const sections = [
  {
    h: "Acceptance of Terms",
    p: "By visiting this website or submitting a custom order inquiry, you agree to these terms. If you don't agree, please don't use the site. We may update these terms occasionally — the date at the bottom of this page reflects the most recent version.",
  },
  {
    h: "Website Use",
    p: "This website is for personal, non-commercial use. You may browse, share links, and submit order inquiries. Please don't scrape, copy, or reproduce the site's content, photos, or designs without written permission.",
  },
  {
    h: "Custom Order Process",
    p: "All orders begin with a custom inquiry. We'll reply within 24 hours with a quote and estimated timeline. A 50% deposit is required to reserve your spot in the production queue. The remaining balance is due before your order ships. Quotes are valid for 14 days.",
  },
  {
    h: "Customer-Submitted Designs & Artwork",
    p: "When you submit artwork, logos, photos, or text for engraving, you confirm that you own the rights to that material or have permission to use it. Out of Jersey Creations is not responsible for copyright infringement arising from designs you provide. We reserve the right to decline any artwork we believe may be infringing or inappropriate.",
  },
  {
    h: "Intellectual Property",
    p: "All original designs, product photos, website copy, and branding created by Out of Jersey Creations remain our property. Designs we create for your custom order belong to you once the order is complete and paid in full. We may retain a low-resolution photo for portfolio purposes unless you request otherwise.",
  },
  {
    h: "Product Customization Disclaimer",
    p: "Custom and personalized products are made specifically for you. We send a digital proof before engraving begins — please review it carefully. Once you approve a proof, we are not responsible for errors in the text or layout that were present in the approved design.",
  },
  {
    h: "Color & Material Variation",
    p: "Laser engraving results vary depending on the material, finish, and color of the product. Screen colors may not exactly match the finished piece. Natural materials like wood and bamboo have inherent grain variations. These are features of handcrafted work, not defects.",
  },
  {
    h: "Production Timelines",
    p: "Estimated production times are provided in good faith based on current studio capacity. Timelines may shift due to supply delays, high volume periods, or circumstances outside our control. We'll always communicate changes proactively. Rush availability must be confirmed before placing your order.",
  },
  {
    h: "Shipping Disclaimer",
    p: "Once an order is handed off to the carrier, delivery is outside our control. We provide tracking for every shipment. Delays caused by carriers, weather, or customs are not grounds for a refund. If your order is damaged in transit, contact us within 48 hours with photos and we'll make it right.",
  },
  {
    h: "Limitation of Liability",
    p: "Out of Jersey Creations' liability for any claim related to your order is limited to the amount you paid for that order. We are not liable for indirect, incidental, or consequential damages. Some states do not allow these limitations, so they may not apply to you.",
  },
  {
    h: "Right to Refuse Service",
    p: "We reserve the right to decline any order at our discretion — including requests involving offensive, infringing, or inappropriate content. If we decline an order after a deposit has been made, we will issue a full refund of that deposit.",
  },
  {
    h: "Accuracy of Information",
    p: "We make every effort to ensure product descriptions, pricing, and availability are accurate. In the rare event of an error, we'll contact you before proceeding with the order. Pricing on the website is subject to change without notice.",
  },
  {
    h: "Contact Us",
    p: "Questions about these terms? Reach out anytime — Donna Wilson, Out of Jersey Creations · outofjerseycreations@icloud.com · (657) 633-6994",
  },
];

export default function TermsPage() {
  return (
    <main className="page-enter">
      {/* Header */}
      <section style={{ padding: "80px 0 0" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <p className="eyebrow" style={{ marginBottom: 12 }}>
            Legal
          </p>
          <h1
            className="display"
            style={{
              fontSize: "clamp(48px, 6vw, 80px)",
              margin: "0 0 16px",
              fontWeight: 400,
            }}
          >
            Terms &amp;{" "}
            <em
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                color: "var(--terracotta)",
              }}
            >
              Conditions
            </em>
          </h1>
          <p
            style={{
              fontSize: 17,
              color: "var(--muted)",
              lineHeight: 1.6,
              maxWidth: 540,
            }}
          >
            Plain language. No surprises. Here's what you agree to when you use
            this site or place an order with us.
          </p>

          {/* Legal nav strip */}
          <div
            style={{
              display: "flex",
              gap: 8,
              marginTop: 40,
              borderBottom: "1px solid var(--line)",
              overflowX: "auto",
              scrollbarWidth: "none",
            }}
          >
            {[
              { label: "Terms & Conditions", href: "/terms" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Shipping", href: "/policies/shipping" },
              { label: "Returns", href: "/policies/returns" },
              { label: "Custom Order Policy", href: "/policies/custom" },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                style={{
                  padding: "12px 20px",
                  fontSize: 14,
                  fontWeight: 500,
                  color:
                    t.href === "/terms" ? "var(--ink)" : "var(--muted)",
                  textDecoration: "none",
                  borderBottom: `2px solid ${
                    t.href === "/terms" ? "var(--ink)" : "transparent"
                  }`,
                  whiteSpace: "nowrap",
                  transition: "color .2s, border-color .2s",
                  marginBottom: -1,
                }}
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "60px 0 120px" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="layout-policy">
            {/* Sidebar */}
            <div style={{ position: "sticky", top: 100, alignSelf: "start" }}>
              <h2
                className="display"
                style={{ fontSize: 36, margin: "0 0 12px", fontWeight: 400 }}
              >
                Terms &amp; Conditions
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "var(--muted)",
                  lineHeight: 1.6,
                  margin: "0 0 32px",
                }}
              >
                Last updated: June 2025
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                {sections.map((s) => (
                  <a
                    key={s.h}
                    href={`#${s.h.toLowerCase().replace(/\s+/g, "-").replace(/[&]/g, "and")}`}
                    style={{
                      fontSize: 13,
                      color: "var(--muted)",
                      textDecoration: "none",
                      padding: "4px 0",
                    }}
                  >
                    {s.h}
                  </a>
                ))}
              </div>
            </div>

            {/* Sections */}
            <div>
              {sections.map((s, i) => (
                <div
                  key={s.h}
                  id={s.h.toLowerCase().replace(/\s+/g, "-").replace(/[&]/g, "and")}
                  style={{
                    paddingTop: i === 0 ? 0 : 48,
                    paddingBottom: 48,
                    borderBottom:
                      i < sections.length - 1
                        ? "1px solid var(--line-soft)"
                        : "none",
                  }}
                >
                  <h3
                    className="serif"
                    style={{
                      fontSize: 22,
                      margin: "0 0 16px",
                      color: "var(--ink)",
                    }}
                  >
                    {s.h}
                  </h3>
                  <p
                    style={{
                      fontSize: 16,
                      color: "var(--ink-soft)",
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    {s.p}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Help CTA strip */}
      <section style={{ background: "var(--cream-2)", padding: "60px 0" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div>
              <p className="eyebrow" style={{ marginBottom: 8 }}>
                Questions?
              </p>
              <p
                style={{
                  fontSize: 18,
                  fontFamily: "var(--font-display)",
                  margin: 0,
                  color: "var(--ink)",
                }}
              >
                We read every message personally.
              </p>
            </div>
            <Link href="/contact" className="btn btn-primary">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
