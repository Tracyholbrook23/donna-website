// Stylized SVG placeholder for each product type.
// Used as fallback when no Wix product image is available,
// and as the live engraving preview canvas.

export type ProductType =
  | "tumbler"
  | "tumbler-tall"
  | "board"
  | "board-round"
  | "wallet"
  | "decanter"
  | "box"
  | "glass";

export interface EngravingPreview {
  text: string;
  fontCss: string;
  italic: boolean;
  weight: number;
  caps?: boolean;
  monogram?: boolean;
  size?: number;
}

interface ProductGlyphProps {
  type: ProductType;
  size?: number;
  color?: string;
  engraving?: EngravingPreview | null;
  bg?: string;
}

// Unique-enough id seed without crypto — avoids SSR/client mismatch
let _idCounter = 0;
function nextId() {
  return `pg-${++_idCounter}`;
}

export function ProductGlyph({
  type,
  size = 200,
  color = "var(--terracotta)",
  engraving = null,
}: ProductGlyphProps) {
  // Stable id per instance (won't re-render unless type changes)
  const id = nextId();

  const clipPath = getClipPath(type, id);
  const outline = getOutline(type);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      style={{ display: "block" }}
    >
      <defs>
        <clipPath id={`${id}-clip`}>{clipPath}</clipPath>
        <linearGradient id={`${id}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.92" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Body */}
      <g clipPath={`url(#${id}-clip)`}>
        <rect x="0" y="0" width="200" height="200" fill={`url(#${id}-grad)`} />
        {/* Highlight strip */}
        <rect x="0" y="0" width="40" height="200" fill="rgba(255,255,255,0.13)" />
        {/* Engraving zone */}
        {type !== "board" && type !== "board-round" && (
          <rect x="40" y="80" width="120" height="60" fill="rgba(0,0,0,0.06)" />
        )}
      </g>

      {/* Outline */}
      <g fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1.2">
        {outline}
      </g>

      {/* Live engraving text */}
      {engraving && engraving.text && (
        <text
          x="100"
          y={type === "board" || type === "board-round" ? 105 : 115}
          textAnchor="middle"
          fill="rgba(0,0,0,0.45)"
          className="engrave-text"
          style={{
            fontFamily: engraving.fontCss,
            fontSize: engraving.size ?? 16,
            fontStyle: engraving.italic ? "italic" : "normal",
            fontWeight: engraving.weight,
            letterSpacing: engraving.caps ? "0.12em" : "0",
          }}
        >
          {engraving.monogram
            ? (engraving.text.charAt(0) ?? "").toUpperCase()
            : engraving.caps
            ? engraving.text.toUpperCase()
            : engraving.text}
        </text>
      )}
    </svg>
  );
}

function getClipPath(type: ProductType, id: string) {
  switch (type) {
    case "tumbler":
      return <path d="M 70 30 L 130 30 L 134 60 L 140 170 Q 100 178 60 170 L 66 60 Z" />;
    case "tumbler-tall":
      return <path d="M 65 18 L 135 18 L 138 35 L 142 180 Q 100 188 58 180 L 62 35 Z" />;
    case "board":
      return <rect x="20" y="60" width="160" height="80" rx="6" />;
    case "board-round":
      return <circle cx="100" cy="100" r="78" />;
    case "wallet":
      return <rect x="30" y="50" width="140" height="100" rx="8" />;
    case "decanter":
      return <path d="M 85 28 L 115 28 L 112 70 L 145 140 Q 145 180 100 180 Q 55 180 55 140 L 88 70 Z" />;
    case "box":
      return <path d="M 30 70 L 170 70 L 170 165 L 30 165 Z M 30 70 L 30 50 L 170 50 L 170 70" />;
    case "glass":
      return <path d="M 75 30 L 125 30 L 130 60 L 140 140 Q 100 152 60 140 L 70 60 Z" />;
    default:
      return <rect x="40" y="40" width="120" height="120" rx="8" />;
  }
}

function getOutline(type: ProductType) {
  switch (type) {
    case "tumbler":
      return <path d="M 70 30 L 130 30 L 134 60 L 140 170 Q 100 178 60 170 L 66 60 Z" />;
    case "tumbler-tall":
      return <path d="M 65 18 L 135 18 L 138 35 L 142 180 Q 100 188 58 180 L 62 35 Z" />;
    case "board":
      return <rect x="20" y="60" width="160" height="80" rx="6" />;
    case "board-round":
      return <circle cx="100" cy="100" r="78" />;
    case "wallet":
      return <rect x="30" y="50" width="140" height="100" rx="8" />;
    case "decanter":
      return <path d="M 85 28 L 115 28 L 112 70 L 145 140 Q 145 180 100 180 Q 55 180 55 140 L 88 70 Z" />;
    case "box":
      return <path d="M 30 70 L 170 70 L 170 165 L 30 165 Z" />;
    case "glass":
      return <path d="M 75 30 L 125 30 L 130 60 L 140 140 Q 100 152 60 140 L 70 60 Z" />;
    default:
      return <rect x="40" y="40" width="120" height="120" rx="8" />;
  }
}
