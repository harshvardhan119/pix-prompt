'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Copy, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCopy } from '@/lib/hooks/use-copy'
import type { Prompt } from '@/types/prompt'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface PromptCardProps {
  prompt: Prompt
  onFavorite?: (id: string) => void
  isFavorited?: boolean
}

export function PromptCard({ prompt, onFavorite, isFavorited }: PromptCardProps) {
  const [showOverlay, setShowOverlay] = useState(false)
  const { copied, copy } = useCopy()

  return (
    <Card hover className="group relative aspect-[4/5] overflow-hidden">
      {/* Image Section */}
      <div
        className="relative w-full h-[60%] bg-gray-100"
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}
        onTouchStart={() => setShowOverlay(true)}
        onTouchEnd={() => setShowOverlay(false)}
      >
        <Image
          src={prompt.imageUrl || '/placeholder.png'}
          alt={prompt.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2VlZSIvPjwvc3ZnPg=="
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 z-10 bg-white/90 px-2 py-1 rounded text-xs font-bold text-orange-500">
          {prompt.generator}
        </div>
        <div className="absolute top-2 right-2 z-10 bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
          {prompt.category}
        </div>

        {/* Overlay */}
        <div
          className={cn(
            'absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-200',
            showOverlay ? 'opacity-100' : 'opacity-0'
          )}
        >
          <Button
            variant="primary"
            size="sm"
            onClick={() => copy(prompt.prompt)}
            className="bg-orange-500 hover:bg-orange-600"
          >
            {copied ? '✓ Copied!' : 'Copy Prompt'}
          </Button>
        </div>
      </div>

      {/* Text Section */}
      <div className="h-[40%] bg-white p-3 flex flex-col justify-between">
        <p className="text-xs text-gray-700 line-clamp-2 font-mono leading-relaxed">
          {prompt.prompt}
        </p>
        {/* Metadata */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-700">{Math.floor(prompt.views / 1000)}K views</span>
          <span className="text-xs text-orange-400">⭐ {prompt.rating.toFixed(1)}</span>
        </div>
      </div>
    </Card>
  )
}

