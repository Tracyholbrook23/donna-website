# Page Specifications

Detailed spec for every page in the storefront. Open the prototype HTML alongside this doc.

---

## 1. Homepage (`/`)

**Purpose:** Convert first-time visitors into shoppers, signal premium custom-engraving brand, surface Donna's story.

**Sections in order:**

### 1.1 Announcement marquee
- Component: `AnnouncementBar` in `src/layout.jsx`
- Sticky at the top of the page (above nav)
- Black background, cream text, 10px vertical padding
- 4 messages cycling: shipping, holiday lead time, custom availability, "Black-owned, hand-engraved in Charlotte, NC"
- Pure CSS animation, `38s linear infinite`
- Triple the items so the loop seams aren't visible

### 1.2 Nav
- Component: `Nav` in `src/layout.jsx`
- Sticky, transparent at top → frosted (cream/85% + 20px blur) once scrolled past 12px
- Logo: `Wordmark` — "Donna" italic Fraunces 28px + "& co." 9px tracked
- Center links: Shop · Custom Orders · About · Contact (Shop has mega menu on hover)
- Right cluster: search icon, account icon, cart icon (with count bubble)
- Mobile: hamburger opens full-width drawer
- Mega menu: 3-column dropdown — title block, two-column collection list, featured wedding promo card

### 1.3 Hero (variant: `editorial`, default)
- Component: `HomeHero` in `src/home.jsx`
- **Left column** (60%): eyebrow ("Volume 04 · Engraved goods, made by hand"), display headline ("Gifts that *mean* something.") with italic terracotta emphasis on "mean", description (max 460px), two CTAs (primary "Shop the collection" with arrow + magnetic hover, secondary "Start a custom piece"), stat strip with **animated counters** (117 / 1,840+ / 6,200 / Charlotte NC)
- **Right column** (40%): primary image-slot (90% width, full height), three floating elements:
  - Top-left: "Engraving now" status card with **pulsing live dot**, progress bar, current order info — has `data-tilt="5"` for mouse tilt
  - Bottom-right: "— Donna" italic signature card in ink (also tilts)
  - Left-middle: rotating brass circular badge with "BLACK OWNED · HAND ENGRAVED" textPath + idle drift animation
- Minimum height: 78vh
- Headline size: clamp(64px, 8.5vw, 132px)

**Alt hero variants** (exposed in Tweaks for design exploration, pick one for production):
- `split` — 50/50 ink panel × image
- `overlay` — full-bleed image with gradient and text at bottom

### 1.4 Trust strip
- Component: `HomeMarqueeStrip` in `src/home.jsx`
- Animated horizontal scroll (46s)
- 7 trust messages: shipping, NC studio, reviews, Black-owned, live preview, etc.
- Italic Fraunces 13px, separated by brass ✦ glyphs

### 1.5 Categories
- Component: `HomeCategories` in `src/home.jsx`
- 6-column grid, 220px row height
- 5 cards in asymmetric arrangement:
  - Tumblers: 2×2 cells, blush bg
  - Boards: 2×1 cells, cream-3 bg
  - Wedding: 2×2 cells, **forest bg with cream text**
  - Home: 1×1 cell, brass-light bg
  - Accessories: 1×1 cell, **ink bg with cream text**
- Each card: numbered ("01 / Collection"), category name (display 32–48px), italic kicker, count + "Shop →" footer
- Image-slot covers the card at 45–55% opacity (image bleeds through, text overlays)
- Hover: translateY(-4px), shadow expands; card image scales 1.045 + brightens slightly

### 1.6 Studio story
- Component: `HomeStudioStory` in `src/home.jsx`
- Background: cream-2
- Two columns: studio portrait (4/5 image-slot, with floating "6:47 AM · first cup, first cut" pill caption) + Donna's story (display 40-72px headline, two paragraphs, 4 values in 2×2 grid: Hand-engraved / Small batches / Local sourced / Family first)
- CTA: "Read the full story →" secondary button

### 1.7 Bestsellers grid
- Component: `HomeBestsellers` in `src/home.jsx`
- 3-column grid of `ProductCard`s
- Style toggle in Tweaks: `standard` (default), `editorial`, `minimal`

### 1.8 Customizer teaser
- Component: `HomeCustomizerTeaser` in `src/home.jsx`
- Full-width dark section (ink bg, cream text)
- Two columns:
  - Left: eyebrow "The Customizer", headline "Type a name. *See it engraved* in real time.", description, **live text input** with font picker pills (5 fonts including monogram), "Try on a product →" CTA
  - Right: large SVG tumbler illustration with the typed text engraved on it, live preview chip in the corner
