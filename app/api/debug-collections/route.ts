import { wixClient } from "@/lib/wixClient";
import { NextResponse } from "next/server";

// Temp debug route — visit /api/debug-collections to see real Wix collection IDs
export async function GET() {
  try {
    const { items } = await wixClient.products.queryProducts().limit(20).find();

    // Collect unique collection IDs across all fetched products
    const collectionSet = new Set<string>();
    for (const p of items) {
      const ids = (p as Record<string, unknown>).collectionIds;
      if (Array.isArray(ids)) {
        ids.forEach((id: string) => collectionSet.add(id));
      }
    }

    return NextResponse.json({
      totalProducts: items.length,
      uniqueCollectionIds: [...collectionSet],
      sampleProducts: items.slice(0, 5).map((p) => ({
        name: p.name,
        collectionIds: (p as Record<string, unknown>).collectionIds,
      })),
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
