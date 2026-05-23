import Image from "next/image";
import Link from "next/link";
import { collections, lifestyleScenes } from "@/lib/data";
import { ProductGlyph } from "@/components/ProductGlyph";
import { ArrowIcon } from "@/components/Icons";
import { HomeCustomizerTeaser } from "@/components/home/HomeCustomizerTeaser";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";
import { wixClient } from "@/lib/wixClient";

export const dynamic = "force-dynamic";

async function getFeaturedProducts() {
  try {
    const { items } = await wixClient.products.queryProducts().limit(6).find();
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
      <HomeMarqueeStrip />
      <HomeCategories />
      <HomeStudioStory />
      <HomeBestsellers products={products} />
      <HomeCustomizerTeaser />
      <HomeInTheirHands />
      <HomeTestimonials />
      <HomeCustomCTA />
    </main>
  );
}

/* ── HERO ───────────────────────────────────────────────── */
function HomeHero() {
  return (
    <section style={{ position: "relative", padding: "40px 0 80px" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 0.95fr",
            gap: 48,
            alignItems: "end",
            minHeight: "78vh",
          }}
        >
          {/* Left — headline */}
          <div style={{ position: "relative", padding: "40px 0" }}>
            <p className="eyebrow reveal" style={{ marginBottom: 28 }}>
              Volume 04 · Engraved goods, made by hand
            </p>
            <h1
              className="display reveal reveal-delay-1"
              style={{
                fontSize: "clamp(64px,8.5vw,132px)",
                margin: "0 0 12px",
                fontWeight: 400,
              }}
            >
              Gifts that
              <br />
              <em
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "var(--terracotta)",
                }}
              >
                mean&nbsp;
              </em>
              something.
            </h1>

            <p
              className="reveal reveal-delay-2"
              style={{
                fontSize: 18,
                lineHeight: 1.55,
                color: "var(--muted)",
                maxWidth: 460,
                margin: "24px 0 36px",
              }}
            >
              A small Black-owned studio engraving tumblers, boards, wallets,
              and one-off commissions — for the moments that deserve more than a
              card.
            </p>

            <div
              className="reveal reveal-delay-3"
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
            >
              <Link href="/shop" className="btn btn-primary" data-magnetic="60">
                Shop the collection <ArrowIcon />
              </Link>
              <Link href="/custom" className="btn btn-secondary">
                Start a custom piece
              </Link>
            </div>

            {/* Stats row */}
            <div
              className="reveal reveal-delay-4"
              style={{
                display: "flex",
                gap: 32,
                marginTop: 56,
                paddingTop: 28,
                borderTop: "1px solid var(--line)",
                flexWrap: "wrap",
              }}
            >
              <HeroStat label="Pieces in the catalog" value="117" counter={117} />
              <HeroStat label="Five-star reviews" value="1,840+" counter={1840} suffix="+" />
              <HeroStat label="Engraved this year" value="6,200" counter={6200} />
              <HeroStat label="Studio" value="Charlotte, NC" />
            </div>
          </div>

          {/* Right — image stack */}
          <div
            className="reveal reveal-delay-2"
            style={{ position: "relative", minHeight: 580 }}
          >
            {/* Main hero image */}
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: "90%",
                borderRadius: "var(--r-md)",
                overflow: "hidden",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=900&q=80"
                alt="Donna holding a custom engraved tumbler"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 45vw"
                priority
              />
            </div>

            {/* Floating card — live order */}
            <div
              data-tilt="5"
              style={{
                position: "absolute",
                left: 0,
                top: "12%",
                background: "var(--cream)",
                boxShadow: "var(--shadow-lg)",
                borderRadius: "var(--r-md)",
                padding: 18,
                maxWidth: 220,
                zIndex: 2,
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}
              >
                <span
                  className="live-dot"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--forest)",
                    color: "var(--forest)",
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--forest)",
                    letterSpacing: "0.06em",
                  }}
                >
                  ENGRAVING NOW
                </span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.5, margin: 0, color: "var(--ink)" }}>
                A walnut board for{" "}
                <em style={{ fontStyle: "italic" }}>Sydney &amp; Marcus</em> —
                the wedding monogram.
              </p>
              <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
                {[1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    style={{
                      height: 3,
                      flex: 1,
                      borderRadius: 4,
                      background:
                        i <= 2 ? "var(--terracotta)" : "var(--cream-3)",
                    }}
                  />
                ))}
              </div>
              <p
                style={{
                  fontSize: 10,
                  color: "var(--muted-soft)",
                  margin: "8px 0 0",
                  letterSpacing: "0.04em",
                }}
              >
                STEP 2 / 4 · ETCHING
              </p>
            </div>

            {/* Floating signature card */}
            <div
              data-tilt="6"
              style={{
                position: "absolute",
                right: "6%",
                bottom: "-30px",
                background: "var(--ink)",
                color: "var(--cream)",
                boxShadow: "var(--shadow-lg)",
                borderRadius: "var(--r-md)",
                padding: "16px 20px",
                maxWidth: 240,
                zIndex: 2,
              }}
            >
              <p className="display-italic" style={{ fontSize: 24, margin: 0, lineHeight: 1 }}>
                — Donna
              </p>
              <p
                style={{
                  fontSize: 11,
                  opacity: 0.7,
                  margin: "4px 0 0",
                  letterSpacing: "0.08em",
                }}
              >
                Owner · engraver · she/her
              </p>
            </div>

            {/* Rotating badge */}
            <div
              className="idle-drift"
              style={{
                position: "absolute",
                left: "-6%",
                bottom: "20%",
                background: "var(--brass)",
                color: "var(--ink)",
                borderRadius: "50%",
                width: 110,
                height: 110,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center",
                boxShadow: "var(--shadow-lg)",
                transform: "rotate(-6deg)",
                zIndex: 2,
              }}
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                style={{ position: "absolute", animation: "spin 30s linear infinite" }}
              >
                <path
                  id="badge-circ"
                  d="M 40 40 m -32 0 a 32 32 0 1 1 64 0 a 32 32 0 1 1 -64 0"
                  fill="none"
                />
                <text
                  fill="currentColor"
                  fontSize="8.5"
                  fontFamily="var(--font-body)"
                  fontWeight="700"
                  letterSpacing="3"
                >
                  <textPath href="#badge-circ">
                    BLACK OWNED · HAND ENGRAVED · BLACK OWNED · HAND ENGRAVED ·
                  </textPath>
                </text>
              </svg>
              <span style={{ fontSize: 24 }}>✦</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStat({
  label,
  value,
  counter,
  suffix,
}: {
  label: string;
  value: string;
  counter?: number;
  suffix?: string;
}) {
  return (
    <div>
      <div
        className="serif counter"
        style={{ fontSize: 24, lineHeight: 1, marginBottom: 4 }}
        {...(counter !== undefined ? { "data-counter": counter } : {})}
        {...(suffix ? { "data-suffix": suffix } : {})}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 11,
          color: "var(--muted)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* ── MARQUEE STRIP ──────────────────────────────────────── */
function HomeMarqueeStrip() {
  const items = [
    "Hand-engraved in Charlotte, NC",
    "Free US shipping over $125",
    "1,840+ five-star reviews",
    "Black-owned, woman-owned",
    "Live engraving preview",
    "24-hour custom-order replies",
    "Gift-ready packaging on every order",
  ];
  const repeated = [...items, ...items, ...items];

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

/* ── CATEGORIES GRID ────────────────────────────────────── */
function HomeCategories() {
  const catImages = [
    "https://images.unsplash.com/photo-1592919505780-303950717480?w=700&q=80",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=80",
    "https://images.unsplash.com/photo-1591290619762-c5dac3a8347a?w=400&q=80",
    "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80",
  ];
  const bgs = [
    "var(--blush)",
    "var(--cream-3)",
    "var(--forest)",
    "var(--brass-light)",
    "var(--ink)",
  ];
  const textColors = [
    "var(--ink)",
    "var(--ink)",
    "var(--cream)",
    "var(--ink)",
    "var(--cream)",
  ];
  // col, row, colSpan, rowSpan, collectionIndex
  const layout = [
    { col: 1, row: 1, cs: 2, rs: 2, ci: 0 },
    { col: 3, row: 1, cs: 2, rs: 1, ci: 1 },
    { col: 5, row: 1, cs: 2, rs: 2, ci: 4 },
    { col: 3, row: 2, cs: 1, rs: 1, ci: 2 },
    { col: 4, row: 2, cs: 1, rs: 1, ci: 3 },
  ];

  return (
    <section style={{ padding: "120px 0 60px" }}>
      <div className="container">
        <div
          className="reveal"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            marginBottom: 56,
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div>
            <p className="eyebrow">Browse</p>
            <h2
              className="display"
              style={{
                fontSize: "clamp(40px,5.5vw,76px)",
                margin: "12px 0 0",
                fontWeight: 400,
              }}
            >
              Find your{" "}
              <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>
                aisle.
              </em>
            </h2>
          </div>
          <Link
            href="/shop"
            style={{
              color: "var(--ink)",
              fontSize: 14,
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              borderBottom: "1px solid var(--ink)",
              paddingBottom: 4,
              textDecoration: "none",
            }}
          >
            See everything <ArrowIcon size={14} />
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6,1fr)",
            gridAutoRows: "220px",
            gap: 16,
          }}
        >
          {layout.map(({ col, row, cs, rs, ci }, i) => {
            const c = collections[ci];
            return (
              <Link
                key={c.id}
                href={`/shop?collection=${c.id}`}
                className="reveal"
                style={{
                  gridColumn: `${col} / span ${cs}`,
                  gridRow: `${row} / span ${rs}`,
                  background: bgs[i],
                  color: textColors[i],
                  borderRadius: "var(--r-md)",
                  overflow: "hidden",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: rs === 2 ? 28 : 20,
                  textDecoration: "none",
                  transition:
                    "transform .5s var(--ease-out), box-shadow .5s var(--ease-out)",
                }}
              >
                <Image
                  src={catImages[i]}
                  alt={c.name}
                  fill
                  className="object-cover"
                  style={{ opacity: rs === 2 ? 0.55 : 0.45 }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <p
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      opacity: 0.7,
                      margin: 0,
                    }}
                  >
                    {String(ci + 1).padStart(2, "0")} / Collection
                  </p>
                </div>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <h3
                    className="display"
                    style={{
                      fontSize:
                        rs === 2 ? "clamp(32px,3.5vw,48px)" : 22,
                      margin: "0 0 6px",
                      lineHeight: 1,
                      fontWeight: 400,
                    }}
                  >
                    {c.name}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      opacity: 0.75,
                      margin: 0,
                      fontStyle: "italic",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {c.kicker}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 18,
                      fontSize: 12,
                    }}
                  >
                    <span style={{ opacity: 0.7 }}>{c.count} pieces</span>
                    <span>Shop →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── STUDIO STORY ───────────────────────────────────────── */
function HomeStudioStory() {
  const values = [
    { n: "01", t: "Hand-engraved", d: "Every piece passes through my hands or my team's — no exceptions." },
    { n: "02", t: "Small batches",  d: "I cap intake so each order gets the attention I'd want for my mother." },
    { n: "03", t: "Local sourced",  d: "Walnut from Carolina, leather from Tennessee, glass from Pennsylvania." },
    { n: "04", t: "Family first",   d: "A Black-owned, woman-owned, mother-run, sister-built studio." },
  ];

  return (
    <section style={{ background: "var(--cream-2)", padding: "140px 0" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.95fr 1.05fr",
            gap: 80,
            alignItems: "center",
          }}
        >
          <div className="reveal" style={{ position: "relative" }}>
            <div
              style={{
                width: "100%",
                aspectRatio: "4/5",
                borderRadius: "var(--r-md)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1531123414780-f74242c2b052?w=700&q=80"
                alt="Donna at the laser engraver in her studio"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: -20,
                bottom: 24,
                background: "var(--cream)",
                padding: "12px 18px",
                borderRadius: "var(--r-pill)",
                boxShadow: "var(--shadow-md)",
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 12,
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--terracotta)",
                }}
              />
              Studio · 6:47 AM · first cup, first cut.
            </div>
          </div>

          <div className="reveal reveal-delay-1">
            <p className="eyebrow">Meet Donna</p>
            <h2
              className="display"
              style={{
                fontSize: "clamp(40px,5vw,72px)",
                margin: "20px 0 24px",
                fontWeight: 400,
              }}
            >
              I started this{" "}
              <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>
                at the kitchen table.
              </em>
            </h2>

            <div
              style={{ fontSize: 17, lineHeight: 1.7, color: "var(--ink-soft)", maxWidth: 520 }}
            >
              <p style={{ marginTop: 0 }}>
                For my sister&rsquo;s graduation. A walnut box with her name and
                the date she walked across that stage. I made one — then
                everyone in our family wanted one.
              </p>
              <p>
                Six years later it&rsquo;s a studio in Charlotte. Still small.
                Still mine. Every piece is engraved by my hand or one of two
                women I&rsquo;ve trained personally. Nothing leaves here unless
                I&rsquo;d give it to my own mother.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 28,
                marginTop: 40,
              }}
            >
              {values.map((v) => (
                <div
                  key={v.n}
                  style={{ borderTop: "1px solid var(--line)", paddingTop: 16 }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--terracotta)",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                    }}
                  >
                    {v.n}
                  </span>
                  <h4 className="serif" style={{ fontSize: 17, margin: "6px 0" }}>
                    {v.t}
                  </h4>
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--muted)",
                      margin: 0,
                      lineHeight: 1.55,
                    }}
                  >
                    {v.d}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="btn btn-secondary"
              style={{ marginTop: 36 }}
            >
              Read the full story <ArrowIcon size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── BESTSELLERS ────────────────────────────────────────── */
type WixProduct = {
  _id?: string | null;
  name?: string | null;
  slug?: string | null;
  priceData?: { formatted?: { price?: string | null } } | null;
  media?: { mainMedia?: { image?: { url?: string | null } } } | null;
};

const GLYPH_TYPES = [
  "tumbler",
  "board",
  "decanter",
  "wallet",
  "box",
  "tumbler-tall",
] as const;

function HomeBestsellers({ products }: { products: WixProduct[] }) {
  return (
    <section style={{ padding: "140px 0 60px" }}>
      <div className="container">
        <div
          className="reveal"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            marginBottom: 56,
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div>
            <p className="eyebrow">Fan favorites</p>
            <h2
              className="display"
              style={{
                fontSize: "clamp(40px,5.5vw,76px)",
                margin: "12px 0 0",
                fontWeight: 400,
              }}
            >
              The pieces{" "}
              <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>
                everyone&nbsp;
              </em>
              orders.
            </h2>
          </div>
          <Link
            href="/shop"
            style={{
              color: "var(--ink)",
              fontSize: 14,
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              borderBottom: "1px solid var(--ink)",
              paddingBottom: 4,
              textDecoration: "none",
            }}
          >
            View all <ArrowIcon size={14} />
          </Link>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}
        >
          {(products.length > 0 ? products : Array(6).fill(null)).map(
            (p, i) => {
              const imageUrl = p?.media?.mainMedia?.image?.url ?? null;
              const price = p?.priceData?.formatted?.price ?? null;
              const slug = p?.slug ?? p?._id ?? "";
              const glyphType = GLYPH_TYPES[i % GLYPH_TYPES.length];

              return p ? (
                <Link
                  key={p._id ?? i}
                  href={`/product/${slug}`}
                  className="reveal"
                  style={{
                    background: "var(--cream)",
                    borderRadius: "var(--r-md)",
                    overflow: "hidden",
                    textDecoration: "none",
                    color: "var(--ink)",
                    border: "1px solid var(--line-soft)",
                    boxShadow: "var(--shadow-sm)",
                    display: "block",
                    transition:
                      "transform .5s var(--ease-out), box-shadow .5s var(--ease-out)",
                  }}
                >
                  <div
                    style={{
                      aspectRatio: "1/1",
                      background: "var(--cream-2)",
                      position: "relative",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={p.name ?? "Product"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <ProductGlyph type={glyphType} size={220} />
                    )}
                  </div>
                  <div style={{ padding: 18 }}>
                    <h3
                      className="serif"
                      style={{ fontSize: 17, margin: "0 0 4px", fontWeight: 500 }}
                    >
                      {p.name ?? "Unnamed"}
                    </h3>
                    {price && (
                      <div style={{ fontSize: 16, fontWeight: 600 }}>{price}</div>
                    )}
                  </div>
                </Link>
              ) : (
                // Skeleton
                <div
                  key={i}
                  className="reveal"
                  style={{
                    background: "var(--cream)",
                    borderRadius: "var(--r-md)",
                    overflow: "hidden",
                    border: "1px solid var(--line-soft)",
                  }}
                >
                  <div
                    style={{
                      aspectRatio: "1/1",
                      background: "var(--cream-2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ProductGlyph type={glyphType} size={220} />
                  </div>
                  <div style={{ padding: 18 }}>
                    <div
                      style={{
                        height: 16,
                        width: "60%",
                        background: "var(--cream-3)",
                        borderRadius: 4,
                        marginBottom: 8,
                      }}
                    />
                    <div
                      style={{
                        height: 14,
                        width: "30%",
                        background: "var(--cream-3)",
                        borderRadius: 4,
                      }}
                    />
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}

/* ── IN THEIR HANDS ─────────────────────────────────────── */
function HomeInTheirHands() {
  return (
    <section style={{ padding: "140px 0 60px" }}>
      <div className="container">
        <div
          className="reveal"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            marginBottom: 56,
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div>
            <p className="eyebrow">@donnaandco</p>
            <h2
              className="display"
              style={{
                fontSize: "clamp(40px,5.5vw,76px)",
                margin: "12px 0 0",
                fontWeight: 400,
                maxWidth: 720,
              }}
            >
              In their{" "}
              <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>
                hands.
              </em>
            </h2>
            <p style={{ fontSize: 16, color: "var(--muted)", marginTop: 14, maxWidth: 540 }}>
              Customers carrying Donna pieces into the world. Tag{" "}
              <strong>@donnaandco</strong> to be featured.
            </p>
          </div>
          <a
            href="#"
            style={{
              color: "var(--ink)",
              fontSize: 14,
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              borderBottom: "1px solid var(--ink)",
              paddingBottom: 4,
              textDecoration: "none",
            }}
          >
            Follow on Instagram <ArrowIcon size={14} />
          </a>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}
        >
          {lifestyleScenes.slice(0, 6).map((scene) => (
            <div
              key={scene.id}
              className="reveal"
              style={{
                position: "relative",
                borderRadius: "var(--r-sm)",
                overflow: "hidden",
                aspectRatio: "4/5",
              }}
            >
              <Image
                src={scene.src}
                alt={scene.caption}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 60%, rgba(31,20,16,0.6) 100%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: 16,
                  color: "var(--cream)",
                }}
              >
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    alignSelf: "flex-start",
                    background: "rgba(0,0,0,0.4)",
                    padding: "4px 8px",
                    borderRadius: 4,
                  }}
                >
                  {scene.tag}
                </span>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    lineHeight: 1.3,
                  }}
                >
                  {scene.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CUSTOM CTA ─────────────────────────────────────────── */
function HomeCustomCTA() {
  return (
    <section style={{ padding: "120px 0 40px" }}>
      <div className="container">
        <div
          className="reveal"
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
              color: "rgba(255,255,255,0.08)",
              lineHeight: 0.8,
              pointerEvents: "none",
              userSelect: "none",
              whiteSpace: "nowrap",
            }}
          >
            custom
          </div>

          <div style={{ position: "relative", zIndex: 1, maxWidth: 720 }}>
            <p className="eyebrow" style={{ color: "var(--blush)" }}>
              By commission
            </p>
            <h2
              className="display"
              style={{
                fontSize: "clamp(40px,6vw,88px)",
                margin: "20px 0 24px",
                fontWeight: 400,
              }}
            >
              Have something{" "}
              <em style={{ fontStyle: "italic" }}>specific</em> in mind?
            </h2>
            <p
              style={{ fontSize: 18, opacity: 0.85, lineHeight: 1.6, maxWidth: 540 }}
            >
              From custom wedding sets to a single one-off piece — send a brief,
              get a quote within 24 hours, and a digital proof before I touch the
              laser.
            </p>
            <div
              style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}
            >
              <Link
                href="/custom"
                className="btn"
                style={{ background: "var(--cream)", color: "var(--ink)" }}
              >
                Start a custom request <ArrowIcon size={14} />
              </Link>
              <Link
                href="/contact"
                className="btn"
                style={{
                  background: "transparent",
                  color: "var(--cream)",
                  border: "1px solid rgba(255,255,255,0.4)",
                }}
              >
                Talk to Donna directly
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
