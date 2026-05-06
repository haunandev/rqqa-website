/**
 * Strapi API Response Types
 * Common types untuk response dari Strapi API
 */

/**
 * Generic Strapi data response
 * Strapi mengembalikan data dengan format ini
 */
export interface StrapiResponse<T> {
  data: T | T[] | null;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Generic Strapi item dengan id dan attributes
 */
export interface StrapiItem<T> {
  id: number;
  attributes: T;
}

/**
 * Pagination parameters untuk Strapi queries
 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  start?: number;
  limit?: number;
}

/**
 * Filter parameters untuk Strapi queries
 */
export interface FilterParams {
  [key: string]: string | number | boolean | object;
}

/**
 * Query parameters untuk Strapi requests
 */
export interface StrapiQueryParams {
  populate?: string | string[] | Record<string, any>;
  fields?: string[];
  filters?: FilterParams;
  sort?: string | string[];
  pagination?: PaginationParams;
  publicationState?: "live" | "preview";
  locale?: string;
  [key: string]: any;
}

/**
 * API Error response
 */
export interface ApiError {
  status: number;
  message: string;
  error?: {
    status: number;
    name: string;
    message: string;
  };
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError | string;
  timestamp?: string;
}
