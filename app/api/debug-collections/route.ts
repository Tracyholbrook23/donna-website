import { wixClient } from "@/lib/wixClient";
import { NextResponse } from "next/server";

// Temp debug route — visit /api/debug-collections to see ALL real Wix collection IDs
export async function GET() {
  try {
    const allItems = [];
    let cursor: string | null | undefined = undefined;

    // Page through all products (Wix max 100 per page)
    do {
      const query = wixClient.products.queryProducts().limit(100);
      const result = cursor
        ? await (query as unknown as { skipTo: (c: string) => typeof query }).skipTo(cursor).find()
        : await query.find();
      allItems.push(...result.items);
      cursor = result.hasNext() ? result.cursors?.next : undefined;
    } while (cursor);

    // Collect unique collection IDs and count products per collection
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
