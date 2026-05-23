import Link from "next/link";
import { collections } from "@/lib/data";
import { NewsletterForm } from "@/components/NewsletterForm";

export function Footer() {
  const cols = [
    {
      title: "Shop",
      items: collections.map((c) => ({
        label: c.name,
        href: `/shop?collection=${c.id}`,
      })),
    },
    {
      title: "Studio",
      items: [
        { label: "About Donna", href: "/about" },
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
      {/* Large italic wordmark in bg */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          bottom: -80,
          transform: "translateX(-50%)",
          fontSize: "clamp(280px, 38vw, 540px)",
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          color: "rgba(255,255,255,0.04)",
          lineHeight: 0.85,
          letterSpacing: "-0.03em",
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        Donna
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Newsletter */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 60,
            paddingBottom: 60,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
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
              Letters from{" "}
              <em
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                }}
              >
                my hands
              </em>{" "}
              to yours.
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                maxWidth: 420,
                marginTop: 16,
                fontSize: 14,
              }}
            >
              New pieces, behind-the-scenes from the studio, holiday lead times,
              and the occasional early-access drop. No spam, I promise.
            </p>
          </div>

          <NewsletterForm />
        </div>

        {/* Link columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 40,
            padding: "60px 0 40px",
          }}
        >
          <div>
            <FooterWordmark />
            <p
              style={{
                color: "rgba(255,255,255,0.55)",
                maxWidth: 320,
                marginTop: 20,
                fontSize: 14,
                lineHeight: 1.7,
              }}
            >
              Engraved goods and personalized commissions, made by hand in
              Charlotte, NC. A small Black-owned studio building heirlooms one
              piece at a time.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              {[
                { label: "IG", href: "#" },
                { label: "TT", href: "#" },
                { label: "PT", href: "#" },
                { label: "FB", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
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
          <div>
            &copy; {new Date().getFullYear()} Donna &amp; Co. &middot;
            Black-owned, hand-engraved.
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
        color: "var(--cream)",
        display: "inline-flex",
        alignItems: "baseline",
        gap: 10,
      }}
    >
      <span
        className="display-italic"
        style={{ fontSize: 36, lineHeight: 0.9, letterSpacing: "-0.02em" }}
      >
        Donna
      </span>
      <span
        style={{
          fontSize: 9,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          opacity: 0.55,
          fontWeight: 600,
          position: "relative",
          top: -4,
        }}
      >
        &amp; co.
      </span>
    </Link>
  );
}

