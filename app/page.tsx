import Image from "next/image";
import Link from "next/link";
import { collections, giftOccasions } from "@/lib/data";
import { ProductGlyph } from "@/components/ProductGlyph";
import { ArrowIcon } from "@/components/Icons";
import { HomeCustomizerTeaser } from "@/components/home/HomeCustomizerTeaser";
import { wixClient } from "@/lib/wixClient";

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
      <HomeMarqueeStrip />
      <HomeTwoTiles />
      <HomeVideoShowcase />
      <HomeBestsellers products={products} />
      <HomeOccasions />
      <HomeCustomizerTeaser />
      <HomePhotoGrid />
      <HomeCustomCTA />
    </main>
  );
}

/* ── HERO ───────────────────────────────────────────────── */
function HomeHero() {
  return (
    <section style={{ position: "relative", padding: "40px 0 80px" }}>
      <div className="container">
        <div className="layout-hero">
          {/* Left — headline */}
          <div style={{ position: "relative", padding: "40px 0" }}>
            <p className="eyebrow reveal" style={{ marginBottom: 28 }}>
              Woman Owned &amp; Operated · Custom Laser Engraving
            </p>
            <h1
              className="display reveal reveal-delay-1"
              style={{
                fontSize: "clamp(56px,7.5vw,116px)",
                margin: "0 0 12px",
                fontWeight: 400,
                lineHeight: 0.95,
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
                fontSize: 17,
                lineHeight: 1.6,
                color: "var(--muted)",
                maxWidth: 440,
                margin: "24px 0 36px",
              }}
            >
              Out of Jersey — custom laser engraving on tumblers, boards,
              knives, wallets, and one-of-a-kind commissions.
            </p>

            <div
              className="reveal reveal-delay-3"
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
            >
              <Link href="/shop" className="btn btn-primary">
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
                gap: 40,
                marginTop: 56,
                paddingTop: 28,
                borderTop: "1px solid var(--line)",
                flexWrap: "wrap",
              }}
            >
              <HeroStat label="5-star reviews" value="1,840+" />
              <HeroStat label="Pieces engraved" value="14,200+" />
              <HeroStat label="Based in" value="New Jersey" />
              <HeroStat label="Ownership" value="Woman Owned" />
            </div>
          </div>

          {/* Right — two stacked real product photos */}
          <div
            className="reveal reveal-delay-2 hero-right"
            style={{ position: "relative", minHeight: 560 }}
          >
            {/* Main large photo */}
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: "88%",
                borderRadius: "var(--r-lg)",
                overflow: "hidden",
              }}
            >
              <Image
                src="/photos/bff-tumblers.jpg"
                alt="Custom engraved tumblers"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 45vw"
                priority
              />
            </div>

            {/* Floating inset — wedding board */}
            <div
              className="hero-floating"
              style={{
                position: "absolute",
                left: 0,
                bottom: "15%",
                width: 156,
                height: 190,
                borderRadius: "var(--r-md)",
                overflow: "hidden",
                boxShadow: "var(--shadow-xl)",
                zIndex: 2,
                border: "4px solid var(--cream)",
              }}
            >
              <Image
                src="/photos/wedding-board-couple.jpg"
                alt="Custom engraved wedding board"
                fill
                className="object-cover"
                sizes="156px"
              />
            </div>

            {/* Woman Owned badge — real, not fake */}
            <div
              className="idle-drift hero-floating"
              style={{
                position: "absolute",
                left: "-2%",
                top: "18%",
                background: "var(--ink)",
                color: "var(--cream)",
                borderRadius: "var(--r-pill)",
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "var(--shadow-lg)",
                zIndex: 3,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.06em",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{
                width: 8, height: 8, borderRadius: "50%",
                background: "var(--terracotta)", flexShrink: 0,
              }} />
              WOMAN OWNED &amp; OPERATED
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="serif" style={{ fontSize: 22, lineHeight: 1, marginBottom: 4, fontWeight: 600 }}>
        {value}
      </div>
      <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        {label}
      </div>
    </div>
  );
}

