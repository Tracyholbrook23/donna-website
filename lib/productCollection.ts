type ProductForCollection = { name?: string | null; collectionIds?: string[] | null };
type CollectionForProduct = { id: string; wixId: string };

// Some Wix products are published without their category collection ID.
// Match the two affected categories by their product names as well.
export function belongsToCollection(product: ProductForCollection, collection: CollectionForProduct): boolean {
  if (product.collectionIds?.includes(collection.wixId)) return true;
  const name = (product.name ?? "").toLowerCase();
  if (collection.id === "decanters-sets") return /decanter|whiskey|rocks glass/.test(name);
  if (collection.id === "laserette") return name.includes("laserette");
  return false;
}
