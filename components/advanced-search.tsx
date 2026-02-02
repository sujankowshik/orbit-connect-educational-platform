'use client'

import { useState, useCallback, useEffect } from 'react'
import { Search, X, Filter, ChevronDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useDebouncedSearch } from '@/hooks/use-async-data'

export interface SearchFilter {
  id: string
  label: string
  selected: boolean
}

export interface SearchConfig {
  placeholder?: string
  filters?: Record<string, SearchFilter[]>
  onSearch: (query: string, activeFilters: Record<string, string[]>) => void
  debounceMs?: number
}

export function AdvancedSearch({ placeholder = 'Search...', filters, onSearch, debounceMs = 300 }: SearchConfig) {
  const { searchValue, setSearchValue, debouncedValue, isSearching } = useDebouncedSearch('', debounceMs)
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})
  const [expandedFilters, setExpandedFilters] = useState<Set<string>>(new Set())

  // Trigger search when debounced value changes
  useEffect(() => {
    onSearch(debouncedValue, activeFilters)
  }, [debouncedValue, activeFilters, onSearch])

  const handleFilterToggle = (category: string, filterId: string) => {
    setActiveFilters((prev) => {
      const categoryFilters = prev[category] || []
      const updated = categoryFilters.includes(filterId)
        ? categoryFilters.filter((id) => id !== filterId)
        : [...categoryFilters, filterId]

      return {
        ...prev,
        [category]: updated.length > 0 ? updated : undefined,
      }
    })
  }

  const toggleFilterExpanded = (category: string) => {
    setExpandedFilters((prev) => {
      const next = new Set(prev)
      if (next.has(category)) {
        next.delete(category)
      } else {
        next.add(category)
      }
      return next
    })
  }

  const clearAllFilters = () => {
    setActiveFilters({})
    setSearchValue('')
  }

  const hasActiveFilters = Object.values(activeFilters).some((arr) => arr?.length ?? 0 > 0)

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-10 pr-8 bg-background/50 border-primary/30 placeholder-muted-foreground/50 text-foreground focus:border-primary"
        />
        {(searchValue || isSearching) && (
          <button
            onClick={() => setSearchValue('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {(hasActiveFilters || searchValue) && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active:</span>
          {searchValue && (
            <Badge variant="secondary" className="gap-2">
              Search: {searchValue}
              <button
                onClick={() => setSearchValue('')}
                className="hover:text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {Object.entries(activeFilters).map(
            ([category, ids]) =>
              ids && (
                <div key={category} className="flex gap-2 flex-wrap">
                  {ids.map((id) => {
                    const filter = filters?.[category]?.find((f) => f.id === id)
                    return (
                      <Badge key={id} variant="secondary" className="gap-2">
                        {filter?.label}
                        <button
                          onClick={() => handleFilterToggle(category, id)}
                          className="hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )
                  })}
                </div>
              )
          )}
          <button
            onClick={clearAllFilters}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Filter Accordion */}
      {filters && Object.keys(filters).length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-1">
            <Filter className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Filters</span>
          </div>
          <div className="space-y-2">
            {Object.entries(filters).map(([category, options]) => (
              <div key={category} className="border border-border/50 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFilterExpanded(category)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-background/50 hover:bg-background transition-colors"
                >
                  <span className="text-sm font-medium text-foreground capitalize">{category}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform ${expandedFilters.has(category) ? 'rotate-180' : ''}`}
                  />
                </button>

                {expandedFilters.has(category) && (
                  <div className="px-4 py-3 space-y-2 bg-card/50">
                    {options.map((option) => {
                      const isSelected = activeFilters[category]?.includes(option.id) ?? false
                      return (
                        <label key={option.id} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleFilterToggle(category, option.id)}
                            className="w-4 h-4 accent-primary rounded cursor-pointer"
                          />
                          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                            {option.label}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Preset search configurations
export const searchConfigs = {
  defaultConfig: {
    placeholder: 'Search...',
    debounceMs: 300,
  },

  contentConfig: {
    placeholder: 'Search stories, courses, and satellites...',
    debounceMs: 300,
    filters: {
      'Content Type': [
        { id: 'story', label: 'Stories', selected: false },
        { id: 'course', label: 'Courses', selected: false },
        { id: 'satellite', label: 'Satellites', selected: false },
        { id: 'case', label: 'Case Studies', selected: false },
      ],
      Category: [
        { id: 'emergency', label: 'Emergency Response', selected: false },
        { id: 'education', label: 'Education', selected: false },
        { id: 'environment', label: 'Environment', selected: false },
        { id: 'community', label: 'Community', selected: false },
      ],
    },
  },

  productsConfig: {
    placeholder: 'Search products...',
    debounceMs: 300,
    filters: {
      Category: [
        { id: 'satellite', label: 'Satellite Tech', selected: false },
        { id: 'communication', label: 'Communication', selected: false },
        { id: 'monitoring', label: 'Monitoring', selected: false },
      ],
      Price: [
        { id: 'budget', label: 'Under $100K', selected: false },
        { id: 'mid', label: '$100K - $500K', selected: false },
        { id: 'enterprise', label: '$500K+', selected: false },
      ],
    },
  },
}
