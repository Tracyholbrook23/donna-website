import { wixClient } from "@/lib/wixClient";
import { ShopClient, type WixProduct } from "@/components/ShopClient";

export const dynamic = "force-dynamic";

async function getAllProducts(): Promise<WixProduct[]> {
  try {
    const { items } = await wixClient.products
      .queryProducts()
      .limit(100)
      .find();
    return items as WixProduct[];
  } catch {
    return [];
  }
}

export default async function ShopPage() {
  const products = await getAllProducts();
  return <ShopClient initialProducts={products} />;
}
