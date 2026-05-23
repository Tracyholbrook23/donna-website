# Wix Headless Integration

Notes for wiring the Next.js frontend to the Wix Headless backend.

The existing `lib/wixClient.ts` is initialized with the `products` module. You'll add more modules as features come online.

---

## 1. SDK modules you'll need

```ts
// lib/wixClient.ts (expanded)
import { createClient, OAuthStrategy } from '@wix/sdk';
import { products, collections } from '@wix/stores';
import { currentCart, redirects } from '@wix/ecom';
import { members } from '@wix/members';

export const wixClient = createClient({
  modules: { products, collections, currentCart, redirects, members },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
    tokens: getStoredTokens(), // implement: read from cookie
  }),
});
```

Install if needed:
```bash
npm install @wix/ecom @wix/members
```

---

## 2. Fetching products

### List all products (Shop page)
```ts
// app/shop/page.tsx
import { wixClient } from '@/lib/wixClient';

export const dynamic = 'force-dynamic'; // or 'force-static' with revalidate

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ collection?: string }> }) {
  const { collection } = await searchParams;
  
  let query = wixClient.products.queryProducts();
  if (collection) {
    query = query.hasSome('collectionIds', [collection]);
  }
  const { items: productList } = await query.find();

  return <ShopPageView products={productList} activeCollection={collection} />;
}
```

### One product by slug (PDP)
```ts
// app/product/[slug]/page.tsx
import { wixClient } from '@/lib/wixClient';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { items } = await wixClient.products.queryProducts()
    .eq('slug', slug)
    .limit(1)
    .find();

  const product = items[0];
  if (!product) notFound();

  return <ProductPageView product={product} />;
}

// Pre-render most-popular products
export async function generateStaticParams() {
  const { items } = await wixClient.products.queryProducts().limit(50).find();
  return items.map((p) => ({ slug: p.slug! }));
}
```

### Featured products (Homepage)
Use a Wix collection named `featured` or `bestsellers`:
```ts
const { items } = await wixClient.products.queryProducts()
  .hasSome('collectionIds', ['bestsellers'])
  .limit(6)
  .find();
```

---

## 3. Mapping Wix product shape → ProductCard

The Wix `Product` object you'll get back has this shape (partial):
```ts
{
  _id: string,
  name: string,
  slug: string,
  description: string,         // HTML
  priceData: {
    price: number,
    currency: string,
    formatted: { price: string, discountedPrice: string }
  },
  media: {
    mainMedia: { image: { url: string, width, height } },
    items: [{ image: { url, width, height } }]
  },
  productOptions: [{
    name: 'Color' | 'Size',
    optionType: 'color' | 'drop_down',
    choices: [{ value: string, description: string, media: {...} }]
  }],
  ribbon: string,              // e.g., 'Best Seller'
  collectionIds: string[],
  stock: { inStock: boolean, quantity?: number },
  customTextFields: [{ title: string, maxLength: number, mandatory: boolean }],
  additionalInfoSections: [{ title: string, description: string }],
}
```

### ProductCard prop mapping
```tsx
<ProductCard product={{
  id: wixProduct._id,
  slug: wixProduct.slug,
  name: wixProduct.name,
  sub: extractSubtitle(wixProduct.description),
  price: wixProduct.priceData.price,
  formattedPrice: wixProduct.priceData.formatted.price,
  msrp: wixProduct.priceData.discountedPrice ? null : null, // only show if discounted
  tag: wixProduct.ribbon,
  imageUrl: wixProduct.media?.mainMedia?.image?.url,
  swatches: extractSwatches(wixProduct.productOptions),
  rating: wixProduct.reviews?.rating ?? null,
  reviews: wixProduct.reviews?.count ?? null,
  collection: wixProduct.collectionIds[0],
  type: deriveGlyphType(wixProduct), // for fallback SVG
}} />
```

Write helpers in `lib/wixHelpers.ts`.

---

## 4. The cart + engraving custom fields

**This is the most important integration detail.** The engraving customizer collects:
```ts
{
  engravingText: string,
  engravingFont: string,
  engravingPlacement: string,
  engravingStyle: string,
}
```

Wix Stores supports custom text on products via `customTextFields` (set up on the product in the Wix dashboard). On the cart line item, you pass these as `customLineItem.customTextFields`:

```ts
// lib/cart.ts
import { wixClient } from './wixClient';

export async function addToCart({
  productId,
  variantId,
  qty,
  engraving,
}: {
  productId: string;
  variantId: string;
  qty: number;
  engraving: {
    text: string;
    font: string;
    placement: string;
    style: string;
  } | null;
}) {
  const customTextFields = engraving ? [
    { title: 'Engraving text',     value: engraving.text },
    { title: 'Font',               value: engraving.font },
    { title: 'Placement',          value: engraving.placement },
    { title: 'Engraving style',    value: engraving.style },
  ] : undefined;

  return await wixClient.currentCart.addToCurrentCart({
    lineItems: [{
      catalogReference: {
        appId: '215238eb-22a5-4c36-9e7b-e7c08025e04e', // Wix Stores app ID
        catalogItemId: productId,
        options: {
          variantId,
          customTextFields,
        },
      },
      quantity: qty,
    }],
  });
}
```

