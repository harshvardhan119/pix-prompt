'use client'

import { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { PromptCard } from '@/components/cards/prompt-card'
import { usePrompts } from '@/lib/hooks/use-prompts'
import { useQuery } from '@tanstack/react-query'
import type { Category, Prompt } from '@/types/prompt'

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const [selectedComplexity, setSelectedComplexity] = useState<string>('all')

  // Fetch category info with React Query
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('/api/categories')
      const result = await response.json()
      return result.data as Category[]
    },
  })

  const category = categories.find((cat) => cat.slug === slug)

  // Fetch prompts for this category with React Query
  const { data, isLoading } = usePrompts({ category: slug })

  const allPrompts = data?.pages.flatMap((page) => page.data) || []

  // Filter by complexity
  const prompts = useMemo(() => {
    if (selectedComplexity === 'all') {
      return allPrompts
    }
    return allPrompts.filter((p) => p.complexity === selectedComplexity)
  }, [allPrompts, selectedComplexity])

  const complexityFilters = [
    { value: 'all', label: 'All' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ]

  if (isLoading && !category) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-700">Category not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Category Header */}
      <section
        className="text-white py-16 md:py-20 px-4 md:px-6 lg:px-10"
        style={{
          background: category.gradientStart && category.gradientEnd
            ? `linear-gradient(135deg, ${category.gradientStart} 0%, ${category.gradientEnd} 100%)`
            : 'linear-gradient(135deg, #FF7A59 0%, #FF6A40 100%)',
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
            {category.name}
          </h1>
          <p className="text-base md:text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            {category.description || `Discover amazing ${category.name} prompts that have been tested and verified by our community.`}
          </p>
          <div className="flex justify-center gap-8 text-sm flex-wrap">
            <span>{category.promptCount || prompts.length || 0} prompts</span>
            <span>Most popular this week</span>
            <span>Updated recently</span>
          </div>
        </div>
      </section>

      {/* Complexity Filters */}
      <section className="bg-white border-b border-gray-100 px-4 md:px-6 lg:px-10 py-4">
        <div className="max-w-7xl mx-auto overflow-x-auto">
          <div className="flex gap-3">
            {complexityFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedComplexity(filter.value)}
                className={`px-4 py-2 text-xs md:text-sm rounded-full border whitespace-nowrap transition ${
                  selectedComplexity === filter.value
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-8 md:py-10">
        {prompts && prompts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {prompts.map((prompt) => (
              <Link key={prompt.id} href={`/prompts/${prompt.slug}`}>
                <PromptCard prompt={prompt as Prompt} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-700">No prompts found in this category.</p>
          </div>
        )}
      </section>
    </div>
  )
}
