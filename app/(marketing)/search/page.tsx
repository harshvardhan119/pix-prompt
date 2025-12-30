'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { PromptCard } from '@/components/cards/prompt-card'
import { InfiniteScroll } from '@/components/common/infinite-scroll'
import { EmptyState } from '@/components/common/empty-state'
import { useSearchPrompts } from '@/lib/hooks/use-prompts'
import type { Prompt } from '@/types/prompt'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [sortBy, setSortBy] = useState('relevant')

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useSearchPrompts(query, !!query)

  // Flatten and sort paginated data
  const prompts = useMemo(() => {
    const allPrompts = data?.pages.flatMap((page) => page.data) || []

    switch (sortBy) {
      case 'trending':
        return [...allPrompts].sort((a, b) => b.rating - a.rating)
      case 'newest':
        return [...allPrompts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      case 'popular':
        return [...allPrompts].sort((a, b) => b.views - a.views)
      default:
        return allPrompts
    }
  }, [data, sortBy])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-100 py-3 px-4 md:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={query}
                readOnly
                className="w-full pl-4 pr-4 py-2 text-sm border border-gray-100 rounded-lg bg-gray-50"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevant">Most Relevant</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-xs text-gray-700">
            Showing {prompts.length} results for '{query}'
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-8">
        {isLoading && prompts.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
            title={`No results found for '${query}'`}
            description="Try different keywords or browse all prompts"
            action={{
              label: 'Browse Gallery',
              onClick: () => window.location.href = '/gallery'
            }}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {prompts.map((prompt) => (
                <Link key={prompt.id} href={`/prompts/${prompt.slug}`}>
                  <PromptCard prompt={prompt} />
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
    </div>
  )
}

