"use client";

import { useState, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";

// ── Constants ─────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "tumblers",      emoji: "🥤", label: "Tumblers & Drinkware",   desc: "Powder-coated, stainless, sublimation" },
  { id: "cutting-boards",emoji: "🍳", label: "Cutting Boards",          desc: "Walnut, bamboo, maple" },
  { id: "kitchen",       emoji: "🍷", label: "Kitchen & Bar",           desc: "Decanters, gourmet knife sets, barware" },
  { id: "bbq",           emoji: "🔥", label: "BBQ & Grill",             desc: "Grilling tools, outdoor gifts" },
  { id: "knives",        emoji: "🔪", label: "Pocket Knives",           desc: "Engraved everyday carry" },
  { id: "wood-boxes",    emoji: "📦", label: "Wood Boxes",              desc: "Keepsake boxes, memory boxes" },
  { id: "jewelry",       emoji: "📿", label: "Wood Jewelry",            desc: "Pendants, earrings, custom shapes" },
  { id: "pens",          emoji: "✒️",  label: "Pens & Pencils",          desc: "Engraved writing instruments" },
  { id: "corporate",     emoji: "💼", label: "Corporate / Business",    desc: "Bulk branded gifts, logo engraving" },
  { id: "wedding",       emoji: "💍", label: "Wedding & Events",        desc: "Party sets, favors, anniversary" },
  { id: "gifts",         emoji: "🎁", label: "Gifts & Keepsakes",       desc: "Laserette, acrylic, one-offs" },
  { id: "other",         emoji: "✦",  label: "Something Else",          desc: "Describe it — we'll figure it out" },
] as const;

// Maps product name keywords → category id
const CATEGORY_KEYWORDS: { keywords: string[]; id: string }[] = [
  { id: "tumblers",       keywords: ["tumbler", "oz", "cooler", "shaker", "cup", "mug", "stainless", "sublimation", "powder coated", "drinkware", "bottle", "flask", "can cooler"] },
  { id: "cutting-boards", keywords: ["board", "cutting", "charcuterie", "serving", "butcher"] },
  { id: "kitchen",        keywords: ["decanter", "knife set", "gourmet", "barware", "wine", "whiskey", "cocktail", "bar set"] },
  { id: "bbq",            keywords: ["bbq", "grill", "grilling", "smoker", "outdoor"] },
  { id: "knives",         keywords: ["pocket knife", "pocket knives", "blade", "switchblade", "folding knife"] },
  { id: "wood-boxes",     keywords: ["box", "chest", "valet", "keepsake box", "memory box", "crate"] },
  { id: "jewelry",        keywords: ["pendant", "earring", "necklace", "bracelet", "jewelry", "jewellery"] },
  { id: "pens",           keywords: ["pen", "pencil", "stylus", "writing"] },
  { id: "corporate",      keywords: ["corporate", "business", "bulk", "logo", "branded", "company"] },
  { id: "wedding",        keywords: ["wedding", "anniversary", "favor", "bridal", "engagement", "bride", "groom"] },
  { id: "gifts",          keywords: ["laserette", "acrylic", "blank", "keychain", "ornament"] },
];

function guessCategoryFromName(name: string): string {
  const lower = name.toLowerCase();
  for (const { id, keywords } of CATEGORY_KEYWORDS) {
    if (keywords.some((kw) => lower.includes(kw))) return id;
  }
  return "";
}