/* ── MARQUEE STRIP ──────────────────────────────────────── */
function HomeMarqueeStrip() {
  const items = [
    "Custom laser engraving — woman owned & operated",
    "Free US shipping over $125",
    "1,840+ five-star reviews",
    "Tumblers · Boards · Knives · Wallets · More",
    "Live engraving preview",
    "24-hour custom-order replies",
    "Gift-ready packaging on every order",
  ];
  const repeated = [...items, ...items, ...items];

  return (
    <section style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "18px 0", overflow: "hidden" }}>
      <div className="marquee-track" style={{ animationDuration: "46s" }}>
        {repeated.map((it, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 64, fontSize: 13, color: "var(--ink-soft)", fontFamily: "var(--font-display)", fontStyle: "italic" }}>
            {it} <span style={{ color: "var(--brass)" }}>✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ── TWO TILES (RTIC-style) ─────────────────────────────── */
function HomeTwoTiles() {
  return (
    <section style={{ padding: "60px 0 0" }}>
      <div className="container">
        <div className="layout-2col">
          {/* Tile 1 — Corporate & Bulk */}
          <Link
            href="/shop?collection=corporate"
            className="card-hover tile-card"
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
            <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.72) 100%)" }} />
            <div style={{ position: "relative", zIndex: 1, padding: "32px 36px" }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.7, margin: "0 0 10px" }}>
                Bulk orders welcome
              </p>
              <h2 className="display" style={{ fontSize: "clamp(28px,3vw,40px)", margin: "0 0 20px", fontWeight: 400 }}>
                Corporate Teams &amp; Gifting
              </h2>
              <p style={{ fontSize: 14, opacity: 0.8, margin: "0 0 24px", lineHeight: 1.55, maxWidth: 360 }}>
                Brand awareness, client gifts, employee recognition — at any quantity.
              </p>
              <span className="btn" style={{ background: "var(--cream)", color: "var(--ink)", fontSize: 13, padding: "12px 22px", display: "inline-flex", alignItems: "center", gap: 8 }}>
                START YOUR QUOTE <ArrowIcon size={13} />
              </span>
            </div>
          </Link>

          {/* Tile 2 — Custom Commissions */}
          <Link
            href="/custom"
            className="card-hover tile-card"
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
              src="/photos/wedding-board-couple.jpg"
              alt="Custom commission engraving orders"
              fill
              className="object-cover card-media"
              sizes="50vw"
            />
            <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.72) 100%)" }} />
            <div style={{ position: "relative", zIndex: 1, padding: "32px 36px" }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.7, margin: "0 0 10px" }}>
                One-of-a-kind pieces
              </p>
              <h2 className="display" style={{ fontSize: "clamp(28px,3vw,40px)", margin: "0 0 20px", fontWeight: 400 }}>
                Custom Commissions
              </h2>
              <p style={{ fontSize: 14, opacity: 0.8, margin: "0 0 24px", lineHeight: 1.55, maxWidth: 360 }}>
                Wedding gifts, family heirlooms, personal artwork — send a brief, get a quote in 24 hours.
              </p>
              <span className="btn" style={{ background: "var(--cream)", color: "var(--ink)", fontSize: 13, padding: "12px 22px", display: "inline-flex", alignItems: "center", gap: 8 }}>
                START YOUR QUOTE <ArrowIcon size={13} />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── VIDEO SHOWCASE ─────────────────────────────────────── */
