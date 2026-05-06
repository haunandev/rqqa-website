/**
 * Sitemap Generator untuk Strapi Data
 * Digunakan di app/sitemap.ts
 */

import { strapi } from "@/lib/api/strapi";
import type { MetadataRoute } from "next";

const BASE_URL = "https://qurrota-ayun.org";

/**
 * Generate sitemap entries dari Strapi data
 */
export async function generateSitemapFromStrapi(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  const staticPages = [
    {
      url: "",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: "tentang-kami",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "program",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: "unit-program",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: "kontak",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  staticPages.forEach((page) => {
    entries.push({
      url: `${BASE_URL}/${page.url}`.replace(/\/$/, ""),
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  });

  try {
    // Fetch programs dari Strapi
    const { data: programs } = await strapi.list("programs", {
      filters: {
        publishedAt: { $notNull: true },
      },
      fields: ["slug", "updatedAt"],
      publicationState: "live",
    });

    if (Array.isArray(programs)) {
      programs.forEach((program) => {
        entries.push({
          url: `${BASE_URL}/program/${program.attributes.slug}`,
          lastModified: new Date(program.attributes.updatedAt),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        });
      });
    }
  } catch (error) {
    console.error("Failed to fetch programs for sitemap:", error);
  }

  return entries;
}
