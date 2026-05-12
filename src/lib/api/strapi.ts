/**
 * Strapi-specific API utilities
 * Wrapper khusus untuk Strapi API dengan convenience methods
 */

import { api } from "./client";
import type {
  StrapiResponse,
  StrapiItem,
  StrapiQueryParams,
  ApiResponse,
} from "@/types/strapi";

const STRAPI_API_PREFIX = "/api";

/**
 * Build Strapi API endpoint
 */
function buildEndpoint(resourceType: string, id?: string | number): string {
  let endpoint = `${STRAPI_API_PREFIX}/${resourceType}`;
  if (id) {
    endpoint += `/${id}`;
  }
  return endpoint;
}

/**
 * Strapi API client dengan convenience methods
 */
export const strapi = {
  /**
   * Get list dari resource
   */
  list: async <T = any>(
    resourceType: string,
    params?: StrapiQueryParams,
  ): Promise<StrapiResponse<StrapiItem<T>[]>> => {
    const endpoint = buildEndpoint(resourceType);
    console.log("Fetching list from Strapi:", endpoint, params);
    return api.get(endpoint, { params: params as any });
  },

  /**
   * Get single resource by id
   */
  get: async <T = any>(
    resourceType: string,
    id: string | number,
    params?: StrapiQueryParams,
  ): Promise<StrapiResponse<StrapiItem<T>>> => {
    const endpoint = buildEndpoint(resourceType, id);
    return api.get(endpoint, { params: params as any });
  },

  /**
   * Create new resource
   */
  create: async <T = any>(
    resourceType: string,
    data: any,
  ): Promise<StrapiResponse<StrapiItem<T>>> => {
    const endpoint = buildEndpoint(resourceType);
    return api.post(endpoint, { data });
  },

  /**
   * Update resource
   */
  update: async <T = any>(
    resourceType: string,
    id: string | number,
    data: any,
  ): Promise<StrapiResponse<StrapiItem<T>>> => {
    const endpoint = buildEndpoint(resourceType, id);
    return api.put(endpoint, { data });
  },

  /**
   * Delete resource
   */
  delete: async (
    resourceType: string,
    id: string | number,
  ): Promise<StrapiResponse<StrapiItem<any>>> => {
    const endpoint = buildEndpoint(resourceType, id);
    return api.delete(endpoint);
  },

  /**
   * Build query params secara convenience
   */
  buildQuery: (params?: StrapiQueryParams): StrapiQueryParams | undefined => {
    if (!params) return undefined;

    const query: any = {};

    if (params.populate) {
      query.populate = params.populate;
    }

    if (params.fields) {
      query.fields = params.fields;
    }

    if (params.filters) {
      query.filters = params.filters;
    }

    if (params.sort) {
      query.sort = params.sort;
    }

    if (params.pagination) {
      query.pagination = params.pagination;
    }

    if (params.publicationState) {
      query.publicationState = params.publicationState;
    }

    if (params.locale) {
      query.locale = params.locale;
    }

    return Object.keys(query).length > 0 ? query : undefined;
  },
};

export default strapi;
