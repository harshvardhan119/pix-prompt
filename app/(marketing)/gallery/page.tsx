'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, Filter } from 'lucide-react'
import { FilterModal, type FilterState } from '@/components/layout/filter-modal'
import { InfiniteScroll } from '@/components/common/infinite-scroll'
import { EmptyState } from '@/components/common/empty-state'
import { PromptCard } from '@/components/cards/prompt-card'
import { usePrompts, useSearchPrompts } from '@/lib/hooks/use-prompts'
import { useQuery } from '@tanstack/react-query'
import type { Prompt, Category } from '@/types/prompt'

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    generators: [],
    categories: [],
    complexities: [],
  })

  // Fetch real categories from database
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('/api/categories')
      const result = await response.json()
      return result.data as Category[]
    },
  })

  // Use React Query for data fetching with automatic caching
  const promptsQuery = usePrompts()
  const searchQuery_enabled = searchQuery.length > 0
  const searchPromptsQuery = useSearchPrompts(searchQuery, searchQuery_enabled)

  // Choose which query to use based on search state
  const activeQuery = searchQuery ? searchPromptsQuery : promptsQuery

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = activeQuery

  // Flatten paginated data and apply client-side filters
  const allPrompts = data?.pages.flatMap((page) => page.data) || []

  const prompts = useMemo(() => {
    let filtered = allPrompts

    // Filter by generators
    if (activeFilters.generators.length > 0) {
      filtered = filtered.filter((p) => activeFilters.generators.includes(p.generator))
    }

    // Filter by categories
    if (activeFilters.categories.length > 0) {
      filtered = filtered.filter((p) => activeFilters.categories.includes(p.category))
    }

    // Filter by complexities
    if (activeFilters.complexities.length > 0) {
      filtered = filtered.filter((p) => activeFilters.complexities.includes(p.complexity))
    }

    return filtered
  }, [allPrompts, activeFilters])

  const handleApplyFilters = (filters: FilterState) => {
    setActiveFilters(filters)
  }

  const hasActiveFilters =
    activeFilters.generators.length > 0 ||
    activeFilters.categories.length > 0 ||
    activeFilters.complexities.length > 0

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-100 py-3 px-4 md:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-700" />
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-primary focus:border-transparent"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(true)}
            className="relative"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {activeFilters.generators.length + activeFilters.categories.length + activeFilters.complexities.length}
              </span>
            )}
          </Button>
          <FilterModal
            open={showFilters}
            onOpenChange={setShowFilters}
            onApplyFilters={handleApplyFilters}
            initialFilters={activeFilters}
          />
        </div>
      </div>

      <div className="flex">
        {/* Category Sidebar - Desktop Only */}
        <aside className="hidden lg:block fixed left-0 top-32 w-60 h-[calc(100vh-8rem)] bg-gray-50 border-r border-gray-100 overflow-y-auto">
          <div className="p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Categories</h3>
            <nav className="space-y-1">
              <Link
                href="/gallery"
                className="block px-4 py-3 text-sm text-gray-700 hover:bg-white hover:text-gray-900 rounded-lg transition"
              >
                <div className="flex justify-between items-center">
                  <span>All</span>
                  <span className="text-xs text-gray-500">{prompts.length}</span>
                </div>
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-white hover:text-gray-900 rounded-lg transition"
                >
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      {cat.icon && <span>{cat.icon}</span>}
                      {cat.name}
                    </span>
                    <span className="text-xs text-gray-500">{cat.promptCount || 0}</span>
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Gallery Grid */}
        <main className="flex-1 lg:ml-60 p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {isLoading && prompts.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 h-64 rounded-lg mb-3"></div>
                    <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                    <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : prompts.length === 0 ? (
              <EmptyState
                icon="🔍"
                title="No prompts found"
                description="Try adjusting your search filters"
                action={{
                  label: 'Clear Filters',
                  onClick: () => setSearchQuery('')
                }}
              />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4">
                  {prompts.map((prompt) => (
                    <Link key={prompt.id} href={`/prompts/${prompt.slug}`}>
                      <PromptCard prompt={prompt as Prompt} />
                    </Link>
                  ))}
                </div>
                <InfiniteScroll
                  isLoading={isFetchingNextPage}
                  hasMore={hasNextPage || false}
                  onLoadMore={() => fetchNextPage()}
                />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