In the Wix dashboard, **on each engravable product, add 4 custom text fields**:
- Engraving text (max 24 chars, required if engraving toggled on)
- Font (filled by app)
- Placement (filled by app)
- Engraving style (filled by app)

Or — simpler — pass all four as a single JSON-encoded text field. Talk to whoever is managing Wix to decide.

The fields show up in:
- Customer's order confirmation email
- Wix admin order details
- Wix order export CSV

---

## 5. Checkout flow

After add-to-cart, push to a Wix-hosted checkout page:

```ts
// lib/cart.ts
export async function checkout() {
  const { checkoutId } = await wixClient.currentCart.createCheckoutFromCurrentCart({
    channelType: 'WEB',
  });
  const { redirectSession } = await wixClient.redirects.createRedirectSession({
    ecomCheckout: { checkoutId },
    callbacks: {
      postFlowUrl: window.location.origin + '/thank-you',
      thankYouPageUrl: window.location.origin + '/thank-you',
    },
  });
  window.location.href = redirectSession!.fullUrl!;
}
```

Build a `/thank-you` page that confirms the order (Wix passes order ID in the URL).

---

## 6. Auth (later phase)

For a v1 launch you don't need member accounts — checkout works as guest. When you add accounts:

```ts
// Sign in
await wixClient.auth.generateOAuthData('https://donnas.co/oauth-callback');
// User redirects to Wix-hosted login, comes back to /oauth-callback
// You exchange code for tokens, store in HttpOnly cookie
```

See Wix docs: https://dev.wix.com/docs/sdk/articles/authentication/use-oauth-strategy-for-visitors-and-members

---

## 7. Collections in Wix

In the prototype, collections are static (`DONNA.collections` in `src/data.js`):
- Drinkware → `tumblers`
- Boards & Servingware → `boards`
- Home & Keepsakes → `home`
- Wallets & Accessories → `accessories`
- Wedding & Anniversary → `wedding`
- Corporate & Bulk → `corporate`

Create matching collections in the Wix dashboard. The collection slugs in Wix become the URL params on the shop page (`/shop?collection=tumblers`).

For collection metadata that doesn't live in Wix (the kicker copy: "Made to take with you"), keep a parallel `data/collections.ts` file:

```ts
export const COLLECTIONS = {
  tumblers:    { kicker: 'Made to take with you',         heroImage: '/collections/tumblers.jpg' },
  boards:      { kicker: 'For the table you set',         heroImage: '/collections/boards.jpg' },
  home:        { kicker: 'Pieces that stay with you',     heroImage: '/collections/home.jpg' },
  accessories: { kicker: 'Everyday, made personal',       heroImage: '/collections/accessories.jpg' },
  wedding:     { kicker: 'For the milestone moments',     heroImage: '/collections/wedding.jpg' },
  corporate:   { kicker: 'Gifts at scale',                heroImage: '/collections/corporate.jpg' },
};
```

---

## 8. Form submissions

The contact form and custom-inquiry form are **not** Wix flows. Use Next.js API routes that:
1. Validate input
2. Send Donna an email (Resend, Postmark, or SendGrid)
3. Optionally create a CRM/Airtable row

```ts
// app/api/custom-inquiry/route.ts
import { Resend } from 'resend';

export async function POST(req: Request) {
  const data = await req.json();
  const resend = new Resend(process.env.RESEND_API_KEY!);
  await resend.emails.send({
    from: 'Donna\'s Site <noreply@donnas.co>',
    to: 'custom@donnas.co',
    subject: `New custom inquiry: ${data.type} · ${data.name}`,
    html: render(data),
  });
  return Response.json({ ok: true });
}
```

Add `RESEND_API_KEY` to `.env.local`.

---

## 9. Env vars to add

```
# .env.local
NEXT_PUBLIC_WIX_CLIENT_ID=<from Wix Headless dashboard>
RESEND_API_KEY=<from Resend>
NEXT_PUBLIC_SITE_URL=https://donnas.co
```

Update `.env.local.example` to match.

---

## 10. Testing the integration end-to-end

Before launch:

1. Create a test product in Wix with 4 custom text fields (engraving config)
2. Visit `/product/[that-product-slug]` — should render with PDP layout
3. Type engraving text, change font/placement/style
4. Click Add to cart → see Wix cart receive the line item with custom fields visible
5. Click Checkout → redirect to Wix checkout → use Wix test card
6. Complete checkout → land on `/thank-you`
7. Check Wix order admin — the engraving fields should be on the order
8. Check Donna's email — order confirmation should include engraving details

Keep the existing `/shop-test` route as a connectivity smoke test during the build. Delete before launch.
