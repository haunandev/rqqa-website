/**
 * Base API Client untuk HTTP requests
 * Handles common logic: error handling, headers, interceptors, dll
 */

import type { ApiError, ApiResponse } from "@/types/strapi";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const API_TOKEN = process.env.STRAPI_API_TOKEN;

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | (string | number)[]>;
  timeout?: number;
}

/**
 * Build query string dari params object
 */
function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();

  const flattenParams = (obj: any, prefix = "") => {
    Object.entries(obj).forEach(([key, value]) => {
      const fullKey = prefix ? `${prefix}[${key}]` : key;

      if (value === null || value === undefined) {
        return;
      }

      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          searchParams.append(`${fullKey}[${index}]`, String(item));
        });
      } else if (typeof value === "object") {
        flattenParams(value, fullKey);
      } else {
        searchParams.append(fullKey, String(value));
      }
    });
  };

  flattenParams(params);
  return searchParams.toString();
}

/**
 * Build full URL dengan base URL dan params
 */
function buildUrl(endpoint: string, params?: Record<string, any>): string {
  let url = `${API_BASE_URL}${endpoint}`;

  if (params && Object.keys(params).length > 0) {
    const queryString = buildQueryString(params);
    url += `?${queryString}`;
  }

  return url;
}

/**
 * Build headers untuk API request
 */
function buildHeaders(options?: RequestInit): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Add Authorization header jika ada API token
  if (API_TOKEN) {
    headers["Authorization"] = `Bearer ${API_TOKEN}`;
  }

  // Merge dengan custom headers dari options
  if (options?.headers) {
    Object.assign(headers, options.headers);
  }

  return headers;
}

/**
 * Fetch dengan timeout
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit & { timeout?: number } = {},
): Promise<Response> {
  const { timeout = 10000, ...fetchOptions } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

/**
 * Parse response dan handle errors
 */
async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  let data: any;

  try {
    data = isJson ? await response.json() : await response.text();
  } catch (error) {
    throw new Error(`Failed to parse response: ${error}`);
  }

  if (!response.ok) {
    const error: ApiError = {
      status: response.status,
      message: data?.message || data?.error?.message || "Unknown error",
      error: data?.error,
    };
    throw error;
  }

  return data;
}

/**
 * Main API client untuk requests
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { params, ...restOptions } = options;

  // Build URL dengan params
  const url = buildUrl(endpoint, params);

  // Build headers
  const headers = buildHeaders(restOptions);

  try {
    const response = await fetchWithTimeout(url, {
      ...restOptions,
      headers,
    });

    return handleResponse<T>(response);
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error(`Request timeout (${options.timeout || 10000}ms)`);
      }
      throw error;
    }
    throw new Error(`API request failed: ${error}`);
  }
}

/**
 * Shortcuts untuk common HTTP methods
 */
export const api = {
  get: <T = any>(endpoint: string, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: "GET" }),

  post: <T = any>(endpoint: string, body?: any, options?: RequestOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T = any>(endpoint: string, body?: any, options?: RequestOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T = any>(endpoint: string, body?: any, options?: RequestOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T = any>(endpoint: string, options?: RequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: "DELETE" }),
};

export default api;
