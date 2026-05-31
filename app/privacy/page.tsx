import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Out of Jersey Creations",
  description:
    "How Out of Jersey Creations collects, uses, and protects your personal information.",
};

const sections = [
  {
    h: "Who We Are",
    p: "Out of Jersey Creations is a small custom engraving business owned and operated by Donna Wilson in California. This policy explains how we handle the personal information you share with us when you use this website or place a custom order.",
  },
  {
    h: "Information We Collect",
    p: "When you submit a custom order inquiry or contact form, we collect your name, email address, phone number, and the details of your request. If you upload images or files for your engraving design, those are collected as well. We only collect what we need to respond to you and complete your order.",
  },
  {
    h: "How We Use Your Information",
    p: "Your information is used to respond to your inquiry, prepare a quote, communicate about your order, and complete production and fulfillment. We may follow up after your order is complete to make sure you're happy with it. We do not use your information for any unrelated marketing without your permission.",
  },
  {
    h: "We Never Sell Your Data",
    p: "Your personal information is never sold, rented, or traded to any third party. Full stop. We're a small business — we're not in the data business.",
  },
  {
    h: "Third-Party Services",
    p: "This website is built on Next.js and hosted on Vercel. The product catalog is powered by Wix (wix.com). Contact form emails are routed through a transactional email service. These services may process your data as part of delivering their services and have their own privacy policies. If payment processing is introduced in the future, it will be handled by a PCI-compliant payment processor and we will never store your card details ourselves.",
  },
  {
    h: "Cookies & Analytics",
    p: "This website may use basic, privacy-respecting analytics to understand how visitors use the site (e.g., which pages are visited, general location by country). No personally identifiable information is used in analytics. We do not use advertising cookies or tracking pixels. If you have a browser privacy extension, it will work fine here.",
  },
  {
    h: "Uploaded Images & Files",
    p: "Photos, logos, or design files you upload for custom orders are used only to produce your order. They are not shared publicly or used for any other purpose. We may retain a low-resolution version for internal reference unless you request deletion.",
  },
  {
    h: "Data Retention",
    p: "We keep order-related information for as long as reasonably necessary for business records and to handle any follow-up questions. If you'd like us to delete your information, just ask — see the contact section below.",
  },
  {
    h: "Your Rights",
    p: "You can request to see, update, or delete the personal information we hold about you at any time. Just email us and we'll respond promptly. California residents have additional rights under the CCPA and may submit requests using the same contact information.",
  },
  {
    h: "Children's Privacy",
    p: "This website is not directed at children under 13. We do not knowingly collect personal information from children. If you believe a child has submitted information to us, please contact us and we will remove it.",
  },
  {
    h: "Contact Us",
    p: "Questions about this policy or your data? Contact Donna Wilson directly — Out of Jersey Creations · outofjerseycreations@icloud.com · (657) 633-6994",
  },
  {
    h: "Updates to This Policy",
    p: "We may update this policy from time to time. The date at the bottom of this page will always reflect the current version. Material changes will be noted here.",
  },
];

export default function PrivacyPage() {
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
            Privacy{" "}
            <em
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                color: "var(--terracotta)",
              }}
            >
              Policy
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
            Your information is used to make your order happen — nothing more.
            Here's exactly how we handle it.
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
                    t.href === "/privacy" ? "var(--ink)" : "var(--muted)",
                  textDecoration: "none",
                  borderBottom: `2px solid ${
                    t.href === "/privacy" ? "var(--ink)" : "transparent"
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
                Privacy Policy
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
                    href={`#${s.h.toLowerCase().replace(/\s+/g, "-").replace(/[&']/g, "")}`}
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
                  id={s.h.toLowerCase().replace(/\s+/g, "-").replace(/[&']/g, "")}
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
                Privacy questions?
              </p>
              <p
                style={{
                  fontSize: 18,
                  fontFamily: "var(--font-display)",
                  margin: 0,
                  color: "var(--ink)",
                }}
              >
                Email us directly — we'll reply personally.
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
