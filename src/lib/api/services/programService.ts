/**
 * Example Service untuk Program resource
 * Sesuaikan dengan struktur data Strapi Anda
 */

import { strapi } from "@/lib/api/strapi";
import type { StrapiItem } from "@/types/strapi";

/**
 * Program interface - sesuaikan dengan struktur di Strapi
 * Fields: slug, description, title, media, content
 */
interface Program {
  title: string;
  slug: string;
  description: string;
  content?: string; // Rich text (Markdown)
  media?: {
    data: Array<{
      id: number;
      attributes: {
        url: string;
        alternativeText?: string;
        name: string;
        mime: string;
        size: number;
        width?: number;
        height?: number;
      };
    }>;
  };
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Program Service
 * Methods untuk operasi CRUD pada Program resource
 */
export const programService = {
  /**
   * Get semua program
   * Query dengan populate image dan sort by createdAt descending
   */
  getAll: async (params = {}) => {
    return strapi.list<Program>("programs", {
      populate: ["media"],
      sort: "createdAt:desc",
      ...params,
    });
  },

  /**
   * Get program yang sudah dipublish
   * Berguna untuk public-facing pages
   */
  getPublished: async (pagination = { pageSize: 10 }) => {
    return strapi.list<Program>("programs", {
      filters: {
        publishedAt: {
          $notNull: true,
        },
      },
      populate: ["media"],
      sort: "createdAt:desc",
      pagination,
      publicationState: "live",
    });
  },

  /**
   * Get single program by ID
   */
  getById: async (id: number) => {
    return strapi.get<Program>("programs", id, {
      populate: ["media"],
    });
  },

  /**
   * Get program by slug
   * Untuk dynamic routes
   */
  getBySlug: async (slug: string) => {
    const response = await strapi.list<Program>("programs", {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: ["media"],
      publicationState: "live",
    });

    return response.data?.[0];
  },

  /**
   * Create program baru
   * Hanya untuk authenticated users dengan permission
   */
  create: async (data: Partial<Program>) => {
    return strapi.create<Program>("programs", data);
  },

  /**
   * Update program
   */
  update: async (id: number, data: Partial<Program>) => {
    return strapi.update<Program>("programs", id, data);
  },

  /**
   * Delete program
   */
  delete: async (id: number) => {
    return strapi.delete("programs", id);
  },

  /**
   * Search programs
   */
  search: async (query: string, pagination = { pageSize: 20 }) => {
    return strapi.list<Program>("programs", {
      filters: {
        $or: [
          { title: { $contains: query } },
          { description: { $contains: query } },
        ],
      },
      populate: ["media"],
      pagination,
      publicationState: "live",
    });
  },
};

export default programService;
