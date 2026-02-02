'use client';

import React from "react"

import { useState, useEffect, useCallback } from 'react'

export interface UseAsyncDataState<T> {
  data: T | null
  loading: boolean
  error: Error | null
  retry: () => void
}

/**
 * Hook for managing async data fetching with loading and error states
 * @param fetchFn - Async function to fetch data
 * @param dependencies - Dependency array to re-run fetch
 * @returns Object with data, loading, error, and retry function
 */
export function useAsyncData<T>(
  fetchFn: () => Promise<T>,
  dependencies: React.DependencyList = [],
): UseAsyncDataState<T> {
  const [state, setState] = useState<UseAsyncDataState<T>>({
    data: null,
    loading: true,
    error: null,
    retry: () => {},
  })

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      const result = await fetchFn()
      setState((prev) => ({ ...prev, data: result, loading: false, error: null }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error : new Error(String(error)),
        loading: false,
      }))
    }
  }, [fetchFn])

  useEffect(() => {
    execute()
  }, dependencies)

  return {
    ...state,
    retry: execute,
  }
}

/**
 * Hook for managing paginated data fetching
 * @param fetchFn - Async function that accepts page number and returns data
 * @param pageSize - Items per page
 */
export function usePaginatedData<T>(
  fetchFn: (page: number) => Promise<T[]>,
  pageSize: number = 10,
) {
  const [page, setPage] = useState(1)
  const [allData, setAllData] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchPage = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchFn(page)
      if (data.length < pageSize) {
        setHasMore(false)
      }
      setAllData((prev) => [...prev, ...data])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      setLoading(false)
    }
  }, [page, fetchFn, pageSize])

  useEffect(() => {
    if (page === 1) {
      setAllData([])
    }
    fetchPage()
  }, [page])

  return {
    data: allData,
    loading,
    error,
    hasMore,
    page,
    goToPage: setPage,
    nextPage: () => setPage((p) => p + 1),
    resetPagination: () => {
      setPage(1)
      setAllData([])
      setHasMore(true)
    },
  }
}

/**
 * Hook for managing debounced search/filter operations
 * @param initialValue - Initial search value
 * @param debounceMs - Milliseconds to debounce
 */
export function useDebouncedSearch(initialValue: string = '', debounceMs: number = 300) {
  const [searchValue, setSearchValue] = useState(initialValue)
  const [debouncedValue, setDebouncedValue] = useState(initialValue)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(searchValue)
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [searchValue, debounceMs])

  return {
    searchValue,
    setSearchValue,
    debouncedValue,
    isSearching: searchValue !== debouncedValue,
  }
}

/**
 * Hook for managing loading state with minimum duration
 * Useful for avoiding UI flicker on fast operations
 */
export function useLoadingWithDelay(isLoading: boolean, minDuration: number = 300) {
  const [displayLoading, setDisplayLoading] = useState(isLoading)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (isLoading) {
      setDisplayLoading(true)
    } else {
      // Delay hiding the loading state to avoid flicker
      timeoutId = setTimeout(() => {
        setDisplayLoading(false)
      }, minDuration)
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isLoading, minDuration])

  return displayLoading
}
