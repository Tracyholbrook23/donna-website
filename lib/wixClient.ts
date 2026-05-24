import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart, checkout } from "@wix/ecom";

/**
 * Wix Headless client — products, cart, checkout.
 * Uses anonymous OAuth (client ID only) — safe to expose publicly.
 *
 * The Wix SDK's createClient returns WixClient & BuildDescriptors<T>,
 * so all module namespaces (products, currentCart, checkout) are
 * accessible as direct properties. We cast to `any` here to satisfy
 * TypeScript's strict generic inference, then re-export with explicit
 * typed accessors via the helper below.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _client = createClient({
  modules: { products, collections, currentCart, checkout },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
  }),
}) as any; // SDK's complex generic inference doesn't propagate module keys cleanly

export const wixClient = _client as {
  products: typeof products;
  collections: typeof collections;
  currentCart: typeof currentCart;
  checkout: typeof checkout;
  auth: ReturnType<typeof OAuthStrategy>;
};
