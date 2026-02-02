'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { searchItems, filterItems, SearchResult } from '@/lib/search-utils'

interface DataItem {
  id: string
  title: string
  description: string
  type: 'satellite' | 'case-study' | 'course' | 'story'
  category: string
  date: string
  featured: boolean
}

const mockData: DataItem[] = [
  {
    id: '1',
    title: 'Real-time Disaster Tracking',
    description: 'How satellite technology enables rapid response to natural disasters',
    type: 'case-study',
    category: 'Emergency Response',
    date: '2024-01-15',
    featured: true,
  },
  {
    id: '2',
    title: 'ISS Earth Observation',
    description: 'International Space Station provides continuous monitoring of Earth',
    type: 'satellite',
    category: 'Monitoring',
    date: '2024-01-10',
    featured: true,
  },
  {
    id: '3',
    title: 'Satellite Communication Basics',
    description: 'Introduction to satellite networks and their role in global connectivity',
    type: 'course',
    category: 'Education',
    date: '2024-01-08',
    featured: false,
  },
  {
    id: '4',
    title: 'Community Recovery Story',
    description: 'How satellite data helped a small village recover from flood damage',
    type: 'story',
    category: 'Community',
    date: '2024-01-05',
    featured: false,
  },
  {
    id: '5',
    title: 'Weather Prediction Systems',
    description: 'Meteorological satellites revolutionize weather forecasting',
    type: 'course',
    category: 'Education',
    date: '2024-01-01',
    featured: false,
  },
  {
    id: '6',
    title: 'Forest Monitoring Initiative',
    description: 'Using satellite imagery to track deforestation and environmental changes',
    type: 'case-study',
    category: 'Environment',
    date: '2023-12-28',
    featured: true,
  },
]

const typeColors: Record<string, string> = {
  'satellite': 'from-blue-400 to-blue-600',
  'case-study': 'from-purple-400 to-purple-600',
  'course': 'from-green-400 to-green-600',
  'story': 'from-pink-400 to-pink-600',
}

export default function Explorer() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(mockData.map((item) => item.category)))
  const types = Array.from(new Set(mockData.map((item) => item.type)))

  const results = useMemo(() => {
    let filtered = mockData

    if (selectedType) {
      filtered = filtered.filter((item) => item.type === selectedType)
    }

    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      return searchItems(filtered, searchQuery, ['title', 'description'], {
        minRelevance: 1,
      })
    }

    return filtered.map((item) => ({
      item,
      relevance: 1,
      highlights: [],
    }))
  }, [searchQuery, selectedType, selectedCategory])

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
        {/* Header */}
        <div className="text-center space-y-4 animate-slide-in-up">
          <div className="inline-block px-4 py-2 rounded-full glass-effect text-primary text-sm font-semibold">
            Content Explorer
          </div>
          <h1 className="text-5xl font-bold gradient-text">Discover Resources</h1>
          <p className="text-lg text-muted-foreground">
            Search and explore satellite technology content, courses, and stories
          </p>
        </div>

        {/* Search Bar */}
        <div className="glass-effect border border-primary/30 rounded-2xl p-6 glow-effect">
          <div className="flex items-center gap-3">
            <Search className="w-6 h-6 text-primary flex-shrink-0" />
            <Input
              placeholder="Search by title, topic, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 bg-transparent text-lg placeholder-muted-foreground focus:outline-none"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Type Filter */}
            <div className="glass-effect border border-border/50 rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Content Type</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedType(null)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedType === null
                      ? 'bg-primary text-primary-foreground'
                      : 'glass-effect text-foreground hover:border-primary'
                  }`}
                >
                  All Types
                </button>
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-lg transition-all capitalize ${
                      selectedType === type
                        ? 'bg-primary text-primary-foreground'
                        : 'glass-effect text-foreground hover:border-primary'
                    }`}
                  >
                    {type === 'case-study' ? 'Case Study' : type === 'satellite' ? 'Satellite' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="glass-effect border border-border/50 rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Category</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === null
                      ? 'bg-primary text-primary-foreground'
                      : 'glass-effect text-foreground hover:border-primary'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground'
                        : 'glass-effect text-foreground hover:border-primary'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(searchQuery || selectedType || selectedCategory) && (
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-muted-foreground">Active filters:</span>
            {searchQuery && (
              <Badge variant="secondary" className="gap-2">
                Search: {searchQuery}
                <button onClick={() => setSearchQuery('')} className="hover:text-destructive">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {selectedType && (
              <Badge variant="secondary" className="gap-2">
                Type: {selectedType}
                <button onClick={() => setSelectedType(null)} className="hover:text-destructive">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {selectedCategory && (
              <Badge variant="secondary" className="gap-2">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory(null)} className="hover:text-destructive">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
          </div>
        )}

        {/* Results */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">
            {results.length} {results.length === 1 ? 'Result' : 'Results'}
          </h2>

          {results.length > 0 ? (
            <div className="grid gap-6">
              {results.map((result: SearchResult<DataItem>, i: number) => {
                const item = result.item
                const colorClass = typeColors[item.type] || 'from-primary to-accent'
                return (
                  <div
                    key={item.id}
                    className="glass-effect border border-primary/30 rounded-2xl p-6 hover:border-primary/50 transition-all cursor-pointer group glow-effect"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-3 mb-2">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClass} flex-shrink-0`}></div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate">
                              {item.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                          </div>
                        </div>
                      </div>
                      {item.featured && <Badge className="bg-accent text-accent-foreground">Featured</Badge>}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-primary/20">
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs capitalize">
                          {item.type === 'case-study' ? 'Case Study' : item.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="glass-effect border border-primary/30 rounded-2xl p-12 text-center">
              <p className="text-lg text-muted-foreground mb-3">No results found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedType(null)
                  setSelectedCategory(null)
                }}
                className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
