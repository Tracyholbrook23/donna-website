import Link from "next/link";
import Image from "next/image";
import { collections } from "@/lib/data";
import { NewsletterForm } from "@/components/NewsletterForm";

export function Footer() {
  // Sort collections by catalog order and group into two footer columns for readability
  const shopCol1 = [...collections]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 8)
    .map((c) => ({ label: c.name, href: `/shop?collection=${c.id}` }));
  const shopCol2 = [...collections]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(8)
    .map((c) => ({ label: c.name, href: `/shop?collection=${c.id}` }));

  const cols = [
    {
      title: "Drinkware & Kitchen",
      items: shopCol1,
    },
    {
      title: "Gifts & More",
      items: shopCol2,
    },
    {
      title: "Studio",
      items: [
        { label: "About Us", href: "/about" },
        { label: "Custom Orders", href: "/custom" },
        { label: "Corporate & Bulk", href: "/custom" },
        { label: "Contact", href: "/contact" },
        { label: "Press & Stockists", href: "/about" },
      ],
    },
    {
      title: "Help",
      items: [
        { label: "Shipping", href: "/policies/shipping" },
        { label: "Returns", href: "/policies/returns" },
        { label: "Custom Order Policy", href: "/policies/custom" },
        { label: "FAQ", href: "/policies/faq" },
        { label: "Account", href: "/account" },
      ],
    },
  ];

  return (
    <footer
      style={{
        background: "var(--ink)",
        color: "var(--cream)",
        padding: "80px 0 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Large ghost logo mark in bg */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          bottom: -60,
          transform: "translateX(-50%)",
          width: "clamp(400px, 55vw, 700px)",
          opacity: 0.04,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <Image
          src="/logo.png"
          alt=""
          width={700}
          height={700}
          style={{ objectFit: "contain", width: "100%", height: "auto" }}
        />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Newsletter */}
        <div className="layout-footer-top">
          <div>
            <p
              className="eyebrow"
              style={{ color: "var(--brass-light)", marginBottom: 16 }}
            >
              From the studio
            </p>
            <h3
              className="display"
              style={{
                fontSize: "clamp(36px, 4vw, 56px)",
                margin: 0,
                maxWidth: 480,
              }}
            >
              New drops,{" "}
              <em
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                }}
              >
                behind the scenes,
              </em>{" "}
              early access.
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                maxWidth: 420,
                marginTop: 16,
                fontSize: 14,
              }}
            >
              New pieces, holiday lead times, and early-access drops straight
              from the engraving table. No spam, ever.
            </p>
          </div>

          <NewsletterForm />
        </div>

        {/* Link columns */}
        <div className="layout-footer-links">
          <div>
            <FooterWordmark />
            <p
              style={{
                color: "rgba(255,255,255,0.55)",
                maxWidth: 300,
                marginTop: 20,
                fontSize: 14,
                lineHeight: 1.7,
              }}
            >
              Custom laser engraving — woman owned &amp; operated. Tumblers,
              boards, knives, wallets, and one-of-a-kind commissions made with
              precision and care.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              {[
                { label: "IG", href: "https://www.instagram.com/outofjerseycreations" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255,255,255,0.08)",
                    color: "var(--cream)",
                    fontSize: 11,
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <p
                className="eyebrow"
                style={{ color: "rgba(255,255,255,0.5)", marginBottom: 18 }}
              >
                {col.title}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {col.items.map((it) => (
                  <li key={it.label}>
                    <Link
                      href={it.href}
                      style={{
                        color: "rgba(255,255,255,0.75)",
                        textDecoration: "none",
                        fontSize: 14,
                      }}
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            fontSize: 12,
            color: "rgba(255,255,255,0.45)",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <span>&copy; {new Date().getFullYear()} Out of Jersey Custom Laser Engraving &middot; Woman Owned &amp; Operated.</span>
            <span>Site by Tracy</span>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            <Link
              href="/policies/shipping"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Privacy
            </Link>
            <Link
              href="/policies/returns"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Terms
            </Link>
            <Link
              href="/policies"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterWordmark() {
  return (
    <Link
      href="/"
      style={{
        textDecoration: "none",
        display: "inline-block",
      }}
      aria-label="Out of Jersey — Home"
    >
      {/* On the dark footer the logo renders perfectly as-is */}
      <Image
        src="/logo.png"
        alt="Out of Jersey Custom Laser Engraving"
        width={180}
        height={90}
        style={{ objectFit: "contain", display: "block" }}
      />
    </Link>
  );
}
