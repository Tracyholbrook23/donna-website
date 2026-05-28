import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";

const VALUES = [
  {
    n: "01",
    t: "The maker matters.",
    d: "Every piece that leaves our studio passes through the hands of someone who cares about it — no exceptions.",
  },
  {
    n: "02",
    t: "Slow is the speed.",
    d: "We cap how many orders we take each week so each one gets full attention. Sometimes that means waitlists. Sometimes that means saying no.",
  },
  {
    n: "03",
    t: "Laser precision.",
    d: "Our equipment is dialed in and our standards are high. Every mark is intentional.",
  },
  {
    n: "04",
    t: "Quality materials.",
    d: "Walnut, acacia, leather, steel, crystal — sourced for durability and beauty. Nothing cheap, ever.",
  },
  {
    n: "05",
    t: "Honest pricing.",
    d: "No fake sales, no urgency timers. Materials cost what they cost. Our time is worth what it's worth.",
  },
  {
    n: "06",
    t: "Heirloom over hype.",
    d: "We'd rather make one thing you keep for thirty years than ten things you replace in three.",
  },
];

const TEAM = [
  {
    name: "Founder & Lead Engraver",
    role: "Custom commissions · studio direction",
    bio: "Started Out of Jersey Creations with a laser, a vision, and a passion for making gifts that actually mean something. Runs intake, design, and every custom commission.",
    img: "/photos/bff-tumblers.jpg",
  },
  {
    name: "Production Engraver",
    role: "Tumblers & drinkware specialist",
    bio: "Specializes in drinkware and small-batch corporate runs. Precision work, every time.",
    img: "/photos/whiskey-glasses-bar.jpg",
  },
  {
    name: "Production Engraver",
    role: "Boards & keepsakes specialist",
    bio: "Handles boards, boxes, and all the large-format pieces. The walnut work is hard to beat.",
    img: "/photos/cutting-boards-family.jpg",
  },
];

