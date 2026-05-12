/**
 * Article Service untuk Strapi Integration
 * Sesuaikan dengan struktur artikel di Strapi Anda
 */

import { strapi } from "@/lib/api/strapi";
import type { StrapiItem } from "@/types/strapi";

/**
 * Article interface - sesuaikan dengan struktur di Strapi
 * Fields: title, description, slug, cover, author, category, blocks
 */
export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  cover?: {
    id: number;
    name: string;
    alternativeText?: string;
    url: string;
    mime: string;
    size: number;
    width?: number;
    height?: number;
    formats?: {
      large?: { url: string };
      medium?: { url: string };
      small?: { url: string };
      thumbnail?: { url: string };
    };
  };
  author?: {
    id: number;
    name: string;
    email: string;
  };
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  blocks?: any[]; // Dynamic zone
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Article Service
 * Methods untuk operasi CRUD pada Article resource
 */
export const articleService = {
  /**
   * Get semua artikel
   */
  getAll: async (params = {}) => {
    return strapi.list<Article>("articles", {
      "populate[0]": "cover",
      "populate[1]": "author",
      "populate[2]": "category",
      sort: "publishedAt:desc",
      ...params,
    });
  },

  /**
   * Get artikel yang sudah dipublish
   * Untuk public-facing pages
   */
  getPublished: async (pagination = { pageSize: 10 }) => {
    return strapi.list<Article>("articles", {
      "filters[publishedAt][$notNull]": true,
      "populate[0]": "cover",
      "populate[1]": "author",
      "populate[2]": "category",
      sort: "publishedAt:desc",
      pagination,
      publicationState: "live",
    });
  },

  /**
   * Get latest articles
   * Untuk homepage featured articles
   */
  getLatest: async (limit: number = 6) => {
    return strapi.list<Article>("articles", {
      "filters[publishedAt][$notNull]": true,
      "populate[0]": "cover",
      "populate[1]": "author",
      "populate[2]": "category",
      sort: "publishedAt:desc",
      pagination: { limit },
      publicationState: "live",
    });
  },

  /**
   * Get single artikel by ID
   */
  getById: async (id: number) => {
    return strapi.get<Article>("articles", id, {
      "populate[0]": "cover",
      "populate[1]": "author",
      "populate[2]": "category",
      "populate[3]": "blocks",
    });
  },

  /**
   * Get artikel by slug
   * Untuk dynamic routes
   */
  getBySlug: async (slug: string) => {
    console.log("articleService.getBySlug: Fetching article with slug:", slug);
    const response = await strapi.list<Article>("articles", {
      "filters[slug][$eq]": slug,
      "populate[0]": "cover",
      "populate[1]": "author",
      "populate[2]": "category",
      "populate[3]": "blocks",
      publicationState: "live",
    });
    console.log("articleService.getBySlug: API response:", response);

    return response.data?.[0];
  },

  /**
   * Get artikel by category
   */
  getByCategory: async (
    categorySlug: string,
    pagination = { pageSize: 10 },
  ) => {
    return strapi.list<Article>("articles", {
      "filters[category][slug][$eq]": categorySlug,
      "filters[publishedAt][$notNull]": true,
      "populate[0]": "cover",
      "populate[1]": "author",
      "populate[2]": "category",
      sort: "publishedAt:desc",
      pagination,
      publicationState: "live",
    });
  },

  /**
   * Get artikel by author
   */
  getByAuthor: async (authorId: number, pagination = { pageSize: 10 }) => {
    return strapi.list<Article>("articles", {
      "filters[author][id][$eq]": authorId,
      "filters[publishedAt][$notNull]": true,
      "populate[0]": "cover",
      "populate[1]": "author",
      "populate[2]": "category",
      sort: "publishedAt:desc",
      pagination,
      publicationState: "live",
    });
  },

  /**
   * Create artikel baru
   */
  create: async (data: Partial<Article>) => {
    return strapi.create<Article>("articles", data);
  },

  /**
   * Update artikel
   */
  update: async (id: number, data: Partial<Article>) => {
    return strapi.update<Article>("articles", id, data);
  },

  /**
   * Delete artikel
   */
  delete: async (id: number) => {
    return strapi.delete("articles", id);
  },

  /**
   * Search artikel
   */
  search: async (query: string, pagination = { pageSize: 20 }) => {
    return strapi.list<Article>("articles", {
      "filters[$or][0][title][$contains]": query,
      "filters[$or][1][description][$contains]": query,
      "populate[0]": "cover",
      "populate[1]": "author",
      "populate[2]": "category",
      pagination,
      publicationState: "live",
    });
  },

  /**
   * Get related articles
   * Artikel dengan category yang sama
   */
  getRelated: async (
    categoryId: number,
    excludeId: number,
    limit: number = 3,
  ) => {
    return strapi.list<Article>("articles", {
      "filters[category][id][$eq]": categoryId,
      "filters[id][$ne]": excludeId,
      "filters[publishedAt][$notNull]": true,
      "populate[0]": "cover",
      "populate[1]": "author",
      "populate[2]": "category",
      sort: "publishedAt:desc",
      pagination: { limit },
      publicationState: "live",
    });
  },
};

export default articleService;
