import { wixClient } from "@/lib/wixClient";
import { NextResponse } from "next/server";

// Temp debug route — visit /api/debug-collections to see real Wix collection IDs
export async function GET() {
  try {
    const page1 = await wixClient.products.queryProducts().limit(100).find();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const page2 = await (page1 as any).next().catch(() => ({ items: [] }));

    const allItems = [...page1.items, ...(page2.items ?? [])];

    const collectionMap: Record<string, string[]> = {};
    for (const p of allItems) {
      const ids = (p as Record<string, unknown>).collectionIds;
      if (Array.isArray(ids)) {
        for (const id of ids as string[]) {
          if (!collectionMap[id]) collectionMap[id] = [];
          collectionMap[id].push(p.name ?? "?");
        }
      }
    }

    return NextResponse.json({
      totalProductsFetched: allItems.length,
      collectionBreakdown: Object.entries(collectionMap).map(([id, names]) => ({
        wixCollectionId: id,
        productCount: names.length,
        sampleProducts: names.slice(0, 3),
      })),
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
