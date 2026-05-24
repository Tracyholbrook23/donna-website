import Link from "next/link";
import { policies, faqs } from "@/lib/data";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ tab: string }>;
}

const ALL_TABS = [
  ...policies.map((p) => ({ id: p.id, label: p.title })),
  { id: "faq", label: "FAQ" },
];

export default async function PoliciesPage({ params }: PageProps) {
  const { tab } = await params;

  const validTabs = ALL_TABS.map((t) => t.id);
  if (!validTabs.includes(tab)) notFound();

  return (
    <main className="page-enter">
      {/* Header */}
      <section style={{ padding: "80px 0 0" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <p className="eyebrow" style={{ marginBottom: 12 }}>
            Policies &amp; Help
          </p>
          <h1
            className="display"
            style={{
              fontSize: "clamp(48px, 6vw, 80px)",
              margin: "0 0 16px",
              fontWeight: 400,
            }}
          >
            The{" "}
            <em
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                color: "var(--terracotta)",
              }}
            >
              honest
            </em>{" "}
            version.
          </h1>
          <p
            style={{
              fontSize: 17,
              color: "var(--muted)",
              lineHeight: 1.6,
              maxWidth: 540,
            }}
          >
            Everything you need to know — no legalese, no surprises.
          </p>

          {/* Tab navigation */}
          <div
            style={{
              display: "flex",
              gap: 8,
              marginTop: 40,
              borderBottom: "1px solid var(--line)",
              paddingBottom: 0,
              overflowX: "auto",
              scrollbarWidth: "none",
            }}
          >
            {ALL_TABS.map((t) => (
              <Link
                key={t.id}
                href={`/policies/${t.id}`}
                style={{
                  padding: "12px 20px",
                  fontSize: 14,
                  fontWeight: 500,
                  color: t.id === tab ? "var(--ink)" : "var(--muted)",
                  textDecoration: "none",
                  borderBottom: `2px solid ${
                    t.id === tab ? "var(--ink)" : "transparent"
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
          {tab === "faq" ? (
            <FaqContent />
          ) : (
            <PolicyContent tab={tab} />
          )}
        </div>
      </section>

      {/* Help CTA strip */}
      <section
        style={{
          background: "var(--cream-2)",
          padding: "60px 0",
        }}
      >
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
              <p
                className="eyebrow"
                style={{ marginBottom: 8 }}
              >
                Still have questions?
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

function PolicyContent({ tab }: { tab: string }) {
  const policy = policies.find((p) => p.id === tab);
  if (!policy) return null;

  return (
    <div className="layout-policy">
      {/* Sidebar */}
      <div style={{ position: "sticky", top: 100, alignSelf: "start" }}>
        <h2
          className="display"
          style={{ fontSize: 36, margin: "0 0 12px", fontWeight: 400 }}
        >
          {policy.title}
        </h2>
        <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
          {policy.intro}
        </p>

        <div
          style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 6 }}
        >
          {policy.sections.map((s) => (
            <a
              key={s.h}
              href={`#${s.h.toLowerCase().replace(/\s+/g, "-")}`}
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
        {policy.sections.map((s, i) => (
          <div
            key={s.h}
            id={s.h.toLowerCase().replace(/\s+/g, "-")}
            style={{
              paddingTop: i === 0 ? 0 : 48,
              paddingBottom: 48,
              borderBottom:
                i < policy.sections.length - 1
                  ? "1px solid var(--line-soft)"
                  : "none",
            }}
          >
            <h3
              className="serif"
              style={{ fontSize: 22, margin: "0 0 16px", color: "var(--ink)" }}
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
  );
}

function FaqContent() {
  return (
    <div className="layout-policy">
      <div style={{ position: "sticky", top: 100, alignSelf: "start" }}>
        <h2
          className="display"
          style={{ fontSize: 36, margin: "0 0 12px", fontWeight: 400 }}
        >
          FAQ
        </h2>
        <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
          Quick answers to the questions we hear most.
        </p>
      </div>

      <div>
        {faqs.map((f, i) => (
          <FaqRow key={i} q={f.q} a={f.a} isLast={i === faqs.length - 1} />
        ))}
      </div>
    </div>
  );
}

function FaqRow({
  q,
  a,
  isLast,
}: {
  q: string;
  a: string;
  isLast: boolean;
}) {
  // Server-rendered accordion — static expanded for now
  // (For interactive accordion, wrap FaqContent in a client component)
  return (
    <div
      style={{
        borderTop: "1px solid var(--line)",
        borderBottom: isLast ? "1px solid var(--line)" : "none",
        padding: "28px 0",
      }}
    >
      <h3
        className="serif"
        style={{
          fontSize: 19,
          margin: "0 0 14px",
          color: "var(--ink)",
          fontWeight: 500,
        }}
      >
        {q}
      </h3>
      <p
        style={{
          fontSize: 15,
          color: "var(--ink-soft)",
          lineHeight: 1.75,
          margin: 0,
          maxWidth: 640,
        }}
      >
        {a}
      </p>
    </div>
  );
}
