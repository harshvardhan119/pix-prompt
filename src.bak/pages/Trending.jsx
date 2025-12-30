import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'

const Trending = () => {
  const [timePeriod, setTimePeriod] = useState('week')

  const trending = [
    { rank: 1, category: 'Portrait', generator: 'DALL-E 3', views: '2.4K', rating: '4.8', trend: '↑ 45%', prompt: 'Professional headshot of a business executive, corporate style, high quality' },
    { rank: 2, category: 'Landscape', generator: 'Midjourney', views: '1.8K', rating: '4.9', trend: '↑ 32%', prompt: 'Serene mountain landscape at sunset, cinematic lighting, 4K quality' },
    { rank: 3, category: 'Abstract', generator: 'Stable Diffusion', views: '3.2K', rating: '4.7', trend: '🆕 NEW', prompt: 'Colorful abstract art with geometric patterns, modern design' },
    { rank: 4, category: 'Product', generator: 'DALL-E 3', views: '1.5K', rating: '4.6', trend: '↑ 18%', prompt: 'Product photography of a luxury watch, studio lighting' },
  ]

  const getRankBadge = (rank) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return rank
  }

  const getRankBg = (rank) => {
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
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Updated 2 hours ago
        </p>

        <div className="flex gap-3 mb-8 flex-wrap">
          {['This Week', 'This Month', 'All Time'].map((period) => (
            <button
              key={period}
              onClick={() => setTimePeriod(period.toLowerCase().replace(' ', '-'))}
              className={`px-4 py-2 text-xs md:text-sm rounded-md border transition ${
                timePeriod === period.toLowerCase().replace(' ', '-')
                  ? 'bg-orange-light border-orange-primary text-gray-900'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {trending.map((item) => (
            <Link key={item.rank} to={`/prompts/${item.rank}`}>
              <Card hover className="p-4 md:p-4">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 md:w-12 md:h-12 ${getRankBg(item.rank)} rounded flex items-center justify-center font-bold text-base md:text-lg flex-shrink-0`}>
                    {getRankBadge(item.rank)}
                  </div>
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-md bg-gray-100 flex-shrink-0 relative">
                    <div className="absolute top-1 right-1 bg-orange-primary text-white text-xs font-bold px-2 py-0.5 rounded">
                      {item.trend}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm font-mono text-gray-900 line-clamp-2 mb-2">
                      {item.prompt}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-xs bg-orange-light text-orange-primary px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      <span className="text-xs bg-orange-light text-orange-primary px-2 py-0.5 rounded">
                        {item.generator}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className="text-sm font-bold text-orange-400">⭐ {item.rating}</span>
                    <button className="px-4 py-2 bg-orange-primary text-white text-xs font-bold rounded hover:bg-orange-dark hidden md:block">
                      Copy
                    </button>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button className="px-8 py-3 bg-orange-light text-orange-primary border border-orange-primary rounded-md hover:bg-orange-primary hover:text-white transition font-bold text-sm">
            Load More
          </button>
        </div>
      </div>
    </div>
  )
}

export default Trending

