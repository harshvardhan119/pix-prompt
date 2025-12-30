'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { PromptCard } from '@/components/cards/prompt-card'
import { EmptyState } from '@/components/common/empty-state'
import { Button } from '@/components/ui/button'
import type { Prompt } from '@/types/prompt'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Prompt[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = async () => {
    try {
      setLoading(true)
      // TODO: Implement favorites API endpoint
      // For now, show empty state
      setFavorites([])
    } catch (error) {
      console.error('Error loading favorites:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFavorite = async (promptId: string) => {
    try {
      // TODO: Implement remove favorite API call
      setFavorites(favorites.filter((fav) => fav.id !== promptId))
    } catch (error) {
      console.error('Error removing favorite:', error)
    }
  }

  const hasFavorites = favorites.length > 0

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-8 md:py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              My Favorites
            </h1>
            <p className="text-sm text-gray-700">
              {hasFavorites ? `You have ${favorites.length} saved prompts` : 'No favorites yet'}
            </p>
          </div>
          {hasFavorites && (
            <Button
              variant="outline"
              onClick={() => {
                // TODO: Implement clear all
              }}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : hasFavorites ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {favorites.map((fav) => (
              <div key={fav.id} className="relative group">
                <Link href={`/prompts/${fav.slug}`}>
                  <PromptCard prompt={fav} />
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    handleRemoveFavorite(fav.id)
                  }}
                  className="absolute top-2 right-2 z-10 w-6 h-6 bg-white border border-gray-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-red-500 hover:border-red-500"
                >
                  <Trash2 className="w-4 h-4 text-gray-700 group-hover:text-white" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon="❤️"
            title="No favorites yet"
            description="Start saving prompts you love! Click the heart icon on any prompt to add it to your favorites."
            action={{
              label: 'Browse Gallery',
              onClick: () => window.location.href = '/gallery'
            }}
          />
        )}
      </div>
    </div>
  )
}

