import { createClient, OAuthStrategy } from "@wix/sdk";
import { products } from "@wix/stores";

/**
 * Wix Headless client — used for fetching products, collections, etc.
 * Auth uses anonymous OAuth (client ID only) which is safe to expose publicly.
 *
 * Later phases will add:
 *   - members (login/auth)
 *   - cart + checkout
 */
export const wixClient = createClient({
  modules: { products },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
  }),
});