- Font choices: Editorial Serif, Italic Script, Monogram, Block Caps, Modern Sans

### 1.9 "In their hands" lifestyle grid
- Component: `HomeInTheirHands` in `src/home.jsx`
- 4-column grid of 6 lifestyle cards (4/5 aspect)
- Each card: tag (TUMBLERS, BOARDS, WEDDING, STUDIO, ACCESSORIES, HOME), gradient overlay, italic caption that animates up on hover
- Header CTA: "Follow on Instagram"

### 1.10 Testimonials
- Component: `HomeTestimonials` in `src/home.jsx`
- Background: cream-2
- Left column: "1,840+ five-star letters" headline + 5-star row + "4.96 average"
- Right column: large quote card with big italic terracotta " " mark, quote text serif 22-30px, attribution, star row
- Pagination dots + prev/next chevrons

### 1.11 Custom CTA banner
- Component: `HomeCustomCTA` in `src/home.jsx`
- Full-width terracotta block with huge italic "custom" word in the background (opacity 0.08)
- Headline "Have something *specific* in mind?", description, two CTAs
- This is the primary call-to-custom from the homepage

### 1.12 Footer
- Component: `Footer` in `src/layout.jsx`
- Ink background, cream text
- **Newsletter band** at top: left says "Letters from *my hands* to yours", right is email + arrow submit
- 4-column link grid: Brand (with social), Shop (collection list from `DONNA.collections`), Studio, Help
- Bottom strip: copyright + privacy/terms/accessibility
- Background flourish: huge italic "Donna" in white-4% opacity, positioned bottom-center

---

## 2. Shop (`/shop`)

**Purpose:** Browse the catalog. Filter, sort, find a product.

- Component: `ShopPage` in `src/shop.jsx`
- Route: `/shop`, with optional `#<collection-id>` hash to pre-select a collection
- **Header:** eyebrow "The shop", display title (changes based on active collection), description, sort dropdown, piece count
- **Collection tabs:** pill buttons with count badges; hover slides ink bg up from bottom
- **Body layout:** 260px sticky sidebar + product grid
- **Sidebar (`FilterGroup` components):**
  - Price: range slider $0–$200+ (accent: terracotta)
  - Personalization: 3 checkboxes
  - Material: 6 checkboxes (Walnut, Oak, Acacia, Leather, Steel, Crystal)
  - Occasion: 7 checkboxes
  - Color: 8 round swatches
  - Lead time: 3 radio options
  - "Reset all filters" link
- **Grid:** 3-column product cards
- **Footer:** "Load more pieces" + commission band ("Can't find it? Commission a one-off")

**Mobile:** Filters collapse into a drawer behind a "Show filters" button.

---

## 3. Product Detail (`/product/[slug]`)

**Purpose:** Show one product in depth, configure engraving, add to cart.

- Component: `ProductPage` in `src/shop.jsx`
- Route: `/product/[slug]` (slug = product handle from Wix)

### 3.1 Layout (desktop)
- Breadcrumb at top: Home / Shop / [Collection] / [Product]
- **Left column (55%):** Thumbnail strip (4 thumbs vertical) + main image area (4/5 aspect) with:
  - The product SVG glyph overlaid on an image-slot background (use real Wix product image in production)
  - **Live engraving preview** — the SVG renders the typed text in the chosen font as you type
  - "Live preview" chip top-left when engraving is typed (with pulsing dot)
  - Zoom icon button bottom-right

- **Right column (45%):** **Sticky buybox**
  - Tag chip + rating
  - Display title (clamp 40-64px)
  - Subtitle (variant subtext)
  - Price (serif 32px) + strike-through MSRP + green "Free shipping over $125" badge
  - Description paragraph
  - **Color/Variant selector** — 40px round swatches with active ring
  - **"Make it yours" engraving panel** (boxed in cream-2):
    - Toggle to skip personalization
    - Text input that renders in the selected font (so user sees their text in the right typeface as they type)
    - Font picker (5 pill buttons, each rendered in its own font)
    - Placement picker (4 buttons: Front center / Front bottom / Side wrap / Underneath)
    - Engraving style picker (3 buttons: Etched / Deep cut / Filled — with descriptions)
    - "Need something more complex?" link to /custom
  - **Quantity + Add to cart** row: minus/plus stepper + primary button (magnetic hover) showing total price + heart save button
  - **Service strip:** 2×2 grid — Ships in 3-5 days · Engraved by hand · Gift-ready · Mistake-free promise

