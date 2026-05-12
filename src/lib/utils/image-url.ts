/**
 * Image URL utility
 * Handles image URL transformation from Strapi API
 */

const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/**
 * Get full image URL from Strapi relative path
 * Automatically prepends the Strapi base URL if needed
 *
 * @param relativePath - Image path from Strapi (e.g., "/uploads/image.jpg")
 * @returns Full image URL (e.g., "http://localhost:1337/uploads/image.jpg")
 */
export function getImageUrl(relativePath?: string): string | undefined {
  if (!relativePath) {
    return undefined;
  }

  // If already has full URL, return as is
  if (
    relativePath.startsWith("http://") ||
    relativePath.startsWith("https://")
  ) {
    return relativePath;
  }

  // Add Strapi base URL to relative path
  return `${STRAPI_BASE_URL}${relativePath}`;
}

/**
 * Get optimized image URL with size format
 * Strapi provides multiple sizes: large, medium, small, thumbnail
 *
 * @param formats - Image formats object from Strapi
 * @param size - Desired size: 'large', 'medium', 'small', or 'thumbnail'
 * @returns Optimized image URL or undefined
 */
export function getOptimizedImageUrl(
  formats?: {
    large?: { url: string };
    medium?: { url: string };
    small?: { url: string };
    thumbnail?: { url: string };
  },
  size: "large" | "medium" | "small" | "thumbnail" = "medium",
): string | undefined {
  const selectedFormat = formats?.[size];
  if (!selectedFormat) {
    return undefined;
  }

  return getImageUrl(selectedFormat.url);
}
