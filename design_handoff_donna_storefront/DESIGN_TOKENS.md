# Design Tokens

All tokens are defined in `prototype/src/tokens.css`. Port these into `app/globals.css` using Tailwind v4's `@theme inline`.

---

## Colors

| Token | Hex | Usage |
|---|---|---|
| `--ink` | `#1F1410` | Primary text, dark backgrounds, primary button bg |
| `--ink-soft` | `#3A2A21` | Secondary text on cream |
| `--cream` | `#FBF5EC` | Page background, primary "paper" |
| `--cream-2` | `#F4EBDB` | Section accent backgrounds |
| `--cream-3` | `#ECDFC8` | Cards on cream, tertiary background |
| `--terracotta` | `#B9533A` | **Brand primary** — accents, links, CTAs, italic emphasis |
| `--terracotta-deep` | `#8E3A26` | Button hover state |
| `--terracotta-soft` | `#D9836A` | Light accent |
| `--clay` | `#E3A992` | Light terracotta tint |
| `--blush` | `#F1D7C8` | Soft warm category card background |
| `--brass` | `#B58A4F` | Gold engraving accent, rating stars, eyebrows on dark |
| `--brass-light` | `#D4B27A` | Brass hover/lighter variant |
| `--forest` | `#3D5848` | "Available", "in stock" accents, occasional category card |
| `--forest-soft` | `#6F8773` | Forest light variant |
| `--muted` | `rgba(31, 20, 16, 0.55)` | Secondary text |
| `--muted-soft` | `rgba(31, 20, 16, 0.36)` | Tertiary text |
| `--line` | `rgba(31, 20, 16, 0.10)` | Borders, dividers |
| `--line-soft` | `rgba(31, 20, 16, 0.06)` | Faint dividers |

### Tailwind setup
In `app/globals.css`:

```css
@import "tailwindcss";

:root {
  --ink: #1F1410;
  --cream: #FBF5EC;
  --terracotta: #B9533A;
  /* ...all tokens... */
}

@theme inline {
  --color-ink: var(--ink);
  --color-cream: var(--cream);
  --color-terracotta: var(--terracotta);
  --color-brass: var(--brass);
  --color-forest: var(--forest);
  /* ...etc... */
  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
}

body {
  background: var(--cream);
  color: var(--ink);
  font-family: var(--font-body);
}
```

Then use `bg-cream`, `text-terracotta`, `font-display`, etc. in components.

---

## Typography

### Fonts
- **Display:** Fraunces (Google Fonts, variable, `opsz 9..144`, `wght 300..700`, ital). Used for headlines and italic emphasis.
- **Body:** Inter (Google Fonts, `wght 300..800`). Used for body, UI, buttons.

### Loading
```ts
// app/layout.tsx
import { Fraunces, Inter } from "next/font/google";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
});
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

<html className={`${fraunces.variable} ${inter.variable}`}>
```

### Type scale (used in the prototype)

| Class | Size (desktop) | Weight | Line height | Letter spacing | Usage |
|---|---|---|---|---|---|
| `.display` | clamp(56px, 8vw, 132px) | 400 | 0.98 | -0.022em | Page-defining headlines (hero) |
| `.display` (medium) | clamp(40px, 5.5vw, 76px) | 400 | 0.98 | -0.022em | Section titles |
| `.display` (small) | clamp(32px, 4vw, 48px) | 400 | 1.0 | -0.022em | Block titles |
| `.display-italic` | varies | 400 italic | 1.0 | -0.018em | Emphasized words (e.g., "*mean something*") |
| `.serif` | 17–24px | 500 | 1.4 | -0.012em | Card titles, mid-weight headlines |
| body | 16px | 400 | 1.5 | 0 | Paragraphs |
| `.eyebrow` | 11px | 600 | 1.4 | 0.18em | Section labels, "Volume 04", "By commission" |

The display uses Fraunces with `font-variation-settings: "opsz" 144, "SOFT" 50` — important; without it the type loses its sparkle at large sizes.

### Emphasis pattern
Headlines mix roman + italic for emotional rhythm:

```jsx
<h1 className="display">
  Gifts that <em className="italic text-terracotta">mean something.</em>
</h1>
```

