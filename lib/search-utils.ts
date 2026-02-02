// Advanced search and filtering utilities

export interface SearchResult<T> {
  item: T
  relevance: number
  highlights: string[]
}

export interface FilterOption {
  id: string
  label: string
  count: number
}

// Case-insensitive search with relevance scoring
export function searchItems<T>(
  items: T[],
  query: string,
  searchFields: (keyof T)[],
  options?: {
    caseSensitive?: boolean
    minRelevance?: number
  }
): SearchResult<T>[] {
  if (!query.trim()) return items.map((item) => ({ item, relevance: 1, highlights: [] }))

  const searchQuery = options?.caseSensitive ? query : query.toLowerCase()
  const words = searchQuery.split(/\s+/).filter((w) => w.length > 0)

  return items
    .map((item) => {
      let relevance = 0
      const highlights: string[] = []

      searchFields.forEach((field) => {
        const value = String(item[field] || '')
        const valueToSearch = options?.caseSensitive ? value : value.toLowerCase()

        // Exact match (highest priority)
        if (valueToSearch === searchQuery) {
          relevance += 3
          highlights.push(`${String(field)}: exact match`)
        }

        // Contains full query (high priority)
        if (valueToSearch.includes(searchQuery)) {
          relevance += 2
          highlights.push(`${String(field)}: contains query`)
        }

        // Match individual words
        words.forEach((word) => {
          if (valueToSearch.includes(word)) {
            relevance += 1
          }
        })
      })

      return { item, relevance, highlights }
    })
    .filter((result) => result.relevance > (options?.minRelevance ?? 0))
    .sort((a, b) => b.relevance - a.relevance)
}

// Advanced filtering with multiple criteria
export function filterItems<T>(
  items: T[],
  filters: Record<string, string | string[] | number | boolean>,
  filterFunctions?: Record<string, (item: T, filterValue: string | string[] | number | boolean) => boolean>
): T[] {
  return items.filter((item) => {
    for (const [key, value] of Object.entries(filters)) {
      if (value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
        continue
      }

      if (filterFunctions?.[key]) {
        if (!filterFunctions[key](item, value)) {
          return false
        }
      } else {
        const itemValue = (item as Record<string, unknown>)[key]
        if (Array.isArray(value)) {
          if (!value.includes(String(itemValue))) {
            return false
          }
        } else if (itemValue !== value) {
          return false
        }
      }
    }
    return true
  })
}

// Combine search and filter
export function searchAndFilter<T>(
  items: T[],
  query: string,
  filters: Record<string, string | string[] | number | boolean>,
  options?: {
    searchFields?: (keyof T)[]
    filterFunctions?: Record<string, (item: T, filterValue: string | string[] | number | boolean) => boolean>
    minRelevance?: number
  }
): SearchResult<T>[] {
  const filtered = filterItems(items, filters, options?.filterFunctions)
  return searchItems(filtered, query, options?.searchFields || [], { minRelevance: options?.minRelevance })
}

// Count occurrences for filter options
export function getFilterCounts<T>(
  items: T[],
  field: keyof T,
  options?: { limit?: number }
): FilterOption[] {
  const counts = new Map<string, number>()

  items.forEach((item) => {
    const value = String(item[field] || 'Unknown')
    counts.set(value, (counts.get(value) || 0) + 1)
  })

  return Array.from(counts.entries())
    .map(([label, count]) => ({
      id: label.toLowerCase().replace(/\s+/g, '-'),
      label,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, options?.limit)
}

// Debounce search queries
export function debounceSearch<T>(
  callback: (results: SearchResult<T>[]) => void,
  delay: number = 300
) {
  let timeoutId: NodeJS.Timeout

  return (results: SearchResult<T>[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      callback(results)
    }, delay)
  }
}
