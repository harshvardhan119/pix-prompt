'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, TrendingUp } from 'lucide-react'
import { useTrendingPrompts } from '@/lib/hooks/use-prompts'

export default function TrendingPage() {
  const [timePeriod, setTimePeriod] = useState('week')

  const { data: prompts = [], isLoading } = useTrendingPrompts(timePeriod)

  const getRankBadge = (rank: number) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return rank
  }

  const getRankBg = (rank: number) => {
    if (rank === 1) return 'bg-yellow-400'
    if (rank === 2) return 'bg-gray-300'
    if (rank === 3) return 'bg-orange-300'
    return 'bg-white'
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-10 py-8 md:py-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
          Trending Prompts
        </h1>
        <p className="text-xs text-gray-700 mb-6 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Updated 2 hours ago
        </p>

        <div className="flex gap-3 mb-8 flex-wrap">
          {['This Week', 'This Month', 'All Time'].map((period) => (
            <Button
              key={period}
              variant={timePeriod === period.toLowerCase().replace(' ', '-') ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setTimePeriod(period.toLowerCase().replace(' ', '-'))}
            >
              {period}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="p-4 animate-pulse">
                <div className="h-20 bg-gray-200 rounded"></div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {prompts.map((item, index) => {
              const rank = index + 1
              return (
                <Link key={item.id} href={`/prompts/${item.slug}`}>
                  <Card hover className="p-4 md:p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 md:w-12 md:h-12 ${getRankBg(rank)} rounded flex items-center justify-center font-bold text-base md:text-lg flex-shrink-0`}>
                        {getRankBadge(rank)}
                      </div>
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-md bg-gray-100 flex-shrink-0 relative">
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover rounded-md"
                          />
                        )}
                        <div className="absolute top-1 right-1 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                          ↑ {Math.floor(Math.random() * 50)}%
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs md:text-sm font-mono text-gray-900 line-clamp-2 mb-2">
                          {item.prompt}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          <span className="text-xs bg-orange-100 text-orange-500 px-2 py-0.5 rounded">
                            {item.category}
                          </span>
                          <span className="text-xs bg-orange-100 text-orange-500 px-2 py-0.5 rounded">
                            {item.generator}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <span className="text-sm font-bold text-orange-400">⭐ {item.rating.toFixed(1)}</span>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault()
                            navigator.clipboard.writeText(item.prompt)
                          }}
                          className="hidden md:flex"
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}

        <div className="flex justify-center mt-10">
          <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
            Load More
          </Button>
        </div>
      </div>
    </div>
  )
}

