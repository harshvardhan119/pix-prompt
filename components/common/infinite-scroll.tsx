'use client'

import { useEffect, useRef } from 'react'
import { Loader2 } from 'lucide-react'

interface InfiniteScrollProps {
  isLoading: boolean
  hasMore: boolean
  onLoadMore: () => void
}

export function InfiniteScroll({ isLoading, hasMore, onLoadMore }: InfiniteScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasMore, isLoading, onLoadMore])

  if (!hasMore) return null

  return (
    <div ref={ref} className="flex justify-center py-12">
      {isLoading && (
        <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
      )}
    </div>
  )
}

