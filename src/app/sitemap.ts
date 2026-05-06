import type { MetadataRoute } from "next";
import { generateSitemapFromStrapi } from "@/lib/sitemap-generator";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return generateSitemapFromStrapi();
}
