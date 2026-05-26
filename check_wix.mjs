import { createClient, OAuthStrategy } from "@wix/sdk";
import { products } from "@wix/stores";

const client = createClient({
  modules: { products },
  auth: OAuthStrategy({ clientId: "2cf17a07-9259-4676-ad8b-3c2edd3d48e3" }),
});

const { items } = await client.products.queryProducts()
  .eq("slug", "40oz-tumbler-with-handle")
  .limit(1)
  .find();

const p = items[0];
console.log("=== media ===");
console.log(JSON.stringify(p?.media, null, 2));
console.log("\n=== productOptions[0].choices[0] ===");
const c = p?.productOptions?.[0]?.choices?.[0];
console.log(JSON.stringify(c, null, 2));
