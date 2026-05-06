/**
 * Custom hook untuk fetching data dari Strapi API
 * Handles loading, error, dan data states
 */

"use client";

import { useEffect, useState, useCallback } from "react";
import { strapi } from "@/lib/api/strapi";
import type {
  StrapiResponse,
  StrapiItem,
  StrapiQueryParams,
} from "@/types/strapi";

interface UseDataState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseDataOptions extends StrapiQueryParams {
  enabled?: boolean;
  retry?: number;
  cacheTime?: number;
}

/**
 * Hook untuk fetch single resource dari Strapi
 */
export function useStrapiData<T = any>(
  resourceType: string,
  id?: string | number,
  options: UseDataOptions = {},
): UseDataState<StrapiItem<T>> {
  const { enabled = true, retry = 1, ...queryParams } = options;
  const [state, setState] = useState<UseDataState<StrapiItem<T>>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    if (!enabled || !id) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retry; attempt++) {
      try {
        const response = await strapi.get<T>(
          resourceType,
          id,
          strapi.buildQuery(queryParams),
        );

        setState({
          data: response.data as StrapiItem<T>,
          loading: false,
          error: null,
        });
        return;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        if (attempt < retry) {
          // Wait before retry
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 * (attempt + 1)),
          );
        }
      }
    }

    setState({
      data: null,
      loading: false,
      error: lastError,
    });
  }, [resourceType, id, enabled, retry, queryParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return state;
}

/**
 * Hook untuk fetch list dari Strapi resource
 */
export function useStrapiBList<T = any>(
  resourceType: string,
  options: UseDataOptions = {},
): UseDataState<StrapiItem<T>[]> {
  const { enabled = true, retry = 1, ...queryParams } = options;
  const [state, setState] = useState<UseDataState<StrapiItem<T>[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    if (!enabled) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retry; attempt++) {
      try {
        const response = await strapi.list<T>(
          resourceType,
          strapi.buildQuery(queryParams),
        );

        setState({
          data: Array.isArray(response.data)
            ? response.data
            : [response.data as any],
          loading: false,
          error: null,
        });
        return;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        if (attempt < retry) {
          // Wait before retry
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 * (attempt + 1)),
          );
        }
      }
    }

    setState({
      data: null,
      loading: false,
      error: lastError,
    });
  }, [resourceType, enabled, retry, queryParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return state;
}

export default useStrapiData;
