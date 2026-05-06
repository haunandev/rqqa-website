import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/*.json$", "/api/"],
      crawlDelay: 1,
    },
    sitemap: "https://qurrota-ayun.org/sitemap.xml",
  };
}
