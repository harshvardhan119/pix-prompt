import React, { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Card from '../components/ui/Card'

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [sortBy, setSortBy] = useState('relevant')

  const results = [
    { id: 1, category: 'Portrait', views: '2.4K', rating: '4.8', prompt: 'Professional headshot of a business executive, corporate style' },
    { id: 2, category: 'Landscape', views: '1.8K', rating: '4.9', prompt: 'Serene mountain landscape at sunset, cinematic lighting' },
    { id: 3, category: 'Abstract', views: '3.2K', rating: '4.7', prompt: 'Colorful abstract art with geometric patterns' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-16 z-40 bg-white border-b border-gray-100 py-3 px-4 md:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={query}
                readOnly
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-100 rounded-lg bg-gray-50"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 text-xs border border-gray-100 rounded-md bg-white"
            >
              <option value="relevant">Relevant</option>
              <option value="trending">Trending</option>
              <option value="newest">Newest</option>
              <option value="popular">Popular</option>
            </select>
          </div>
          <p className="text-xs text-gray-700">
            Showing {results.length} results for '{query}'
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {results.map((result) => (
            <Link key={result.id} to={`/prompts/${result.id}`}>
              <Card hover className="overflow-hidden aspect-[4/5]">
                <div className="relative h-[60%] bg-gray-100 group">
                  <div className="absolute top-2 right-2 bg-orange-primary text-white text-xs font-bold px-2 py-1 rounded">
                    {result.category}
                  </div>
                </div>
                <div className="h-[40%] p-3">
                  <p className="text-xs font-mono text-gray-700 line-clamp-2 leading-snug mb-2">
                    {result.prompt}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-700">
                    <span>{result.views} views</span>
                    <span className="text-orange-400">⭐ {result.rating}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchResults

