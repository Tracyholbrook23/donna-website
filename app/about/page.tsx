import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";

const VALUES = [
  {
    n: "01",
    t: "The maker matters.",
    d: "Every piece is engraved by Donna, Maya, or Renee. Their initials live on the bottom — you know who made yours.",
  },
  {
    n: "02",
    t: "Slow is the speed.",
    d: "We cap how many orders we take each week so each one gets full attention. Sometimes that means waitlists. Sometimes that means saying no.",
  },
  {
    n: "03",
    t: "The community owns this.",
    d: "A portion of every order funds engraver apprenticeships for Black women — three new makers trained so far.",
  },
  {
    n: "04",
    t: "Local before global.",
    d: "Walnut from the Carolinas, leather from Tennessee, glass from Pennsylvania, packaging from a recycler in Atlanta. Small chains, on purpose.",
  },
  {
    n: "05",
    t: "Honest pricing.",
    d: "No fake sales, no urgency timers. Materials cost what they cost. Our time is worth what it's worth. The price you see is the price.",
  },
  {
    n: "06",
    t: "Heirloom over hype.",
    d: "We'd rather make one thing you keep for thirty years than ten things you replace in three.",
  },
];

const TEAM = [
  {
    name: "Donna Whitfield",
    role: "Founder · lead engraver · custom commissions",
    bio: "Started the studio in 2020. Trained on a borrowed engraver in her sister's garage. Now runs intake, design, and every custom commission. Charlotte, NC.",
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=80",
  },
  {
    name: "Maya Chen",
    role: "Production engraver · tumblers & drinkware",
    bio: "Joined in 2022 after Donna trained her through the studio's first apprenticeship. Specializes in drinkware and small-batch corporate runs.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
  },
  {
    name: "Renee Thomas",
    role: "Production engraver · boards & keepsakes",
    bio: "Studio's second apprentice, now two years in. Renee handles boards, boxes, and all the big pieces. Her walnut work is hard to beat.",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",
  },
];

export default function AboutPage() {
  return (
    <main className="page-enter">
      {/* Hero */}
      <section style={{ padding: "60px 0 0" }}>
        <div className="container">
          <div
            className="reveal"
            style={{ textAlign: "center", maxWidth: 980, margin: "0 auto" }}
          >
            <p className="eyebrow" style={{ marginBottom: 16 }}>
              About Donna &amp; Co.
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
              A studio built by{" "}
              <em
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  color: "var(--terracotta)",
                }}
              >
                one woman
              </em>
              ,
              <br />
              for the people you love.
            </h1>
          </div>

          <div className="reveal" style={{ marginTop: 64 }}>
            <div
              style={{
                width: "100%",
                aspectRatio: "21/9",
                borderRadius: "var(--r-xl)",
                overflow: "hidden",
                background: "var(--cream-2)",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1521498542256-5aeb47ba2b36?w=1400&q=80"
                alt="Donna in the studio"
                width={1400}
                height={600}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* The letter */}
      <section style={{ padding: "80px 0 100px" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.3fr",
              gap: 80,
              alignItems: "start",
            }}
          >
            <div className="reveal" style={{ position: "sticky", top: 100 }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>
                A letter from Donna
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
                — Donna Whitfield, founder &amp; engraver
              </p>

              <div
                style={{ marginTop: 32, borderTop: "1px solid var(--line)" }}
              >
                {[
                  { label: "Year founded", value: "2020" },
                  { label: "Pieces engraved", value: "14,200+" },
                  { label: "Studio", value: "Charlotte, NC" },
                  { label: "5-star reviews", value: "1,840+" },
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

            <div className="reveal">
              <div
                style={{
                  fontSize: 19,
                  lineHeight: 1.8,
                  color: "var(--ink-soft)",
                }}
              >
                <p style={{ marginTop: 0 }}>
                  The first piece I ever engraved was a walnut box for my baby
                  sister Jasmine&rsquo;s high school graduation. I bought a
                  small laser engraver off a Black-woman maker in Atlanta,
                  watched her run through three boards with me on a Saturday,
                  and brought it home that night.
                </p>
                <p>
                  I burned three boards in two weeks figuring out feed rates.
                  The fourth one was the box. It said{" "}
                  <em style={{ color: "var(--terracotta)" }}>
                    Jasmine · May 2020
                  </em>{" "}
                  and on the underside I etched a single line my grandmother
                  used to say to us before bed.
                </p>
                <p>
                  She still has it. So do the next forty people who saw it on
                  Instagram and asked me to make them one too.
                </p>
                <p>
                  <strong style={{ color: "var(--ink)", fontWeight: 600 }}>
                    Donna &amp; Co. exists for a simple reason:
                  </strong>{" "}
                  a gift with your name on it is different. A gift made by a
                  person who knows what your mom calls you, what your
                  grandfather used to drive, what your wedding date is, the
                  lyrics of the song you danced to — that gift outlasts the
                  holiday it was given for.
                </p>
                <p>
                  The studio is bigger now. Two engravers I trained personally
                  — Maya and Renee — work alongside me. We ship pieces to all
                  50 states and ten countries. Some weeks we engrave eighty
                  pieces, some weeks we engrave eight. Every single one of them
                  passes through my hands or theirs.
                </p>
                <p>
                  I&rsquo;m a Black woman who built something for the people I
                  came from and the people I&rsquo;ve met since. I am proud of
                  every piece that leaves the studio.
                </p>
                <p>I hope your gift is here for a long time.</p>
                <p
                  className="display-italic"
                  style={{
                    fontSize: 40,
                    color: "var(--ink)",
                    margin: "32px 0 0",
                    lineHeight: 1,
                  }}
                >
                  — Donna
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

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 1,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {VALUES.map((v) => (
              <div
                key={v.n}
                className="reveal"
                style={{ background: "var(--ink)", padding: 40 }}
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
          <div className="reveal" style={{ marginBottom: 56 }}>
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
              Three women, one bench, every piece.
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 32,
            }}
          >
            {TEAM.map((m) => (
              <div key={m.name} className="reveal">
                <div
                  style={{
                    aspectRatio: "3/4",
                    borderRadius: "var(--r-lg)",
                    overflow: "hidden",
                    background: "var(--cream-2)",
                    marginBottom: 20,
                  }}
                >
                  <Image
                    src={m.img}
                    alt={m.name}
                    width={600}
                    height={800}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
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
