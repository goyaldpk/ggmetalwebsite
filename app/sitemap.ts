import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/content/products";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/products", ...PRODUCTS.map((p) => `/products/${p.slug}`), "/capabilities", "/about", "/contact"];
  return pages.map((path) => ({ url: `${SITE.url}${path}`, changeFrequency: "monthly", priority: path ? 0.7 : 1 }));
}
