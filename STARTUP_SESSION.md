# STARTUP_SESSION.md
### Out of Jersey — Master Session Handoff & Active Task Tracker
_Last updated: 2026-05-24 (session 6) | Updated by: Claude (Cowork session)_

---

> **START EVERY SESSION BY READING THIS FILE FIRST.**
> See the "START OF EVERY SESSION" section at the bottom for step-by-step instructions.

---

## 1. Current Project Overview

**Project:** Out of Jersey Custom Laser Engraving — full e-commerce website  
**Owner / Client:** Donna (founder, lead engraver, woman-owned business)  
**Developer / Designer:** Tracy  
**Tech Stack:** Next.js (App Router), TypeScript, Wix Headless (product catalog + ecommerce backend), Tailwind-compatible custom CSS variables  
**Hosting:** Vercel (inferred from `.next` build artifacts and Next.js config)  
**Repo root:** `/Users/tracy/donna-website`

### Current Pages
| Route | Status |
|---|---|
| `/` (Homepage) | ✅ Built — mostly complete, minor issues |
| `/shop` | ⚠️ Built — category filter buttons non-functional |
| `/product/[slug]` | ✅ Built — product detail with BuyBox |
| `/custom` | ✅ Built — quote form exists, email NOT wired |
| `/about` | ✅ Built — contains placeholder team section |
| `/contact` | ✅ Built |
| `/policies/[tab]` | ✅ Built — shipping, returns, FAQ, custom policy |
| `/our-work` | ❌ MISSING — needs to be created |
| `/account` | ❌ MISSING — linked in footer Help nav, page doesn't exist |
| `/shop-test` | ⚠️ Leftover test page — should be deleted before launch |

---

## 2. Website Goals