function HomeVideoShowcase() {
  const videos = [
    { src: "/videos/laser-engraving-02.mp4", label: "Custom tumbler" },
    { src: "/videos/laser-engraving-03.mp4", label: "Engraving process" },
    { src: "/videos/laser-engraving-04.mp4", label: "Mother's Day drop" },
    { src: "/videos/laser-engraving-05.mp4", label: "Brand collab" },
    { src: "/videos/laser-engraving-06.mp4", label: "Laser in action" },
    { src: "/videos/laser-engraving-07.mp4", label: "Mother's Day set" },
    { src: "/videos/laser-engraving-08.mp4", label: "Custom engraving" },
    { src: "/videos/laser-engraving-09.mp4", label: "49ers collab" },
    { src: "/videos/laser-engraving-10.mp4", label: "APA international" },
    { src: "/videos/laser-engraving-11.mp4", label: "Studio process" },
    { src: "/videos/laser-engraving-13.mp4", label: "Detail shot" },
    { src: "/videos/laser-engraving-14.mp4", label: "HK custom piece" },
    { src: "/videos/laser-engraving-15.mp4", label: "Custom artwork" },
    { src: "/videos/laser-engraving-16.mp4", label: "Team design" },
    { src: "/videos/laser-engraving-17.mp4", label: "Championship piece" },
  ];

  return (
    <section style={{ padding: "100px 0 80px", overflow: "hidden" }}>
      <div className="container">
        <div
          className="reveal"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 48, flexWrap: "wrap", gap: 20 }}
        >
          <div>
            <p className="eyebrow">Watch us work</p>
            <h2 className="display" style={{ fontSize: "clamp(36px,5vw,68px)", margin: "12px 0 0", fontWeight: 400 }}>
              The craft,{" "}
              <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>up close.</em>
            </h2>
          </div>
          <p style={{ fontSize: 15, color: "var(--muted)", maxWidth: 340, lineHeight: 1.6, margin: 0 }}>
            Every mark is intentional. Laser precision, personal care — on every single piece.
          </p>
        </div>
      </div>

      {/* Full-bleed horizontal scroll strip */}
      <div
        style={{
          display: "flex",
          gap: 10,
          overflowX: "auto",
          paddingLeft: "max(24px, calc((100vw - 1280px) / 2))",
          paddingRight: "max(24px, calc((100vw - 1280px) / 2))",
          paddingBottom: 8,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {videos.map((v, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              borderRadius: "var(--r-md)",
              overflow: "hidden",
              aspectRatio: "9/16",
              height: 420,
              flexShrink: 0,
              background: "var(--ink)",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              src={v.src}
            />
            <div style={{
              position: "absolute",
              bottom: 0, left: 0, right: 0,
              background: "linear-gradient(transparent, rgba(0,0,0,0.65))",
              padding: "24px 14px 14px",
              color: "var(--cream)",
            }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", margin: 0 }}>
                {v.label}
              </p>
            </div>
          </div>
        ))}
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

const GLYPH_TYPES = ["tumbler", "board", "decanter", "wallet", "box", "tumbler-tall", "tumbler", "board"] as const;

function HomeBestsellers({ products }: { products: WixProduct[] }) {
  const list = products.length > 0 ? products : Array(8).fill(null);

  return (
    <section style={{ padding: "80px 0 60px", background: "var(--cream-2)" }}>
      <div className="container">
        <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
          <div>
            <p className="eyebrow">Fan favorites</p>
            <h2 className="display" style={{ fontSize: "clamp(36px,5vw,68px)", margin: "12px 0 0", fontWeight: 400 }}>
              Most{" "}
              <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>ordered.</em>
            </h2>
          </div>
          <Link href="/shop" style={{ color: "var(--ink)", fontSize: 14, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 6, borderBottom: "1px solid var(--ink)", paddingBottom: 4, textDecoration: "none" }}>
            View all <ArrowIcon size={14} />
          </Link>
        </div>

        {/* 4-column grid like Everything Etched */}
        <div className="layout-4col">
          {list.slice(0, 8).map((p: WixProduct | null, i: number) => {
            const imageUrl = p?.media?.mainMedia?.image?.url ?? null;
            const price = p?.priceData?.formatted?.price ?? null;
            const slug = p?.slug ?? p?._id ?? "";
            const glyphType = GLYPH_TYPES[i % GLYPH_TYPES.length];

            return p ? (
              <Link
                key={p._id ?? i}
                href={`/product/${slug}`}
                className="reveal lift-on-hover"
                style={{ background: "var(--cream)", borderRadius: "var(--r-md)", overflow: "hidden", textDecoration: "none", color: "var(--ink)", border: "1px solid var(--line-soft)", display: "block" }}
              >
                <div className="card-hover" style={{ aspectRatio: "1/1", background: "#f8f4ed", position: "relative", overflow: "hidden" }}>
                  {imageUrl ? (
                    <Image src={imageUrl} alt={p.name ?? "Product"} fill className="object-cover card-media" sizes="25vw" />
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                      <ProductGlyph type={glyphType} size={160} />
                    </div>
                  )}
                </div>
                <div style={{ padding: "14px 16px 16px" }}>
                  <h3 className="serif" style={{ fontSize: 15, margin: "0 0 6px", fontWeight: 500, lineHeight: 1.3 }}>
                    {p.name ?? "Product"}
                  </h3>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {price && <span style={{ fontSize: 15, fontWeight: 600 }}>{price}</span>}
                    <span style={{ fontSize: 12, color: "var(--terracotta)", fontWeight: 500 }}>Personalize →</span>
                  </div>
                </div>
              </Link>
            ) : (
              <div key={i} className="reveal" style={{ background: "var(--cream)", borderRadius: "var(--r-md)", overflow: "hidden", border: "1px solid var(--line-soft)" }}>
                <div style={{ aspectRatio: "1/1", background: "#f8f4ed", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ProductGlyph type={glyphType} size={160} />
                </div>
                <div style={{ padding: "14px 16px 16px" }}>
                  <div style={{ height: 14, width: "65%", background: "var(--cream-3)", borderRadius: 4, marginBottom: 8 }} />
                  <div style={{ height: 13, width: "35%", background: "var(--cream-3)", borderRadius: 4 }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── OCCASIONS ──────────────────────────────────────────── */
function HomeOccasions() {
  return (
    <section style={{ padding: "100px 0 80px" }}>
      <div className="container">
        <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
          <div>
            <p className="eyebrow">Gift by occasion</p>
            <h2 className="display" style={{ fontSize: "clamp(36px,5vw,68px)", margin: "12px 0 0", fontWeight: 400 }}>
              Shop the{" "}
              <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>moment.</em>
            </h2>
          </div>
          <p style={{ fontSize: 15, color: "var(--muted)", maxWidth: 320, lineHeight: 1.6, margin: 0 }}>
            Engraved gifts are always for a reason. Find yours.
          </p>
        </div>

        <div className="reveal occasions-grid">
          {giftOccasions.map((occ, i) => (
            <Link
              key={occ.id}
              href={occ.href}
              className="card-hover"
              style={{ position: "relative", borderRadius: "var(--r-md)", overflow: "hidden", aspectRatio: "3/4", display: "flex", flexDirection: "column", justifyContent: "flex-end", textDecoration: "none", color: "var(--cream)" }}
            >
              <Image src={occ.src} alt={occ.label} fill className="object-cover card-media" sizes="20vw" />
              <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%)", pointerEvents: "none" }} />
              <div style={{ position: "relative", zIndex: 1, padding: "14px 16px 18px" }}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", opacity: 0.7, margin: "0 0 4px", textTransform: "uppercase" }}>{occ.kicker}</p>
                <h3 className="serif" style={{ fontSize: 15, margin: 0, lineHeight: 1.25, fontWeight: 600 }}>{occ.label}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PHOTO GRID (real photos only) ──────────────────────── */
function HomePhotoGrid() {
  // All real product photos — no stock, no Unsplash
  const photos = [
    { src: "/photos/bff-tumblers.jpg",          alt: "Custom engraved BFF tumblers" },
    { src: "/photos/wedding-board-couple.jpg",   alt: "Personalized wedding board" },
    { src: "/photos/cutting-boards-family.jpg",  alt: "Engraved family cutting boards" },
    { src: "/photos/whiskey-glasses-bar.jpg",    alt: "Monogrammed whiskey glasses" },
    { src: "/photos/knife-engraved.jpg",         alt: "Custom engraved knife" },
    { src: "/photos/custom-artwork-tumbler.jpg", alt: "Custom artwork tumbler" },
    { src: "/photos/leather-wallet.jpg",         alt: "Personalized leather wallet" },
    { src: "/photos/decanter-set-gift.jpg",      alt: "Engraved decanter gift set" },
    { src: "/photos/keychain-business.jpg",      alt: "Custom engraved business keychains" },
    { src: "/photos/whiskey-glasses-monogram.jpg", alt: "Monogrammed whiskey glasses set" },
    { src: "/photos/knife-trail.jpg",            alt: "Personalized trail knife" },
    { src: "/photos/dad-keychain.jpg",           alt: "Engraved dad keychain" },
  ];

  return (
    <section style={{ padding: "80px 0 60px", background: "var(--cream-2)" }}>
      <div className="container">
        <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div>
            <p className="eyebrow">@outofjersey.engraving</p>
            <h2 className="display" style={{ fontSize: "clamp(36px,5vw,68px)", margin: "12px 0 0", fontWeight: 400 }}>
              The work,{" "}
              <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>up close.</em>
            </h2>
          </div>
          <a
            href="https://www.instagram.com/mamalaserengraver"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--ink)", fontSize: 14, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 6, borderBottom: "1px solid var(--ink)", paddingBottom: 4, textDecoration: "none" }}
          >
            Follow on Instagram <ArrowIcon size={14} />
          </a>
        </div>

        {/* Clean 6-column grid, 2 rows — like Everything Etched */}
        <div className="layout-6col">
          {photos.map((p, i) => (
            <div
              key={i}
              className="reveal card-hover"
              style={{ borderRadius: "var(--r-sm)", overflow: "hidden", aspectRatio: "1/1", position: "relative", background: "var(--cream-3)" }}
            >
              <Image src={p.src} alt={p.alt} fill className="object-cover card-media" sizes="16vw" />
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
    <section style={{ padding: "100px 0 60px" }}>
      <div className="container">
        <div
          className="reveal"
          style={{ background: "var(--terracotta)", color: "var(--cream)", borderRadius: "var(--r-xl)", padding: "clamp(48px,6vw,96px)", position: "relative", overflow: "hidden" }}
        >
          <div aria-hidden style={{ position: "absolute", right: -120, top: -80, fontSize: "clamp(280px,36vw,480px)", fontFamily: "var(--font-display)", fontStyle: "italic", color: "rgba(255,255,255,0.07)", lineHeight: 0.8, pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap" }}>
            custom
          </div>

          {/* Faint real product photo tease */}
          <div style={{ position: "absolute", right: "4%", top: 0, bottom: 0, width: "28%", opacity: 0.15, overflow: "hidden", borderRadius: "0 var(--r-xl) var(--r-xl) 0" }} aria-hidden>
            <Image src="/photos/decanter-set-gift.jpg" alt="" fill style={{ objectFit: "cover" }} sizes="28vw" />
          </div>

          <div style={{ position: "relative", zIndex: 1, maxWidth: 680 }}>
            <p className="eyebrow" style={{ color: "var(--blush)" }}>By commission</p>
            <h2 className="display" style={{ fontSize: "clamp(40px,6vw,88px)", margin: "20px 0 24px", fontWeight: 400 }}>
              Have something{" "}
              <em style={{ fontStyle: "italic" }}>specific</em> in mind?
            </h2>
            <p style={{ fontSize: 17, opacity: 0.85, lineHeight: 1.6, maxWidth: 520 }}>
              Send a brief, get a quote within 24 hours, and a digital proof before we touch the laser.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
              <Link href="/custom" className="btn" style={{ background: "var(--cream)", color: "var(--ink)" }}>
                Start a custom request <ArrowIcon size={14} />
              </Link>
              <Link href="/contact" className="btn" style={{ background: "transparent", color: "var(--cream)", border: "1px solid rgba(255,255,255,0.4)" }}>
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