const BUDGETS = [
  { value: "",         label: "Select a range" },
  { value: "under-50", label: "Under $50" },
  { value: "50-100",   label: "$50 – $100" },
  { value: "100-300",  label: "$100 – $300" },
  { value: "300-600",  label: "$300 – $600" },
  { value: "600-1500", label: "$600 – $1,500" },
  { value: "1500+",    label: "$1,500+" },
  { value: "flexible", label: "Flexible / open" },
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_FILES = 8;
const ACCEPT_ATTR = ".jpg,.jpeg,.png,.gif,.webp,.svg,.pdf,.heic,.ai,.eps";

// ── Types ─────────────────────────────────────────────────────────────────────

interface FormValues {
  category: string;
  description: string;
  quantity: string;
  budget: string;
  deadline: string;
  name: string;
  email: string;
  phone: string;
  contactPref: string;
}

interface FilePreview {
  url: string;
  name: string;
  size: string;
  isImage: boolean;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(0)} KB`;
  return `${(b / (1024 * 1024)).toFixed(1)} MB`;
}

// ── Shared micro-components ───────────────────────────────────────────────────

function FieldLabel({ text, required }: { text: string; required?: boolean }) {
  return (
    <label style={{
      display: "block",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "var(--ink)",
      marginBottom: 8,
    }}>
      {text}
      {required && <span style={{ color: "var(--terracotta)", marginLeft: 3 }}>*</span>}
    </label>
  );
}

const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  border: "1.5px solid var(--line)",
  borderRadius: "var(--r-sm)",
  background: "var(--cream)",
  color: "var(--ink)",
  fontSize: 15,
  fontFamily: "var(--font-body)",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color .15s",
};

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} style={{
      padding: "13px 18px",
      border: "1.5px solid var(--line)",
      borderRadius: "var(--r-pill)",
      background: "transparent",
      cursor: "pointer",
      fontSize: 18,
      color: "var(--ink)",
      lineHeight: 1,
      transition: "border-color .15s",
      flexShrink: 0,
    }}>←</button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function CustomInquiryForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const piece = searchParams.get("piece") ?? "";
  const guessedCategory = piece ? guessCategoryFromName(piece) : "";
  const [activePiece, setActivePiece] = useState(piece);

  const dismissPiece = () => {
    setActivePiece("");
    setForm((p) => ({ ...p, category: "", description: "" }));
    router.replace("/custom", { scroll: false });
  };

  const [step, setStep]           = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles]         = useState<File[]>([]);
  const [previews, setPreviews]   = useState<FilePreview[]>([]);
  const fileInputRef              = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormValues>({
    category: guessedCategory,
    description: piece ? `I'm interested in the ${piece}. ` : "",
    quantity: "1",
    budget: "",
    deadline: "",
    name: "",
    email: "",
    phone: "",
    contactPref: "email",
  });

  const set = (k: keyof FormValues, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  // ── File handling ───────────────────────────────────────────────────────────

  const addFiles = useCallback((incoming: FileList | File[]) => {
    const arr = Array.from(incoming);
    const toAdd: File[] = [];

    for (const f of arr) {
      if (files.length + toAdd.length >= MAX_FILES) break;
      if (f.size > MAX_FILE_SIZE) continue;
      if (files.some((ex) => ex.name === f.name && ex.size === f.size)) continue;
      toAdd.push(f);
    }

    if (!toAdd.length) return;
    setFiles((p) => [...p, ...toAdd]);

    toAdd.forEach((f) => {
      const isImage = f.type.startsWith("image/");
      if (isImage) {
        const reader = new FileReader();
        reader.onload = (e) =>
          setPreviews((p) => [...p, { url: e.target?.result as string, name: f.name, size: formatBytes(f.size), isImage: true }]);
        reader.readAsDataURL(f);
      } else {
        setPreviews((p) => [...p, { url: "", name: f.name, size: formatBytes(f.size), isImage: false }]);
      }
    });
  }, [files]);

  const removeFile = (idx: number) => {
    setFiles((p) => p.filter((_, i) => i !== idx));
    setPreviews((p) => p.filter((_, i) => i !== idx));
  };

  // ── Drag-and-drop ───────────────────────────────────────────────────────────

  const onDragOver  = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);
  const onDrop      = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); addFiles(e.dataTransfer.files); };

  // ── Submit ──────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    const fd = new FormData();
    (Object.entries(form) as [string, string][]).forEach(([k, v]) => fd.append(k, v));
    files.forEach((f) => fd.append("files", f));

    try {
      const res = await fetch("/api/custom-inquiry", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      document.getElementById("inquiry-form-anchor")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setSubmitError("Something went wrong. Try again or DM us on Instagram.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success state ───────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "56px 24px" }}>
        {/* Animated checkmark ring */}
        <div style={{
          width: 80, height: 80,
          borderRadius: "50%",
          background: "var(--forest)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 28px",
          boxShadow: "0 0 0 12px rgba(61,88,72,0.12)",
        }}>
          <svg width={36} height={36} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20,6 9,17 4,12" />
          </svg>
        </div>

        <p className="eyebrow" style={{ marginBottom: 12 }}>Brief received ✦</p>
        <h3 className="display" style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 400, margin: "0 0 16px" }}>
          Your idea is in{" "}
          <em style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--terracotta)" }}>good hands.</em>
        </h3>
        <p style={{ fontSize: 16, color: "var(--muted)", maxWidth: 440, margin: "0 auto 12px", lineHeight: 1.65 }}>
          Donna will review your vision and reach out within 24 hours — usually faster. Once you connect,
          she&rsquo;ll send a personalized quote and next steps.
        </p>
        <p style={{ fontSize: 13, color: "var(--muted-soft)", maxWidth: 380, margin: "0 auto 40px", lineHeight: 1.6 }}>
          In the meantime, check out our custom order policy for info on timelines,
          revisions, and the $20 design fee.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/policies/custom" className="btn btn-outline">
            Custom order policy
          </Link>
          <Link href="/" className="btn btn-primary">
            Back to home <ArrowIcon size={13} />
          </Link>
        </div>
      </div>
    );
  }

  // ── Step progress ───────────────────────────────────────────────────────────

  const STEP_LABELS = ["What we&rsquo;re making", "Your vision", "About you"];

  return (
    <div id="inquiry-form-anchor">
      {/* Pre-filled product badge */}
      {activePiece && (
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "var(--forest)",
          color: "#fff",
          borderRadius: "var(--r-pill)",
          padding: "8px 16px",
          fontSize: 13,
          fontWeight: 600,
          marginBottom: 28,
        }}>
          <span style={{ color: "var(--terracotta)", fontSize: 10 }}>✦</span>
          Requesting: {activePiece}
          <button
            type="button"
            onClick={dismissPiece}
            aria-label="Remove selected item"
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: "50%",
              width: 18,
              height: 18,
              cursor: "pointer",
              color: "#fff",
              fontSize: 12,
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              marginLeft: 2,
            }}
          >×</button>
        </div>
      )}

      {/* Progress bar */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
          {[1, 2, 3].map((s) => (
            <div key={s} style={{
              flex: 1, height: 3, borderRadius: 2,
              background: s <= step ? "var(--ink)" : "var(--cream-3)",
              transition: "background .4s",
            }} />
          ))}
        </div>
        <p style={{ fontSize: 12, color: "var(--muted)", letterSpacing: "0.06em" }}>
          Step {step} of 3 &nbsp;·&nbsp; <span dangerouslySetInnerHTML={{ __html: STEP_LABELS[step - 1] }} />
        </p>
      </div>

      {/* ── Step 1: Category ─────────────────────────────────────────────── */}
      {step === 1 && (
        <div>
          <h3 className="serif" style={{ fontSize: 26, margin: "0 0 6px" }}>
            What are we making?
          </h3>
          <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 28, lineHeight: 1.5 }}>
            Choose the product category that fits your idea best. You can always add more detail in the next step.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginBottom: 32,
          }}>
            {CATEGORIES.map((cat) => {
              const sel = form.category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => set("category", cat.id)}
                  style={{
                    textAlign: "left",
                    padding: "16px 14px",
                    borderRadius: "var(--r-md)",
                    border: `1.5px solid ${sel ? "var(--terracotta)" : "var(--line)"}`,
                    background: sel ? "rgba(185,83,58,0.06)" : "transparent",
                    cursor: "pointer",
                    transition: "all .18s",
                    outline: "none",
                  }}
                >
                  <div style={{ fontSize: 22, marginBottom: 6, lineHeight: 1 }}>{cat.emoji}</div>
                  <p style={{ fontSize: 13, fontWeight: 600, margin: "0 0 3px", color: sel ? "var(--terracotta)" : "var(--ink)" }}>
                    {cat.label}
                  </p>
                  <p style={{ fontSize: 11, color: "var(--muted)", margin: 0, lineHeight: 1.4 }}>
                    {cat.desc}
                  </p>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setStep(2)}
            disabled={!form.category}
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center", opacity: form.category ? 1 : 0.38 }}
          >
            Continue <ArrowIcon size={14} />
          </button>
        </div>
      )}

      {/* ── Step 2: Vision + files ────────────────────────────────────────── */}
      {step === 2 && (
        <div>
          <h3 className="serif" style={{ fontSize: 26, margin: "0 0 6px" }}>
            Tell me your vision.
          </h3>
          <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 28, lineHeight: 1.5 }}>
            The more detail, the better — but a rough idea is all you need. Donna will fill in the rest.
          </p>

          {/* Description */}
          <div style={{ marginBottom: 22 }}>
            <FieldLabel text="Describe what you're envisioning" required />
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder={"Who is this for? What should it say or show?\nWhat material, size, or style do you have in mind?\nAny specific words, dates, artwork, or logo?\n\nRough ideas are totally fine — we'll work through the details together."}
              rows={6}
              required
              style={{ ...inputBase, resize: "vertical", minHeight: 140 }}
            />
          </div>

          {/* File upload zone */}
          <div style={{ marginBottom: 22 }}>
            <FieldLabel text="Upload inspiration, logos, or reference files" />
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: `2px dashed ${isDragging ? "var(--terracotta)" : "var(--line)"}`,
                borderRadius: "var(--r-md)",
                background: isDragging ? "rgba(185,83,58,0.05)" : "var(--cream-2)",
                padding: "32px 24px",
                textAlign: "center",
                cursor: "pointer",
                transition: "all .2s",
                userSelect: "none",
              }}
            >
              {/* Upload icon */}
              <div style={{
                width: 44, height: 44,
                borderRadius: "50%",
                background: isDragging ? "var(--terracotta)" : "var(--cream-3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 14px",
                transition: "background .2s",
              }}>
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none"
                  stroke={isDragging ? "#fff" : "var(--ink)"} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16,16 12,12 8,16" />
                  <line x1="12" y1="12" x2="12" y2="21" />
                  <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
                </svg>
              </div>

              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", margin: "0 0 6px" }}>
                {isDragging ? "Drop files here" : "Drag files here, or click to browse"}
              </p>
              <p style={{ fontSize: 12, color: "var(--muted)", margin: 0 }}>
                JPG · PNG · PDF · SVG · AI &nbsp;·&nbsp; Up to 10 MB each, {MAX_FILES} files max
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={ACCEPT_ATTR}
              style={{ display: "none" }}
              onChange={(e) => e.target.files && addFiles(e.target.files)}
            />

            {/* File previews */}
            {previews.length > 0 && (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
                gap: 8,
                marginTop: 12,
              }}>
                {previews.map((p, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    <div style={{
                      borderRadius: "var(--r-sm)",
                      overflow: "hidden",
                      background: "var(--cream-3)",
                      aspectRatio: "1",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid var(--line)",
                    }}>
                      {p.isImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.url} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <>
                          <span style={{ fontSize: 22, marginBottom: 4 }}>📄</span>
                          <span style={{
                            fontSize: 9, color: "var(--muted)", textAlign: "center",
                            padding: "0 6px", wordBreak: "break-all", lineHeight: 1.3
                          }}>
                            {p.name.length > 16 ? p.name.slice(0, 13) + "…" : p.name}
                          </span>
                        </>
                      )}
                    </div>
                    {/* Size label */}
                    <p style={{ fontSize: 9, color: "var(--muted-soft)", margin: "3px 0 0", textAlign: "center" }}>
                      {p.size}
                    </p>
                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                      style={{
                        position: "absolute", top: 3, right: 3,
                        width: 18, height: 18,
                        borderRadius: "50%",
                        background: "var(--ink)",
                        border: "none",
                        cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff",
                        fontSize: 10,
                        lineHeight: 1,
                        padding: 0,
                      }}
                      aria-label={`Remove ${p.name}`}
                    >×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Optional fields row */}
          <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr", gap: 12, marginBottom: 22 }}>
            <div>
              <FieldLabel text="Qty" />
              <input
                type="number"
                min={1}
                value={form.quantity}
                onChange={(e) => set("quantity", e.target.value)}
                style={{ ...inputBase, textAlign: "center" }}
              />
            </div>
            <div>
              <FieldLabel text="Budget range" />
              <select
                value={form.budget}
                onChange={(e) => set("budget", e.target.value)}
                style={{ ...inputBase, appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%231F1410' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: 36 }}
              >
                {BUDGETS.map((b) => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel text="Ideal date" />
              <input
                type="date"
                value={form.deadline}
                onChange={(e) => set("deadline", e.target.value)}
                style={inputBase}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <BackBtn onClick={() => setStep(1)} />
            <button
              type="button"
              onClick={() => setStep(3)}
              disabled={!form.description.trim()}
              className="btn btn-primary"
              style={{ flex: 1, justifyContent: "center", opacity: form.description.trim() ? 1 : 0.38 }}
            >
              Continue <ArrowIcon size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Contact ───────────────────────────────────────────────── */}
      {step === 3 && (
        <form onSubmit={handleSubmit}>
          <h3 className="serif" style={{ fontSize: 26, margin: "0 0 6px" }}>
            How should Donna reach you?
          </h3>
          <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 28, lineHeight: 1.5 }}>
            Last step. She&rsquo;ll use this to send your quote and discuss your project.
          </p>

          {/* Name */}
          <div style={{ marginBottom: 18 }}>
            <FieldLabel text="Full name" required />
            <input
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="First and last name"
              required
              style={inputBase}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: 18 }}>
            <FieldLabel text="Email address" required />
            <input
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="you@example.com"
              required
              style={inputBase}
            />
          </div>

          {/* Phone */}
          <div style={{ marginBottom: 18 }}>
            <FieldLabel text="Phone number" />
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+1 (555) 000-0000"
              style={inputBase}
            />
          </div>

          {/* Contact preference */}
          <div style={{ marginBottom: 28 }}>
            <FieldLabel text="Preferred contact method" />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {(["email", "phone", "either"] as const).map((opt) => {
                const sel = form.contactPref === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => set("contactPref", opt)}
                    style={{
                      padding: "9px 18px",
                      borderRadius: "var(--r-pill)",
                      border: `1.5px solid ${sel ? "var(--ink)" : "var(--line)"}`,
                      background: sel ? "var(--ink)" : "transparent",
                      color: sel ? "#fff" : "var(--ink)",
                      fontSize: 13,
                      fontWeight: sel ? 600 : 400,
                      cursor: "pointer",
                      textTransform: "capitalize",
                      transition: "all .18s",
                      outline: "none",
                    }}
                  >
                    {opt === "either" ? "Either works" : opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* $20 fee reminder */}
          <div style={{
            background: "rgba(185,83,58,0.07)",
            border: "1.5px solid rgba(185,83,58,0.22)",
            borderRadius: "var(--r-md)",
            padding: "16px 20px",
            marginBottom: 24,
            display: "flex",
            gap: 14,
            alignItems: "flex-start",
          }}>
            <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>✦</span>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, margin: "0 0 4px", color: "var(--terracotta)" }}>
                About the $20 design fee
              </p>
              <p style={{ fontSize: 12, color: "var(--ink)", margin: 0, lineHeight: 1.6, opacity: 0.8 }}>
                After Donna reviews your brief, she&rsquo;ll send a quote. A $20 non-refundable initiation fee is
                collected before design work begins — it&rsquo;s credited toward your final total when
                the piece is completed.
              </p>
            </div>
          </div>

          {/* Privacy note */}
          <p style={{ fontSize: 11, color: "var(--muted-soft)", marginBottom: 20, lineHeight: 1.6 }}>
            Your information is used only to respond to your inquiry. No spam, no lists, no sharing.
          </p>

          {/* Error */}
          {submitError && (
            <p style={{
              fontSize: 13, color: "var(--terracotta)",
              background: "rgba(185,83,58,0.08)",
              border: "1px solid rgba(185,83,58,0.2)",
              borderRadius: "var(--r-sm)",
              padding: "12px 16px",
              marginBottom: 16,
            }}>
              {submitError}
            </p>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            <BackBtn onClick={() => setStep(2)} />
            <button
              type="submit"
              disabled={submitting || !form.name.trim() || !form.email.trim()}
              className="btn btn-primary"
              style={{
                flex: 1, justifyContent: "center",
                opacity: submitting || !form.name.trim() || !form.email.trim() ? 0.45 : 1,
                gap: 10,
              }}
            >
              {submitting ? (
                <>
                  <span style={{
                    display: "inline-block",
                    width: 14, height: 14,
                    border: "2px solid rgba(255,255,255,0.4)",
                    borderTopColor: "#fff",
                    borderRadius: "50%",
                    animation: "spin 0.7s linear infinite",
                  }} />
                  Sending…
                </>
              ) : (
                <>Send my brief <ArrowIcon size={14} /></>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Spin keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
