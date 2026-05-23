import { announcementMessages } from "@/lib/data";

export function AnnouncementBar() {
  const messages = announcementMessages;
  // Triple the array so the marquee never shows a gap
  const repeated = [...messages, ...messages, ...messages];

  return (
    <div
      style={{
        background: "var(--ink)",
        color: "var(--cream)",
        fontSize: 12,
        letterSpacing: "0.04em",
        padding: "10px 0",
        overflow: "hidden",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="marquee-track">
        {repeated.map((m, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 64,
            }}
          >
            {m}
            <span style={{ opacity: 0.4 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
