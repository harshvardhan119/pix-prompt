'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Heart, Flag, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MetadataCard } from '@/components/cards/metadata-card'
import { PromptCard } from '@/components/cards/prompt-card'
import { CopyButton } from '@/components/common/copy-button'
import type { Prompt } from '@/types/prompt'

export default function PromptDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [prompt, setPrompt] = useState<Prompt | null>(null)
  const [relatedPrompts, setRelatedPrompts] = useState<Prompt[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPromptData()
  }, [slug])

  const loadPromptData = async () => {
    try {
      setLoading(true)

      // Use optimized endpoint that fetches only this prompt + related
      const response = await fetch(`/api/prompts/${slug}`, {
        next: { revalidate: 300 } // Cache for 5 minutes
      })

      if (!response.ok) {
        throw new Error('Prompt not found')
      }

      const result = await response.json()
      setPrompt(result.data)
      setRelatedPrompts(result.related || [])
    } catch (error) {
      console.error('Error loading prompt:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-10 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8">
            <div>
              {/* Image skeleton */}
              <div className="aspect-video bg-gray-200 rounded-lg mb-8 animate-pulse"></div>
              {/* Content skeleton */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              </div>
            </div>
            <div>
              {/* Sidebar skeleton */}
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!prompt) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-700">Prompt not found</p>
      </div>
    )
  }

  const metadata = [
    { icon: '🎨', label: 'Best Generator', value: prompt.generator },
    { icon: '🎭', label: 'Style', value: prompt.complexity },
    { icon: '📁', label: 'Category', value: prompt.category },
    { icon: '📅', label: 'Added', value: new Date(prompt.createdAt).toLocaleDateString() },
    { icon: '⭐', label: 'Rating', value: `${prompt.rating.toFixed(1)} (${prompt.ratingCount} votes)` },
    { icon: '👁️', label: 'Views', value: `${Math.floor(prompt.views / 1000)}K` },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 py-4 px-4 md:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <nav className="text-xs text-gray-700">
            <Link href="/" className="hover:text-orange-500">Home</Link>
            {' > '}
            <Link href="/gallery" className="hover:text-orange-500">Gallery</Link>
            {' > '}
            <Link href={`/category/${prompt.category.toLowerCase()}`} className="hover:text-orange-500">
              {prompt.category}
            </Link>
            {' > '}
            <span className="text-gray-500">{prompt.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-10 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 md:gap-10">
          {/* Left Column */}
          <div>
            {/* Image */}
            <div className="aspect-video bg-gray-100 rounded-lg mb-8 overflow-hidden relative">
              <Image
                src={prompt.imageUrl || 'https://via.placeholder.com/640x360'}
                alt={prompt.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgZmlsbD0iI2VlZSIvPjwvc3ZnPg=="
              />
            </div>

            {/* Prompt Display */}
            <div className="bg-gray-50 rounded-lg p-6 md:p-8 mb-8 relative border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{prompt.title}</h1>
                <div className="absolute top-4 right-4">
                  <CopyButton text={prompt.prompt} />
                </div>
              </div>
              <pre className="text-sm md:text-base font-mono text-gray-900 whitespace-pre-wrap break-words mb-4">
                {prompt.prompt}
              </pre>
              <div className="flex justify-end gap-4 text-xs text-gray-700 mt-4">
                <span>~{prompt.prompt.length} characters</span>
                <span>{prompt.complexity} complexity</span>
              </div>
              {prompt.description && (
                <p className="text-sm text-gray-700 mt-4">{prompt.description}</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Actions */}
            <div className="space-y-3 mb-8">
              <Button
                variant="outline"
                className="w-full justify-start"
              >
                <Heart className="w-5 h-5 mr-2" />
                Add to Favorites
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share Prompt
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start hover:border-red-500"
              >
                <Flag className="w-5 h-5 mr-2" />
                Report Prompt
              </Button>
            </div>

            {/* Metadata Cards */}
            <div className="space-y-3">
              {metadata.map((item, index) => (
                <MetadataCard
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Related Prompts */}
        {relatedPrompts && relatedPrompts.length > 0 && (
          <section className="mt-16 bg-gray-50 rounded-lg p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Related Prompts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPrompts.map((related) => (
                <Link key={related.id} href={`/prompts/${related.slug}`}>
                  <PromptCard prompt={related} />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/gallery">
            <Button variant="ghost" className="text-orange-500 hover:text-orange-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Gallery
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
