import { wixClient } from "@/lib/wixClient";
import { FanFavoritesClient } from "@/components/FanFavoritesClient";
import type { WixProduct } from "@/components/ShopClient";

export const dynamic = "force-dynamic";

// This page shows products that are pre-made / ready-to-ship.
// These are the ONLY products on the site that can be purchased directly.
// All other products go through the custom order inquiry flow.
//
// To add items to this page: tag them with "fan-favorite" or "ready-to-ship"
// in the Wix product dashboard. For now we fetch a curated small set.

async function getFanFavorites(): Promise<WixProduct[]> {
  try {
    const { items } = await wixClient.products
      .queryProducts()
      .limit(20)
      .find();

    // Filter to products that have actual prices (not $0 placeholders)
    // and have real images. These are the "ready to ship" items.
    const ready = (items as WixProduct[]).filter((p) => {
      const price = p.priceData?.price ?? 0;
      const hasImage = !!p.media?.mainMedia?.image?.url;
      return price > 0 && hasImage;
    });

    return ready.slice(0, 12);
  } catch {
    return [];
  }
}

export default async function FanFavoritesPage() {
  const products = await getFanFavorites();
  return <FanFavoritesClient products={products} />;
}
