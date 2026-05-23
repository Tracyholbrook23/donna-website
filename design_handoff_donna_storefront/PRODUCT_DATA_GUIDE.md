# Adding Your Real Products

A guide for **Donna** — how to set up your products in the Wix dashboard so they look perfect on the new storefront.

---

## 1. What you'll need before you start

For each product, gather:
- [ ] Product name (e.g. "The Skinny Tumbler")
- [ ] Short subtitle (e.g. "Engraved · 20 oz · double-wall")
- [ ] One paragraph of description, in your voice
- [ ] Price
- [ ] 4-6 photos (see photo specs below)
- [ ] Color/material/size options (if any)
- [ ] A collection it belongs to (Drinkware, Boards, Home, Accessories, Wedding, Corporate)
- [ ] Whether it can be engraved (most yes)

---

## 2. Photo specs

The new site looks best with these photos per product. You can launch with just (1) and add the rest over time:

| Photo | Aspect | What it shows |
|---|---|---|
| 1. **Hero** (required) | 4:5 vertical or 1:1 square | The product alone, beautifully lit, on a soft warm background |
| 2. **Detail shot** | 4:5 | Close-up of the engraving — the texture, the depth |
| 3. **Lifestyle** | 4:5 | Person holding/using the product (a hand, a moment, real life) |
| 4. **Scale shot** | 4:5 | Product in context (on a counter, in a bag) so people see its size |
| 5. **Variant flat-lay** (if multiple colors) | 1:1 | All color options laid out together |
| 6. **Gift-ready** (optional) | 4:5 | Product wrapped in the kraft + twine + card |

**Specs:**
- Format: JPEG or WebP
- Min width: 1600px (so it looks sharp on big screens)
- Color: warm, soft, natural light preferred (no harsh studio lighting)
- Background: cream, walnut, linen, or a real surface — never pure white

**Don't worry if you don't have all of these on day one.** The site has a built-in fallback that shows a stylized illustration of the product type when no photo is uploaded — looks intentional, not broken.

---

## 3. How to set up a product in Wix

In the Wix dashboard, go to **Store Products → Add Product**.

### Required fields
- **Name** — short, no marketing fluff. "The Skinny Tumbler" not "Premium Personalized Engraved Custom Tumbler 20oz"
- **Description** — write 1-2 paragraphs in your voice. Example for a tumbler:
  > A slim, 20-ounce tumbler that fits in a cup holder and a tote at the same time. Double-wall vacuum insulated — drinks stay cold all day or hot through your morning. Engraving cuts deep into the powder coat and is built to last the life of the cup.
- **Price** — your wholesale price marked up appropriately. Don't undercharge.
- **SKU** — your internal code (e.g. `TUM-SK-20`)
- **Slug** — short and clean (e.g. `skinny-tumbler`). This becomes the URL.

### Photos
Upload in the order listed above. The first photo is what shows on the shop grid.

### Collections
Assign to **at least one** collection. Don't dump everything into multiple — pick the primary home.

### Product options (variants)
For each color/material/size, add an option:
- **Color** — type "color", add choices with hex values. The site renders these as round swatches.
- **Size** — type "drop-down", add choices.
- The site auto-renders the right UI based on option type.

### **CRITICAL: Engraving fields**
For every engravable product, add these 4 **Custom Text Fields** (Wix dashboard → Product → Customization → Add a customization):

| Field name | Type | Max chars | Required? |
|---|---|---|---|
| `Engraving text` | Text | 24 | Yes |
| `Font` | Text | 30 | Yes (filled by the site) |
| `Placement` | Text | 30 | Yes (filled by the site) |
| `Engraving style` | Text | 20 | Yes (filled by the site) |

**Important:** Name them **exactly** as shown (case-sensitive). The site code looks for these by name when adding to cart.

### Inventory
- If you make to order: leave inventory tracking off, set lead time in description.
- If you stock items: turn inventory tracking on.

### Lead time
Add a custom info section called "Lead time" with the answer (e.g. "Ships in 3-5 business days"). The site shows this on the product page.

---

## 4. Collection setup

In Wix, create **6 collections** matching the site:

| Wix Collection Name | URL slug | Description (internal) |
|---|---|---|
| Drinkware | `tumblers` | Tumblers, mugs, cups |
| Boards & Servingware | `boards` | Cutting/charcuterie boards, serving utensils |
| Home & Keepsakes | `home` | Decanters, wine glasses, keepsake boxes |
| Wallets & Accessories | `accessories` | Wallets, keychains, leather goods |
| Wedding & Anniversary | `wedding` | Flutes, sets, bridal party gifts |
| Corporate & Bulk | `corporate` | Branded sets, 10+ orders |

Plus **special collections** for site features:
- `bestsellers` — featured on homepage
- `new` — anything marked "New" in the prototype
- `gift-sets` — multi-piece sets

A product can be in multiple collections (e.g. a tumbler is in both `tumblers` and `bestsellers`).

---

## 5. Ribbons (the badges)

Wix lets you add a "ribbon" to a product — these show as the small tag in the corner of the product card. Use one of:
- `Best Seller`
- `New`
- `Trending`
- `Gift Set`
- `Customer Favorite`
- `Under $50`
- `Wedding Pick`

Keep them sparse — don't ribbon every product, it loses meaning.

---

## 6. Recommended launch checklist

When you're ready to flip the new site on:

- [ ] At least 12 products live in Wix
- [ ] Every product has at least 1 hero photo
- [ ] Every engravable product has the 4 custom text fields
- [ ] All 6 main collections exist and have products
- [ ] `bestsellers` collection has 6+ products for the homepage
- [ ] Shipping zones configured in Wix (US, plus any international)
- [ ] Tax settings configured in Wix
- [ ] Payment methods configured (Stripe, PayPal, etc.)
- [ ] Test order placed end-to-end (browse → engrave → add to cart → checkout → confirmation email)
- [ ] Real photos uploaded everywhere image-slots exist on the site (homepage hero, studio portrait, lifestyle grid, custom-orders gallery, About page)
- [ ] Real contact info updated (phone, address, hours)
- [ ] Real testimonials replace the placeholder 4 in `data/reviews.ts`
- [ ] Email sending configured (Resend or similar) for custom-inquiry + contact forms
- [ ] Domain pointed to Vercel
- [ ] Old `/shop-test` route deleted

---

## 7. The "fallback gracefully" promise

The site is built to look polished even if data is missing:

- **No product photo?** A custom SVG illustration of the product type (tumbler, board, etc.) renders in its place, against a cream gradient. Doesn't look broken.
- **No reviews yet?** The rating stars hide automatically.
- **No swatches?** The color picker hides.
- **Empty collection?** The grid shows a "More coming soon" message.

So you can launch with 12 products and a few hero photos and add more over time without the site looking thin.

---

## 8. Adding lifestyle photos (separate from products)

The homepage and About page have **lifestyle photos** — Black families using your products, you at the studio, customers in the wild. These don't live in Wix; they live in the codebase.

Currently 16 image slots across the site:
- Homepage hero (1)
- Category cards (5)
- Studio portrait (1)
- Customizer teaser background (decorative — optional)
- "In their hands" grid (6)
- Custom orders hero (1)
- Past commissions gallery (8 small + a hero)
- About hero (1 wide)
- About team portraits (3)

When real photos come in, place them in `public/lifestyle/` with descriptive filenames (e.g. `hero-hike-blue-ridge.jpg`, `studio-portrait-donna.jpg`) and update the matching component to point to the new URL.

Until then, the temporary stock URLs in the prototype render — they're not perfect representation, but they communicate the design intent.

---

## 9. If something breaks

The site logs every Wix API call to the browser console. If a product page is blank or the cart isn't working:

1. Open browser dev tools → Console
2. Look for red errors starting with "Wix:"
3. Check the product in Wix dashboard — confirm it's **published** (not draft)
4. Confirm `NEXT_PUBLIC_WIX_CLIENT_ID` is correct in Vercel env vars

If you're stuck, the developer can deploy a fix to Vercel in minutes.

---

## 10. The mental model

The way to think about this site:
- **Wix** is your inventory + cart + checkout + orders engine. You manage it through the Wix dashboard.
- **The site** is the storefront experience. It pulls from Wix in real time, then makes everything feel like Donna's instead of "powered by Wix."
- **Your photos** are what bring it to life. The design is intentionally restrained so your work — the engraving, the wood grain, the real moments — is the star.

You don't need to learn code. You manage products, prices, and inventory in Wix. You upload photos through the dashboard. Everything else just works.
