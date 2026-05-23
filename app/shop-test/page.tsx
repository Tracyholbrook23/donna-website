import { redirect } from "next/navigation";

// This test page has been superseded by the full shop at /shop
export default function ShopTestRedirect() {
  redirect("/shop");
}