### 3.2 Tabs below the buybox
- Component: in `ProductPage`, `activeTab` state
- Tabs: The story / Specs & care / Shipping & returns / Reviews · count
- **Story tab:** italic terracotta pull-quote + 2 paragraphs in Donna's voice + lifestyle image-slot
- **Specs tab:** 2-column — "What you get" definition list + "Care" bullet list
- **Shipping tab:** brief copy + link to full policies
- **Reviews tab:** rating breakdown (big 4.9 + per-star bars) + grid of testimonial cards

### 3.3 Related products
- 4-column grid below the tabs, `minimal` card style

### 3.4 Mobile sticky add-to-cart
- Fixed bottom strip showing product name + price + Add button
- **Only shows on mobile** — uses `.mobile-only` class

### 3.5 Engraving state shape
When the customer adds to cart, the line item needs:
```ts
{
  productId: string,
  variantId: string,
  qty: number,
  customFields: {
    engravingText: string,       // what they typed
    engravingFont: 'fraunces' | 'fraunces-italic' | 'monogram' | 'block' | 'sans',
    engravingPlacement: 'front-center' | 'front-bottom' | 'side' | 'underneath',
    engravingStyle: 'etch' | 'deep' | 'fill',
  }
}
```
This is the most important data contract in the project. Wix supports custom text on cart line items via `customLineItems` or product `customTextFields` — see WIX_INTEGRATION.md.

---

## 4. Custom Orders (`/custom`)

**Purpose:** Capture leads for custom commissions, corporate orders, weddings.

- Component: `CustomPage` in `src/extras.jsx`

### Sections
1. **Hero** — italic terracotta headline "Tell me what you're *picturing*." + image-slot with "Currently accepting commissions through [month]" pill
2. **How it works** — 4-column step grid (Brief → Quote → Proof → Engrave), each step has italic-terracotta numeral, title, description, "5 min · you" footer
3. **Past commissions gallery** — 12-column asymmetric image-slot grid with italic captions on hover
4. **Inquiry form** — 3-step wizard:
   - **Step 1:** Type (6 commission types as cards)
   - **Step 2:** Details (occasion, deadline, budget pills, description textarea, file attach hint)
   - **Step 3:** Contact info (name, email, phone, preferred channel)
   - Submit → success card
   - Form posts to API route → email + CRM
5. **Sidebar** with direct contact methods
6. **Mini-FAQ** at the bottom (cream-2 bg)

---

## 5. About (`/about`)

**Purpose:** Tell Donna's story. Build emotional trust.

- Component: `AboutPage` in `src/extras.jsx`

### Sections
1. **Hero** — centered display headline + wide 21:9 image-slot for studio shot
2. **Letter from Donna** — sticky sidebar (eyebrow + giant italic quote mark + signature + 3 stats) + scrolling main column with 6-paragraph first-person letter ending in "— Donna" italic signature
3. **Values grid** — 6 values in 3-column grid on **ink background**: 01–06, display title, body
4. **The studio team** — 3 portrait cards (Donna, Maya, Renee) with photo, name, role (terracotta), bio
5. **Press band** — 8 publication names in italic, on cream-2

---

## 6. Contact (`/contact`)

**Purpose:** Make every contact channel available, easy to find.

- Component: `ContactPage` in `src/extras.jsx`

### Sections
1. **Hero** — "Let's *talk.*" headline
2. **6 contact tiles** in 3-column grid:
   - Email · hello@donnas.co · "For everything"
   - Instagram DM · @donnaandco · "Fastest reply"
   - WhatsApp · +1 (704) 555-0177 · "Mon–Fri 9–5 EST"
   - Custom orders · custom@donnas.co · "Direct line to Donna"
   - Press · press@donnas.co · "Media kit on request"
   - Wholesale · wholesale@donnas.co · "Stockists, partnerships"
   - Each tile has a colored square icon (terracotta / brass / forest rotating)
   - Hover: lift -2px, shadow
3. **Two-column** — Studio location card (cream-2) + form
4. Form: name, email, subject dropdown, message → success state

---

## 7. Policies (`/policies/[tab]`)

**Purpose:** Make policies legible. Cover shipping, returns, custom, FAQ.

- Component: `PoliciesPage` in `src/extras.jsx`
- Route: `/policies/[tab]` where tab is `shipping | returns | custom | faq` (default `shipping`)

### Layout
- Sidebar with tab nav (4 buttons, sticky)
- Main column:
  - For each policy: title, intro line, sections (h3 + paragraph)
  - For FAQ tab: list of expand/collapse FAQ rows
  - Each policy page ends with "Question not answered?" cream-2 box → /contact CTA

Content lives in `DONNA.policies` and `DONNA.faqs` in `src/data.js`. Move to a CMS (Sanity, Contentful) or markdown files in production.
