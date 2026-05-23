"use client";

export function NewsletterForm() {
  return (
    <form
      style={{ alignSelf: "end" }}
      onSubmit={(e) => e.preventDefault()}
    >
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid var(--cream)",
          paddingBottom: 8,
        }}
      >
        <input
          type="email"
          placeholder="your@email.com"
          required
          style={{
            flex: 1,
            background: "transparent",
            border: 0,
            outline: 0,
            color: "var(--cream)",
            fontSize: 18,
            fontFamily: "var(--font-body)",
          }}
        />
        <button
          type="submit"
          style={{
            background: "transparent",
            border: 0,
            color: "var(--cream)",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Subscribe →
        </button>
      </div>
      <p
        style={{
          fontSize: 11,
          color: "rgba(255,255,255,0.4)",
          marginTop: 10,
        }}
      >
        By subscribing you agree to occasional emails. Unsubscribe anytime.
      </p>
    </form>
  );
}