export default function AboutPage() {
  return (
    <main className="page-enter">
      {/* Hero */}
      <section style={{ padding: "60px 0 0" }}>
        <div className="container">
          <div
            className="reveal-bounce"
            style={{ textAlign: "center", maxWidth: 980, margin: "0 auto" }}
          >
            <p className="eyebrow" style={{ marginBottom: 16 }}>
              About Out of Jersey Creations
            </p>
            <h1
              className="display"
              style={{
                fontSize: "clamp(52px, 8vw, 120px)",
                margin: "0 0 32px",
                fontWeight: 400,
                lineHeight: 0.9,
              }}
            >
              Custom laser engraving,{" "}
              <em
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  color: "var(--terracotta)",
                }}
              >
                done right.
              </em>
            </h1>
          </div>

          <div className="reveal-zoom" style={{ marginTop: 64 }}>
            <div
              style={{
                width: "100%",
                aspectRatio: "21/9",
                borderRadius: "var(--r-xl)",
                overflow: "hidden",
                background: "var(--cream-2)",
                position: "relative",
              }}
            >
              <Image
                src="/photos/prod-cutting-board-wedding.jpg"
                alt="Out of Jersey Creations — custom engraved wedding cutting board"
                fill
                style={{ objectFit: "cover", objectPosition: "center center" }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* The letter */}
      <section style={{ padding: "80px 0 100px" }}>
        <div className="container">
          <div className="layout-story">
            <div className="reveal-skew" style={{ position: "sticky", top: 100 }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>
                Our story
              </p>
              <p
                className="display-italic"
                style={{
                  fontSize: 80,
                  lineHeight: 0.9,
                  color: "var(--terracotta)",
                  margin: 0,
                }}
              >
                &ldquo;
              </p>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--muted)",
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  marginTop: 24,
                }}
              >
                — Out of Jersey Creations, woman owned &amp; operated
              </p>

              <div
                style={{ marginTop: 32, borderTop: "1px solid var(--line)" }}
              >
                {[
                  { label: "Based in", value: "California" },
                  { label: "Pieces engraved", value: "14,200+" },
                  { label: "5-star reviews", value: "1,840+" },
                  { label: "Ownership", value: "Woman Owned & Operated" },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{
                      padding: "20px 0",
                      borderBottom: "1px solid var(--line)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                        margin: "0 0 4px",
                        fontWeight: 600,
                      }}
                    >
                      {s.label}
                    </p>
                    <p
                      className="serif"
                      style={{ fontSize: 28, margin: 0, fontWeight: 500 }}
                    >
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal-skew-right">
              <div
                style={{
                  fontSize: 19,
                  lineHeight: 1.8,
                  color: "var(--ink-soft)",
                }}
              >
                <p style={{ marginTop: 0 }}>
                  Out of Jersey Creations started with a laser and a clear vision: make
                  personalized gifts that are actually worth giving. Not the
                  kind you wrap in a bag and forget — the kind that sit on a
                  shelf for thirty years because they mean something.
                </p>
                <p>
                  We specialize in custom laser engraving on tumblers, boards,
                  knives, wallets, glass, leather, and more. Every piece is
                  handled personally, from the first proof to the final pass.
                </p>
                <p>
                  <strong style={{ color: "var(--ink)", fontWeight: 600 }}>
                    Out of Jersey Creations exists for a simple reason:
                  </strong>{" "}
                  a gift with your name on it is different. A gift that carries
                  a name, a date, initials, a quote — something just for that
                  person — outlasts the holiday it was given for.
                </p>
                <p>
                  We ship across the US and internationally. Some weeks we
                  engrave eighty pieces, some weeks we engrave eight. Every
                  single one is treated the same way — with care.
                </p>
                <p>
                  Woman owned and operated. We are proud of every piece that
                  leaves the studio.
                </p>
                <p>We hope your gift lasts a long time.</p>
                <p
                  className="display-italic"
                  style={{
                    fontSize: 40,
                    color: "var(--ink)",
                    margin: "32px 0 0",
                    lineHeight: 1,
                  }}
                >
                  — Out of Jersey Creations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        style={{
          background: "var(--ink)",
          color: "var(--cream)",
          padding: "120px 0",
        }}
      >
        <div className="container">
          <div
            className="reveal"
            style={{ textAlign: "center", marginBottom: 64 }}
          >
            <p
              className="eyebrow"
              style={{ color: "var(--brass-light)", marginBottom: 16 }}
            >
              What we believe
            </p>
            <h2
              className="display"
              style={{
                fontSize: "clamp(40px, 5vw, 72px)",
                margin: "0 auto",
                fontWeight: 400,
                maxWidth: 880,
              }}
            >
              Six things we&rsquo;ll never compromise on.
            </h2>
          </div>

          <div className="layout-3col">
            {VALUES.map((v, i) => (
              <div
                key={v.n}
                className="reveal-bounce"
                style={{ background: "var(--ink)", padding: 40, transitionDelay: `${i * 0.08}s` }}
              >
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--brass)",
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                  }}
                >
                  {v.n}
                </span>
                <h3
                  className="display"
                  style={{
                    fontSize: 26,
                    margin: "16px 0 12px",
                    fontWeight: 400,
                  }}
                >
                  {v.t}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {v.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "120px 0" }}>
        <div className="container">
          <div className="reveal-skew" style={{ marginBottom: 56 }}>
            <p className="eyebrow" style={{ marginBottom: 12 }}>
              The studio
            </p>
            <h2
              className="display"
              style={{
                fontSize: "clamp(40px, 5vw, 72px)",
                margin: 0,
                fontWeight: 400,
              }}
            >
              Every piece, personal.
            </h2>
          </div>

          <div className="layout-3col-team">
            {TEAM.map((m, i) => (
              <div key={i} className="reveal-flip" style={{ transitionDelay: `${i * 0.12}s` }}>
                <div
                  style={{
                    aspectRatio: "3/4",
                    borderRadius: "var(--r-lg)",
                    overflow: "hidden",
                    background: "var(--cream-2)",
                    marginBottom: 20,
                    position: "relative",
                  }}
                >
                  <Image
                    src={m.img}
                    alt={m.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    margin: "0 0 4px",
                    color: "var(--ink)",
                  }}
                >
                  {m.name}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--terracotta)",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    margin: "0 0 12px",
                  }}
                >
                  {m.role}
                </p>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--muted)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {m.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section
        style={{
          background: "var(--cream-2)",
          padding: "80px 0 100px",
          textAlign: "center",
        }}
      >
        <div className="container" style={{ maxWidth: 680 }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>
            Ready to start?
          </p>
          <h2
            className="display"
            style={{ fontSize: "clamp(40px, 5vw, 64px)", margin: "0 0 24px" }}
          >
            Something for{" "}
            <em
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                color: "var(--terracotta)",
              }}
            >
              someone you love.
            </em>
          </h2>
          <div
            style={{ display: "flex", gap: 12, justifyContent: "center" }}
          >
            <Link href="/shop" className="btn btn-primary">
              Shop all pieces <ArrowIcon size={14} />
            </Link>
            <Link href="/custom" className="btn btn-secondary">
              Start a commission
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