- Showcase Donna's custom laser engraving work in a modern, premium, highly visual way
- Convert visitors into buyers — both shop (immediate purchase) and custom orders (quote flow)
- Build trust for custom work: craftsmanship, woman-owned, NJ-based, real reviews
- Feel: **modern, colorful, premium, visual** — without overwhelming the products
- Secondary: attract corporate/bulk gifting clients
- Inspiration reference: [www.everythingetched.com](https://www.everythingetched.com) _(screenshots saved in `/Inspiartion/` folder — note the typo in folder name)_

---

## 3. Current Design Direction

- **Color palette:** Terracotta (`--terracotta`), forest green (`--forest`), cream (`--cream`), ink/dark (`--ink`), brass (`--brass`)
- **Typography:** Display serif (Fraunces, italic) + clean body sans-serif
- **Aesthetic:** Editorial-meets-artisan — large type, generous whitespace, real photography, bold section headers with italic accent words in terracotta
- **Navigation:** Dark forest green sticky header (`#1a3028`) with mega-menu for Shop
- **Footer:** Dark ink background with newsletter signup, link columns, ghost logo watermark
- **Animations:** Page enter fade, scroll reveal (`reveal` class), card hover lifts, marquee strip
- **Videos:** Autoplay, muted, looping — displayed in horizontal scroll strip on homepage
- **Product cards:** Real photos from Wix when available; smart local photo fallback by product name keyword; SVG glyphs as last resort

---

## 4. Priority Fixes — HIGH (Launch Blockers)

- [ ] **[HIGH] Wire up custom inquiry form to Donna's email** ⏳ BLOCKED — waiting on Donna's email address
  - File: `app/api/custom-inquiry/route.ts`
  - Currently only `console.log()`s — NO email is sent
  - Needs: Resend, SendGrid, or Nodemailer integration
  - **Status: do not implement yet — waiting for good email address from Donna**
  - Also applies to the "Get a Quote" form on `/custom`

- [x] **[HIGH] Fix shop category filter buttons** ✅ (2026-05-24)
  - Client-side filtering via `product.collectionIds` is working
  - Sidebar fake filters (Personalization, Material, Occasion) removed — they were non-functional placeholders
  - Price slider remains and works
  - ⚠️ NOTE: Filter counts show 0 for categories where Wix products haven't been assigned yet — Wix dashboard work still needed

- [x] **[HIGH] Fix cart/checkout button functionality** ✅ (2026-05-24)
  - Full Wix Headless cart flow built end-to-end
  - `lib/cartContext.tsx` — CartProvider with visitor token persistence (localStorage), site-wide cart state
  - `app/cart/page.tsx` — cart page with line items, qty controls, remove, order summary, checkout button
  - `components/Nav.tsx` — live cart count badge on cart icon
  - `components/BuyBox.tsx` — "Add to Cart" wired to context (badge updates live) + new "Buy it now" button
  - `lib/wixClient.ts` — added `@wix/redirects`, `createBrowserWixClient()` factory
  - Checkout flow: `currentCart.createCheckoutFromCurrentCart()` → `redirects.createRedirectSession()` → redirect to Wix checkout URL
  - ⚠️ NOTE: Needs at least one product with a real price in Wix to test checkout (all products currently $0.00)

- [ ] **[HIGH] Remove all placeholder/unapproved product categories**
  - `lib/data/index.ts` collections: confirm with Donna that all 6 are real: tumblers, boards, home, accessories, wedding, corporate
  - The note mentions "walnut oak leather" as a category — this does NOT appear in the current codebase, so it may have already been removed, but confirm with Donna
  - Collection product counts (24, 18, 32…) are hardcoded static numbers — misleading if they don't match reality

- [x] **[HIGH] Remove the live engraving preview / "Type a name" feature** ✅ (2026-05-24)
  - `components/HomeCustomizerTeaser.tsx` — deleted
  - `components/BuyBox.tsx` — font picker and live preview chip removed; kept plain text + placement
  - "Live engraving preview" removed from homepage marquee strip

- [ ] **[HIGH] Remove all products without real images**
  - Products that fall through to SVG glyphs (no Wix image, no local photo match) should not appear in the live shop
  - All displayed products must have a real photo

- [x] **[HIGH] Delete `/shop-test` page** ✅ (2026-05-24)
  - `app/shop-test/` directory deleted

---

## 5. UX Improvements — MEDIUM

- [x] **[MEDIUM] Photo grid lightbox** ✅ (2026-05-24)
  - `HomePhotoGrid` extracted to `components/HomePhotoGrid.tsx` (client component)
  - Click any photo → fullscreen lightbox with prev/next arrows, counter, keyboard nav (← → Esc)
  - Mobile grid fixed: responsive CSS class `layout-photo-grid` — 6 cols desktop, 3 tablet, 2 mobile
  - Tall/wide span overrides reset on tablet/mobile so photos don't squish

- [ ] **[MEDIUM] Lightbox still needed on: product detail page main image, custom orders page gallery**
  - Homepage photo grid ✅ done
  - `/product/[slug]` main image — not yet
  - `/custom` page gallery — not yet

- ❌ **[REMOVED] "View Our Work" / Portfolio page** — Donna does not want this page

- [ ] **[MEDIUM] Fix desktop hero/banner — animations not playing**
  - Mobile banners animate but desktop banners do not
  - Check `globals.css` for any `@media` gating on animation classes
  - The hero section uses `reveal` and `reveal-delay-*` classes — verify they trigger on desktop

- [ ] **[MEDIUM] Add file/image upload to custom order form**
  - `/custom` page form currently has no file upload field
  - Customers need ability to upload inspiration images for custom orders
  - Should accept: JPG, PNG, PDF (sketch uploads)
  - Wire to: email attachment via the inquiry API, or a Wix media upload endpoint

- [x] **[MEDIUM] Rephrase homepage photo grid section** ✅ (2026-05-24)
  - Photos are Pinterest/inspiration images, not Donna's own work
  - Eyebrow changed from `@outofjersey.engraving` → `what we can make`
  - Heading changed from "The work, up close." → "The possibilities, up close."
  - Added honest subtitle: "Every piece is made to order. These are examples of styles and products we engrave…"

- [x] **[MEDIUM] Footer: remove unused social media links** ✅ (2026-05-24)
  - Removed TT, PT, FB — Instagram only remains

- [x] **[MEDIUM] Add "Created by Tracy" credit to footer** ✅ (2026-05-24)
  - "Site by Tracy" added to footer bottom strip

- [ ] **[MEDIUM] Footer "Account" link goes nowhere**
  - Footer Help column links to `/account` — this page does not exist
  - Either build a basic account page stub or remove the link until it's ready

---

## 6. Mobile / Desktop Issues

- [ ] **[HIGH] Desktop banner/hero animations not firing** (see Priority Fixes above)
- [ ] **[MEDIUM] Verify mobile nav fully works** — mega-menu should not appear on mobile, confirm hamburger menu opens/closes correctly
- [ ] **[MEDIUM] Horizontal video scroll strip on homepage** — test scroll behavior on iOS Safari (momentum scroll, scrollbar hiding)
- [ ] **[LOW] Photo grid (masonry-style, 6 columns)** — likely collapses awkwardly on smaller screens; needs responsive breakpoints confirmed
- [ ] **[LOW] Homepage stats row in hero** — test 3-item flex row at narrow viewport, may need to wrap cleanly

---

## 7. Store / Shop Tasks

### Wix Product Catalog — Session 2026-05-24 Progress

> **Major progress this session.** The old 14 placeholder products were deleted and a full catalog was imported from scratch.

**Catalog source:** `Wholesale Catalog-Updated-April-2026.pdf` (72 pages, in repo root)
**Import file:** Wix-compatible CSV — 139 products, 336 variants, 475 total rows (4 iterations to fix formatting)
**Format issues resolved:** wrong column names, invalid option type (`DROP_DOWN` → `TEXT_CHOICES`), missing prices on variant rows

#### The 15 Real Product Categories (from the wholesale catalog)
1. Powder Coated Tumblers _(multiple sizes, finishes, electro variants)_
2. Marble & Wood
3. Cutting Boards
4. Gourmet Knife Set → mapped to "Gourmet Kitchen" category
5. BBQ & Grill
6. Pocket Knives
7. Hammer Set → mapped to "Utility" category
8. Decanters & Sets
9. Wood Boxes
10. Wood Pendant Jewelry
11. Laserette™ products
12. Pens & Pencils
13. Sublimation Tumblers & Blanks
14. Stainless Steel Tumblers
15. Acrylic Blanks

#### Current Wix Store State
- [x] ✅ All 139 products imported and live in Wix
- [x] ✅ Color/size/finish variants correctly set up on products
- [x] ✅ Old 14 placeholder products deleted
- [ ] **[HIGH] All product prices are $0.00** — pricing placeholders only, needs to be filled in
- [ ] **[HIGH] No product images uploaded yet** — next planned step (see Section 8 and Section 13)
- [x] ✅ **[HIGH] All 8 Wix categories created in dashboard** (2026-05-24)
  - BBQ & Grill, Decanters & Sets, Gourmet Kitchen, Laserette™, Marble & Wood, Pens & Pencils, Sublimation Tumblers & Blanks, Utility
- [x] ✅ 7 categories imported and categorized successfully:
  - Powder Coated Tumblers, Cutting Boards, Wood Boxes, Pocket Knives, Wood Pendant Jewelry, Stainless Steel Tumblers, Acrylic Blanks

#### Remaining Store Tasks
- [x] **[HIGH] Shop category filter — fix collection filtering** ✅ (2026-05-24)
  - Created `/app/api/products/route.ts` — fetches products filtered by Wix collection slug
  - Added `collections` module to `wixClient.ts`
  - `ShopClient.tsx` now fetches from API on tab click with loading state
  - ⚠️ NOTE: Category pill IDs in `lib/data/index.ts` (tumblers, boards, home, etc.) must be updated to match real Wix collection slugs once all 8 missing Wix categories are created in dashboard
- [ ] **[HIGH] Cart/checkout flow — verify end-to-end** (see Priority Fixes)
- [ ] **[HIGH] Add real pricing to all 139 products in Wix**
- [ ] **[HIGH] Create the 8 missing categories in Wix dashboard and assign products**
- [ ] **[HIGH] Upload product images to Wix** — see Section 13 for image strategy
- [x] **[MEDIUM] Update frontend `collections` array in `lib/data/index.ts`** ✅ (2026-05-24) — All 22 real Wix categories added with real `wixId` values for the 7 that have products. Empty-category `wixId` fields will be filled in as products are assigned in Wix dashboard.
- [ ] **[MEDIUM] Footer category links** — footer Shop column must match real Wix collection slugs after category cleanup
- [ ] **[LOW] Add Best Sellers / "Fan Favorites" tag in Wix** — homepage `HomeBestsellers` shows first 8 products in default order, not actual bestsellers
- [ ] **[LOW] Research user account/login system** — Wix Headless supports member auth; post-launch feature
- [ ] **[LOW] Add intro/entrance animations** — post-launch polish

---

## 8. Product Photography Tasks

- [ ] **[HIGH] Upload product images to Wix — next planned step** — 139 products currently have no images. The smart local-photo fallback in `ShopClient.tsx` and the glyph fallback are active but are temporary only
- [ ] **[MEDIUM] Organize and upload remaining product photos** — `/Product photogrophy/` folder (note typo in folder name) has 17 source JPEGs not yet in `public/photos/`
- [ ] **[MEDIUM] Improve engraving-specific photography** — need close-up detail shots showing laser precision on different materials (wood grain, leather texture, glass etching)
- [ ] **[MEDIUM] Custom Orders page (`/custom`) should display a gallery of real custom work** — currently the process steps and form dominate; add a visual gallery of past commissions
- [x] **[LOW] Product videos** ✅ (2026-05-24) — All 17 videos confirmed approved by Donna. All videos feature the custom 30oz tumbler with handle. 15 of 17 are currently shown in the homepage scroll strip.
- [x] **[MEDIUM] Video strip — mobile autoplay, arrows, lightbox** ✅ (2026-05-24)
  - `HomeVideoShowcase` extracted to `components/HomeVideoShowcase.tsx` (client component)
  - Mobile autoplay fixed using IntersectionObserver — calls `.play()` when video is ≥50% in view (iOS Safari workaround)
  - Arrow buttons added to scroll strip (dark green circle, appears when there's more to scroll)
  - Fade gradient edges hint at more content off-screen
  - Click any video → fullscreen lightbox with prev/next, counter, keyboard nav
- [ ] **[LOW] Rename the source folder** — `Product photogrophy` (typo) and `Inspiartion` (typo) folders in repo root should be renamed to `Product Photography` and `Inspiration`

---

## 9. Feature Backlog — MEDIUM / LOW

- [ ] **[MEDIUM] "Get a Quote" form → Donna's email** — same as custom inquiry wiring (see Priority Fixes); the form on `/custom` and any contact-based quote flow must email Donna directly
- [ ] **[MEDIUM] Intro animations on site entry** — consider subtle fade/slide-up on first load; `page-enter` class exists in CSS but verify it's doing meaningful animation
- [ ] **[LOW] Research user account / login system** — Wix Headless member auth; post-launch feature
- [ ] **[LOW] Newsletter form wiring** — `components/NewsletterForm.tsx` exists in footer; verify it's connected to a real list (Mailchimp, Klaviyo, or Wix Contacts)
- [ ] **[LOW] Social proof / testimonials** — `lib/data/index.ts` has an empty `testimonials` array; `components/home/HomeTestimonials.tsx` exists but likely renders nothing; needs real reviews from Donna

---

## 10. Pending Confirmations from Donna

> These items cannot be completed without Donna's direct input.

- [ ] **What email address should custom inquiries and quote requests go to?** ⏳ Actively waiting — do not wire up email until this is confirmed
- [ ] **Confirm hero stats are accurate:** "1,840+ five-star reviews" and "14,200+ pieces engraved" — are these real numbers?
- [ ] **Confirm which social platforms are active** — only Instagram for now?
- [ ] **Confirm all 6 product collections are real and active:** Drinkware, Boards & Servingware, Home & Keepsakes, Wallets & Accessories, Wedding & Anniversary, Corporate & Bulk
- [ ] **Approve all product videos** — 17 videos on the homepage scroll strip; are all of these approved for public display?
- [ ] **DECISION NEEDED: Where do product images live long-term?** (see Section 12 — Image Strategy)
- [ ] **Confirm or remove the "Press & Stockists" footer link** — currently links back to `/about`, which has no press/stockist content
- [ ] **Real testimonials/reviews** — does Donna have Etsy or Google reviews to pull quotes from?
- [ ] **Real team photo or Donna photo for the About page** — currently About has a `TEAM` array with placeholder data
- [ ] **Confirm product pricing is correct in Wix** — all prices displayed come directly from Wix backend

---

## 11. Placeholder / Stub Content Still in Codebase

| Location | Issue |
|---|---|
| `lib/data/index.ts` — `testimonials` | Empty array — no testimonials render anywhere |
| `app/about/page.tsx` — `TEAM` section | Likely has placeholder name/bio/photo for Donna |
| Footer social icons TT, PT, FB | All link to `href="#"` |
| Collection product counts in `lib/data/index.ts` | Hardcoded (24, 18, 32…) — not real Wix counts |
| Hero stats ("1,840+ reviews") | Unconfirmed — needs Donna to verify |
| `app/api/custom-inquiry/route.ts` | Logs only — no real email delivery |
| `/account` page | Linked in footer but page does not exist |

---

## 12. Broken or Incomplete Functionality

| Feature | Status | File / Location |
|---|---|---|
| Product catalog in Wix | ✅ 139 products imported | Wix dashboard |
| Product pricing | ❌ All $0.00 placeholders | Wix dashboard |
| Product images in Wix | ❌ None uploaded yet | Wix dashboard — next step |
| 8 Wix categories missing | ❌ Need manual creation | Wix dashboard |
| Shop category filter buttons | ✅ Working (client-side via collectionIds) | `components/ShopClient.tsx` |
| Custom inquiry email delivery | ❌ Not wired (⏳ waiting on Donna's email) | `app/api/custom-inquiry/route.ts` |
| Cart / checkout flow | ✅ Built — cart page, badge, Buy Now, Wix checkout redirect | `lib/cartContext.tsx`, `app/cart/page.tsx`, `components/BuyBox.tsx` |
| Desktop hero animations | ⚠️ Not firing | `app/globals.css` |
| Image lightbox / click-to-enlarge | ⚠️ Partial — homepage photo grid ✅, product page ❌, custom page ❌ | `components/HomePhotoGrid.tsx` done; others pending |
| File upload on custom order form | ❌ Missing | `app/custom/page.tsx` |
| Footer `/account` link | ❌ 404 | `components/Footer.tsx` |
| `/shop-test` route | ⚠️ Should be deleted | `app/shop-test/page.tsx` |
| Newsletter form | ⚠️ Unverified wiring | `components/NewsletterForm.tsx` |
| Testimonials section | ❌ No data | `components/home/HomeTestimonials.tsx` |
| "View Our Work" page | ❌ Removed from scope — Donna does not want this | N/A |
| Live engraving preview | ❌ Remove per Donna | `components/HomeCustomizerTeaser.tsx`, `components/BuyBox.tsx` |
| Frontend category list | ⚠️ Outdated — 6 generic categories | `lib/data/index.ts` — needs updating to match real Wix catalog |

---

## 13. Product Image Strategy — UNRESOLVED DECISION

> **This needs to be decided before seriously importing the product catalog.**

There are currently two approaches in play and we need to pick one consistently:

### Option A — Upload images directly to Wix (Recommended for long-term)
- Each product in Wix dashboard gets its images uploaded there
- The frontend fetches `product.media.mainMedia.image.url` from the Wix API (already coded)
- **Pros:** Single source of truth, Donna can manage products + photos herself in Wix, scales cleanly
- **Cons:** Every product needs to be manually updated in Wix backend; more initial setup work

### Option B — Keep images in the frontend code (`/public/photos/`)
- Images live in the repo, product cards use the `localPhotoForProduct()` keyword-matching fallback already in `ShopClient.tsx`
- **Pros:** Fast to set up, no Wix dashboard work needed
- **Cons:** Tracy has to manage all product photos in code; Donna can't self-manage; keyword matching is fragile and will break on product name changes; not scalable

### Current State
Right now the code does **both** — it tries Wix first, falls back to a local keyword match, then falls back to an SVG glyph. This is fine as a temporary measure but needs a clear long-term answer.

### Recommendation
**Go with Option A (Wix-hosted images).** Upload all product photos to their respective products in the Wix dashboard. This lets Donna manage her own catalog. The frontend code already handles this correctly — we just need the Wix products to have images attached. The `localPhotoForProduct()` fallback can stay in place as a safety net during the import process.

**Action item:** When importing products to Wix, upload the matching photo from `/public/photos/` or `/Product photogrophy/` to each product at the same time.

---

## 14. Inspiration References


- **Primary:** [www.everythingetched.com](https://www.everythingetched.com) — screenshots saved in `/Inspiartion/` folder (6 screenshots from 2026-05-23)
- **Style keywords:** modern, colorful, premium, highly visual, trustworthy, professional
- **Feel:** Editorial artisan — think Jenni Kayne meets Etsy premium seller, not generic e-commerce

---

## 14. Repo Asset Inventory

```
/public/photos/         — 35 optimized product photos (prod-*.jpg + originals)
/public/videos/         — 17 laser engraving videos (laser-engraving-01 to -17.mp4)
/public/logo.png        — Main logo (opaque)
/public/logo-transparent.png — Transparent logo for overlays
/Logo/                  — Source logo files (PNG + transparent)
/Product photogrophy/   — 17 raw source JPEGs (not yet in /public/photos/)
/Product videos/        — Raw source MP4/JPG files (already converted to /public/videos/)
/Inspiartion/           — 6 inspiration screenshots
/Wholesale Catalog-Updated-April-2026.pdf — Product reference catalog
/design_handoff_donna_storefront/ — Design specs, component map, Wix integration guide, prototype
```

---

## 15. Misc Completed This Session

- [x] **Favicon** ✅ (2026-05-24) — `app/icon.png` created from `public/logo.png` (64×64). Next.js picks it up automatically.

---

## 16. Future Enhancements (Post-Launch)

- [ ] User account system with saved carts and order history (Wix member auth)
- [ ] Real-time engraving preview reimagined (only if Donna approves a different approach)
- [ ] Live order tracking integration
- [ ] Gift message / card customization at checkout
- [ ] Loyalty / repeat customer program
- [ ] Blog or "Behind the Studio" content section
- [ ] SEO optimization pass (meta tags, structured data for products, local NJ business schema)

---

---

## START OF EVERY SESSION

> **Follow these steps at the start of each Claude Desktop / Cowork session:**

### Step 1 — Read this file first
Open `STARTUP_SESSION.md` and read it completely. Do not start writing code until you understand the current state of the project.

### Step 2 — Review unfinished tasks
Check the checkboxes in sections 4–9. Identify what was completed in the previous session (mark those boxes ✅ if not already done). Find the highest-priority unchecked items.

### Step 3 — Continue from highest-priority unfinished items
Work top-down through the priorities:
1. **HIGH / Launch Blockers** (Section 4) first
2. Then **MEDIUM / UX Improvements** (Section 5)
3. Then **Store / Shop Tasks** (Section 7)
4. Then lower priority items

Always confirm anything marked "ask Donna" (Section 10) before implementing — don't guess.

### Step 4 — Update this file after major changes
After completing any significant task:
- Check the relevant box ✅
- Add the date completed in parentheses, e.g. `✅ (2026-05-24)`
- Move any newly discovered issues to the appropriate section
- Update the `_Last updated_` timestamp at the top

### Step 5 — Add new discoveries as you go
As you read code or build features, you will find issues not listed here. Add them to the appropriate section immediately so nothing gets lost between sessions.

### Step 6 — Before ending a session
- Update all task checkboxes reflecting work done
- Note any blockers that need Donna's input in Section 10
- Update the `_Last updated_` line at the top of this file

---

_This file is the source of truth for the Out of Jersey website project. Keep it current._
