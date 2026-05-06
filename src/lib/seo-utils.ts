/**
 * SEO Utilities untuk Strapi Integration
 * Membantu generate metadata, structured data, dan SEO-related content
 */

import { seoConfig, organizationSchema } from "./seo";

/**
 * Generate metadata untuk page dari Strapi data
 */
export function generatePageMetadata(
  title: string,
  description: string,
  imageUrl?: string,
  slug?: string,
) {
  const baseUrl = seoConfig.canonical;
  const url = slug ? `${baseUrl}/${slug}` : baseUrl;

  return {
    title: `${title} | ${seoConfig.openGraph.siteName}`,
    description,
    canonical: url,
    openGraph: {
      title,
      description,
      url,
      type: "article" as const,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: title,
              type: "image/jpeg" as const,
            },
          ]
        : seoConfig.openGraph.images,
      siteName: seoConfig.openGraph.siteName,
      locale: seoConfig.openGraph.locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
      creator: seoConfig.twitter.handle,
    },
  };
}

/**
 * Generate Article Structured Data (JSON-LD)
 */
export function generateArticleSchema(data: {
  title: string;
  description: string;
  content?: string;
  imageUrl?: string;
  slug: string;
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
}) {
  const baseUrl = seoConfig.canonical;
  const url = `${baseUrl}/${data.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title,
    description: data.description,
    image: data.imageUrl || seoConfig.openGraph.images[0].url,
    author: {
      "@type": "Organization",
      name: data.author || seoConfig.openGraph.siteName,
    },
    datePublished: data.publishedAt || new Date().toISOString(),
    dateModified: data.updatedAt || new Date().toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    publisher: {
      "@type": "Organization",
      name: seoConfig.openGraph.siteName,
      logo: {
        "@type": "ImageObject",
        url: seoConfig.openGraph.images[0].url,
      },
    },
    articleBody: data.content || data.description,
  };
}

/**
 * Generate Breadcrumb Structured Data (JSON-LD)
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate Organization Schema
 */
export function getOrganizationSchema() {
  return organizationSchema;
}

/**
 * Create safe slug dari string
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Truncate description ke length tertentu
 */
export function truncateDescription(
  text: string,
  length: number = 160,
): string {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + "...";
}

/**
 * Generate canonical URL
 */
export function getCanonicalUrl(slug?: string): string {
  const baseUrl = seoConfig.canonical;
  return slug ? `${baseUrl}/${slug}` : baseUrl;
}

/**
 * Extract text content dari HTML/Markdown
 */
export function extractTextContent(
  html: string,
  maxLength: number = 160,
): string {
  // Remove HTML tags
  const textOnly = html.replace(/<[^>]*>/g, "");
  // Decode HTML entities
  const decoded = textOnly
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  return truncateDescription(decoded, maxLength);
}

/**
 * Generate meta robots
 */
export function getMetaRobots(
  index: boolean = true,
  follow: boolean = true,
): string {
  return `${index ? "index" : "noindex"}, ${follow ? "follow" : "nofollow"}`;
}

/**
 * Validate and sanitize URL
 */
export function sanitizeUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.toString();
  } catch {
    return "";
  }
}

/**
 * Generate JSON-LD script tag content
 */
export function generateJsonLd(schema: any): string {
  return JSON.stringify(schema);
}