The italic-terracotta word is the single visual signature of this brand. Use it sparingly — once per major headline.

---

## Spacing

The prototype uses these container/section rhythms:

| Token | Value | Usage |
|---|---|---|
| Container max-width | 1320px | Main content width |
| Container padding | 28px (20px on mobile) | Horizontal gutter |
| Section padding (large) | 120–140px top/bottom | Major sections |
| Section padding (medium) | 80–100px | Secondary sections |
| Section padding (small) | 40–60px | Compact sections |
| Card padding | 18–28px | Product cards, content cards |

---

## Radii

| Token | Value | Usage |
|---|---|---|
| `--r-xs` | 6px | Tags, chips |
| `--r-sm` | 10px | Inputs, small cards |
| `--r-md` | 16px | Product cards, content cards |
| `--r-lg` | 24px | Form containers, large CTAs |
| `--r-xl` | 32px | Hero CTA banners, large feature blocks |
| `--r-pill` | 999px | Buttons, badges, swatches |

---

## Shadows

All shadows are warm (brown-based, not blue):

```css
--shadow-sm: 0 1px 2px rgba(70, 30, 14, 0.06), 0 1px 1px rgba(70, 30, 14, 0.04);
--shadow-md: 0 8px 24px -8px rgba(70, 30, 14, 0.14), 0 2px 6px rgba(70, 30, 14, 0.06);
--shadow-lg: 0 24px 60px -20px rgba(70, 30, 14, 0.22), 0 6px 18px rgba(70, 30, 14, 0.08);
--shadow-xl: 0 40px 100px -30px rgba(70, 30, 14, 0.32);
```

---

## Motion

```css
--ease: cubic-bezier(.22, .61, .36, 1);
--ease-out: cubic-bezier(.16, 1, .3, 1);
```

| Effect | Duration | Easing | Properties |
|---|---|---|---|
| Hover (color, bg, border) | 250ms | `--ease` | color, background-color, border-color |
| Hover (lift) | 350ms | `--ease-out` | transform, box-shadow |
| Page transition | 550ms | `--ease-out` | opacity 0→1, translateY 8px→0 |
| Scroll reveal | 900ms | `--ease-out` | opacity, translateY 20px→0 |
| Modal/overlay enter | 350ms | `--ease-out` | opacity, transform |

### Scroll reveal pattern
```jsx
<div className="reveal">…</div>
// IntersectionObserver adds .visible when in view
// .reveal-delay-1 / 2 / 3 / 4 stagger entries
```

In Next.js, use `framer-motion`'s `whileInView` or a small custom IO hook. The prototype's hook is in `src/layout.jsx` (`useReveal`).

### Marquee
Pure CSS — `animation: marquee 38s linear infinite` on a track that's `width: max-content`. Triple the items so it loops seamlessly.

---

## Buttons

Four button styles, all pill-shaped:

```css
.btn { padding: 14px 26px; border-radius: 999px; font-size: 14px; font-weight: 600; }

.btn-primary    { background: var(--ink); color: var(--cream); }
.btn-secondary  { background: transparent; color: var(--ink); border: 1px solid var(--ink); }
.btn-ghost      { background: transparent; color: var(--ink); }
.btn-terracotta { background: var(--terracotta); color: var(--cream); }
```

Primary buttons translate `-1px` on hover with shadow expansion. Always include `<ArrowIcon />` after the label on CTAs (`Shop the collection →`).

---

## Form fields

```css
.field {
  background: var(--cream);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 14px 16px;
  font-size: 15px;
}
.field:focus { border-color: var(--ink); background: #fff; }
```

`.field-label` for labels — small uppercase 12px tracked 0.08em.

---

## Icons

All icons are inline SVGs at 1.5px stroke weight, rounded line caps. The set used in the prototype is in `src/layout.jsx`: `SearchIcon`, `AccountIcon`, `CartIcon`, `MenuIcon`, `ArrowIcon`, `StarIcon`, `HeartIcon`.

For production, either inline these or use **Lucide** (`lucide-react`) — its visual language matches.

---

## Grain texture

The `.grain::after` pseudo uses an inline SVG noise filter at 8% opacity, multiply blend mode. Adds a subtle print/paper feel on dark sections. Used sparingly — hero, About letter container.
