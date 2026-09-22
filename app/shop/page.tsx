import { wixClient } from "@/lib/wixClient";
import { ShopClient, type WixProduct } from "@/components/ShopClient";

export const dynamic = "force-dynamic";

async function getAllProducts(): Promise<WixProduct[]> {
  try {
    let all: WixProduct[] = [];
    let page = 0;
    while (true) {
      const { items } = await wixClient.products
        .queryProducts()
        .skip(page * 100)
        .limit(100)
        .find();
      all = all.concat(items as WixProduct[]);
      if (items.length < 100) break;
      page++;
    }
    return all;
  } catch {
    return [];
  }
}

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ collection?: string }> }) {
  const [{ collection }, products] = await Promise.all([searchParams, getAllProducts()]);
  return <ShopClient key={collection ?? "all"} initialProducts={products} initialCollection={collection} />;
}
