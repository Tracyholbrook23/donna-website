import Image from "next/image";
import Link from "next/link";
import { giftOccasions } from "@/lib/data";
import { ArrowIcon } from "@/components/Icons";
import { wixClient } from "@/lib/wixClient";
import { HomePhotoGrid } from "@/components/HomePhotoGrid";
import { HomeVideoShowcase } from "@/components/HomeVideoShowcase";
import { HomeBestsellersClient } from "@/components/home/HomeBestsellersClient";

export const dynamic = "force-dynamic";

async function getFeaturedProducts() {
  try {
    const { items } = await wixClient.products.queryProducts().limit(8).find();
    return items;
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const products = await getFeaturedProducts();

  return (
    <main className="page-enter">
      <HomeHero />
      <HomeVideoShowcase />
      <HomeMarqueeStrip />
      <HomeBestsellersClient initialProducts={products} />
      <HomePhotoGrid />
      <HomeTwoTiles />
      <HomeOccasions />
      <HomeCustomCTA />
    </main>
  );
}

/* ── HERO — full-bleed background image ─────────────────────── */
function HomeHero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "92vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background photo — tumbler (top seller) */}
      <Image
        src="/photos/prod-tumbler-40oz.jpg"
        alt="Custom engraved 40oz tumbler — Out of Jersey"
        fill
        style={{ objectFit: "cover", objectPosition: "center center" }}
        priority
        sizes="100vw"
      />

      {/* Dark gradient overlay for text legibility */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, rgba(10,6,4,0.78) 0%, rgba(10,6,4,0.55) 55%, rgba(10,6,4,0.2) 100%)",
        }}
      />

      {/* Terracotta accent strip on left edge */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 6,
          background: "var(--terracotta)",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2, padding: "80px 28px" }}>
        <div style={{ maxWidth: 740 }}>
          <p
            className="eyebrow reveal"
            style={{
              marginBottom: 24,
              color: "var(--terracotta)",
              letterSpacing: "0.18em",
            }}
          >
            Woman Owned &amp; Operated · New Jersey
          </p>

          <h1
            className="display reveal reveal-delay-1"
            data-parallax="-0.04"
            style={{
              fontSize: "clamp(60px, 9vw, 130px)",
              margin: "0 0 16px",
              fontWeight: 400,
              lineHeight: 0.9,
              color: "var(--cream)",
            }}
          >
            Gifts that
            <br />
            <em
              style={{
                fontStyle: "italic",
                color: "var(--terracotta)",
              }}
            >
              mean&nbsp;
            </em>
            <span style={{ color: "#fff" }}>something.</span>
          </h1>

          <p
            className="reveal reveal-delay-2"
            style={{
              fontSize: 18,
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.8)",
              maxWidth: 480,
              margin: "28px 0 40px",
            }}
          >
            Custom laser engraving on tumblers, boards, knives, wallets &amp; more.
            Every piece, made personal — right here in New Jersey.
          </p>

          <div
            className="reveal reveal-delay-3"
            style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}
          >
            <Link
              href="/shop"
              className="btn btn-primary"
              data-magnetic="60"
              style={{ fontSize: 15, padding: "16px 32px" }}
            >
              Shop the collection <ArrowIcon />
            </Link>
            <Link
              href="/custom"
              className="btn"
              data-magnetic="60"
              style={{
                background: "transparent",
                border: "1.5px solid rgba(255,255,255,0.5)",
                color: "#fff",
                fontSize: 15,
                padding: "16px 32px",
              }}
            >
              Start a custom piece
            </Link>
          </div>

          {/* Stats row */}
          <div
            className="reveal reveal-delay-4"
            style={{
              display: "flex",
              gap: 40,
              marginTop: 60,
              paddingTop: 28,
              borderTop: "1px solid rgba(255,255,255,0.15)",
              flexWrap: "wrap",
            }}
          >
            {[
              { value: "1,840+", label: "5-star reviews" },
              { value: "14,200+", label: "Pieces engraved" },
              { value: "Woman Owned", label: "& operated" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="serif"
                  style={{ fontSize: 24, lineHeight: 1, marginBottom: 4, fontWeight: 600, color: "#fff" }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.55)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── MARQUEE STRIP ──────────────────────────────────────── */
function HomeMarqueeStrip() {
  const items = [
    "Custom laser engraving — woman owned & operated",
    "Free US shipping over $125",
    "1,840+ five-star reviews",
    "Tumblers · Boards · Knives · Wallets · More",
    "24-hour custom-order replies",
    "Gift-ready packaging on every order",
  ];
  const repeated = [...items, ...items];

  return (
    <section
      style={{
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        padding: "18px 0",
        overflow: "hidden",
      }}
    >
      <div className="marquee-track" style={{ animationDuration: "46s" }}>
        {repeated.map((it, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 64,
              fontSize: 13,
              color: "var(--ink-soft)",
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
            }}
          >
            {it} <span style={{ color: "var(--brass)" }}>✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ── PHOTO GRID — all real product photography ───────────────── */

/* ── TWO TILES ──────────────────────────────────────────── */
function HomeTwoTiles() {
  return (
    <section style={{ padding: "60px 0 0", background: "var(--cream-2)" }}>
      <div className="container">
        <div className="layout-2col">
          <Link
            href="/custom"
            className="card-hover tile-card reveal-left hover-float"
            style={{
              position: "relative",
              borderRadius: "var(--r-lg)",
              overflow: "hidden",
              height: 480,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              textDecoration: "none",
              color: "var(--cream)",
            }}
          >
            <Image
              src="/photos/keychain-business.jpg"
              alt="Corporate and bulk engraving orders"
              fill
              className="object-cover card-media"
              sizes="50vw"
            />
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.72) 100%)",
              }}
            />
            <div style={{ position: "relative", zIndex: 1, padding: "32px 36px" }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  opacity: 0.7,
                  margin: "0 0 10px",
                }}
              >
                Bulk orders welcome
              </p>
              <h2
                className="display"
                style={{ fontSize: "clamp(28px,3vw,40px)", margin: "0 0 20px", fontWeight: 400 }}
              >
                Corporate Teams &amp; Gifting
              </h2>
              <p
                style={{
                  fontSize: 14,
                  opacity: 0.8,
                  margin: "0 0 24px",
                  lineHeight: 1.55,
                  maxWidth: 360,
                }}
              >
                Brand awareness, client gifts, employee recognition — at any quantity.
              </p>
              <span
                className="btn"
                style={{
                  background: "var(--cream)",
                  color: "var(--ink)",
                  fontSize: 13,
                  padding: "12px 22px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                START YOUR QUOTE <ArrowIcon size={13} />
              </span>
            </div>
          </Link>

          <Link
            href="/custom"
            className="card-hover tile-card reveal-right hover-float"
            style={{
              position: "relative",
              borderRadius: "var(--r-lg)",
              overflow: "hidden",
              height: 480,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              textDecoration: "none",
              color: "var(--cream)",
            }}
          >
            <Image
              src="/photos/prod-cutting-board-wedding.jpg"
              alt="Custom commission engraving orders"
              fill
              className="object-cover card-media"
              sizes="50vw"
            />
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.72) 100%)",
              }}
            />
            <div style={{ position: "relative", zIndex: 1, padding: "32px 36px" }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  opacity: 0.7,
                  margin: "0 0 10px",
                }}
              >
                One-of-a-kind pieces
              </p>
              <h2
                className="display"
                style={{ fontSize: "clamp(28px,3vw,40px)", margin: "0 0 20px", fontWeight: 400 }}
              >
                Custom Commissions
              </h2>
              <p
                style={{
                  fontSize: 14,
                  opacity: 0.8,
                  margin: "0 0 24px",
                  lineHeight: 1.55,
                  maxWidth: 360,
                }}
              >
                Wedding gifts, family heirlooms, personal artwork — send a brief, get a quote in 24
                hours.
              </p>
              <span
                className="btn"
                style={{
                  background: "var(--cream)",
                  color: "var(--ink)",
                  fontSize: 13,
                  padding: "12px 22px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                START YOUR QUOTE <ArrowIcon size={13} />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── OCCASIONS ──────────────────────────────────────────── */
function HomeOccasions() {
  return (
    <section style={{ padding: "100px 0 80px", background: "var(--cream-2)" }}>
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 48,
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div className="reveal-left">
            <p className="eyebrow">Gift by occasion</p>
            <h2
              className="display"
              style={{ fontSize: "clamp(36px,5vw,68px)", margin: "12px 0 0", fontWeight: 400 }}
            >
              Shop the{" "}
              <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>moment.</em>
            </h2>
          </div>
          <p
            className="reveal-right"
            style={{ fontSize: 15, color: "var(--muted)", maxWidth: 320, lineHeight: 1.6, margin: 0 }}
          >
            Engraved gifts are always for a reason. Find yours.
          </p>
        </div>

        <div className="occasions-grid">
          {giftOccasions.map((occ, i) => (
            <Link
              key={occ.id}
              href={occ.href}
              className="card-hover reveal-scale spring-press"
              style={{
                position: "relative",
                borderRadius: "var(--r-md)",
                overflow: "hidden",
                aspectRatio: "3/4",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                textDecoration: "none",
                color: "var(--cream)",
                transitionDelay: `${i * 0.06}s`,
              }}
            >
              <Image
                src={occ.src}
                alt={occ.label}
                fill
                className="object-cover card-media"
                sizes="20vw"
              />
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%)",
                  pointerEvents: "none",
                }}
              />
              <div style={{ position: "relative", zIndex: 1, padding: "14px 16px 18px" }}>
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    opacity: 0.7,
                    margin: "0 0 4px",
                    textTransform: "uppercase",
                  }}
                >
                  {occ.kicker}
                </p>
                <h3
                  className="serif"
                  style={{ fontSize: 15, margin: 0, lineHeight: 1.25, fontWeight: 600 }}
                >
                  {occ.label}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CUSTOM CTA ─────────────────────────────────────────── */
function HomeCustomCTA() {
  return (
    <section style={{ padding: "100px 0 80px" }}>
      <div className="container">
        <div
          className="reveal-scale"
          style={{
            background: "var(--terracotta)",
            color: "var(--cream)",
            borderRadius: "var(--r-xl)",
            padding: "clamp(48px,6vw,96px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              right: -120,
              top: -80,
              fontSize: "clamp(280px,36vw,480px)",
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.07)",
              lineHeight: 0.8,
              pointerEvents: "none",
              userSelect: "none",
              whiteSpace: "nowrap",
            }}
          >
            custom
          </div>

          <div
            style={{
              position: "absolute",
              right: "4%",
              top: 0,
              bottom: 0,
              width: "28%",
              opacity: 0.15,
              overflow: "hidden",
              borderRadius: "0 var(--r-xl) var(--r-xl) 0",
            }}
            aria-hidden
          >
            <Image
              src="/photos/decanter-set-gift.jpg"
              alt=""
              fill
              style={{ objectFit: "cover" }}
              sizes="28vw"
            />
          </div>

          <div style={{ position: "relative", zIndex: 1, maxWidth: 680 }}>
            <p className="eyebrow" style={{ color: "var(--blush)" }}>
              By commission
            </p>
            <h2
              className="display"
              style={{ fontSize: "clamp(40px,6vw,88px)", margin: "20px 0 24px", fontWeight: 400 }}
            >
              Have something{" "}
              <em style={{ fontStyle: "italic" }}>specific</em> in mind?
            </h2>
            <p style={{ fontSize: 17, opacity: 0.85, lineHeight: 1.6, maxWidth: 520 }}>
              Send a brief, get a quote within 24 hours, and a digital proof before we touch the
              laser.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
              <Link
                href="/custom"
                className="btn"
                data-magnetic="70"
                data-burst
                style={{ background: "var(--cream)", color: "var(--ink)" }}
              >
                Start a custom request <ArrowIcon size={14} />
              </Link>
              <Link
                href="/contact"
                className="btn"
                data-magnetic="70"
                style={{
                  background: "transparent",
                  color: "var(--cream)",
                  border: "1px solid rgba(255,255,255,0.4)",
                }}
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
