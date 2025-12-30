import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'

const Gallery = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    { name: 'All', count: 1240 },
    { name: 'Portrait', count: 320 },
    { name: 'Landscape', count: 280 },
    { name: 'Abstract', count: 180 },
    { name: 'Product', count: 150 },
    { name: 'Architecture', count: 120 },
    { name: 'Nature', count: 90 },
    { name: 'Animals', count: 80 },
  ]

  const prompts = [
    { id: 1, category: 'Portrait', generator: 'DALL-E 3', views: '2.4K', rating: '4.8', prompt: 'A professional headshot of a business executive, corporate style, high quality, studio lighting' },
    { id: 2, category: 'Landscape', generator: 'Midjourney', views: '1.8K', rating: '4.9', prompt: 'Serene mountain landscape at sunset, cinematic lighting, 4K quality, dramatic clouds' },
    { id: 3, category: 'Abstract', generator: 'Stable Diffusion', views: '3.2K', rating: '4.7', prompt: 'Colorful abstract art with geometric patterns, modern design, vibrant colors' },
    { id: 4, category: 'Product', generator: 'DALL-E 3', views: '1.5K', rating: '4.6', prompt: 'Product photography of a luxury watch, studio lighting, white background' },
    { id: 5, category: 'Architecture', generator: 'Midjourney', views: '2.1K', rating: '4.8', prompt: 'Modern minimalist architecture, clean lines, natural lighting, futuristic design' },
    { id: 6, category: 'Nature', generator: 'Stable Diffusion', views: '1.9K', rating: '4.5', prompt: 'Lush green forest with sunlight filtering through trees, peaceful atmosphere' },
    { id: 7, category: 'Animals', generator: 'DALL-E 3', views: '2.7K', rating: '4.9', prompt: 'Majestic lion in the wild, golden hour lighting, detailed fur texture' },
    { id: 8, category: 'Portrait', generator: 'Midjourney', views: '1.6K', rating: '4.7', prompt: 'Portrait of a young woman, natural lighting, soft focus, artistic style' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-100 py-3 px-4 md:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-primary focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 text-sm font-bold text-gray-900 border border-gray-100 rounded-lg hover:bg-gray-50 flex items-center gap-2 relative"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
            {showFilters && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-primary rounded-full"></span>
            )}
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Category Sidebar - Desktop Only */}
        <aside className="hidden lg:block fixed left-0 top-32 w-60 h-[calc(100vh-8rem)] bg-gray-50 border-r border-gray-100 overflow-y-auto">
          <div className="p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Categories</h3>
            <nav className="space-y-1">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  to={`/category/${cat.name.toLowerCase()}`}
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-white hover:text-gray-900 rounded-lg transition"
                >
                  <div className="flex justify-between items-center">
                    <span>{cat.name}</span>
                    <span className="text-xs text-gray-500">{cat.count}</span>
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Gallery Grid */}
        <main className="flex-1 lg:ml-60 p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4">
              {prompts.map((prompt) => (
                <Link key={prompt.id} to={`/prompts/${prompt.id}`}>
                  <Card hover className="overflow-hidden aspect-[4/5]">
                    <div className="relative h-[60%] bg-gray-100 group">
                      <div className="absolute top-2 left-2 bg-white/90 text-orange-primary text-xs font-bold px-2 py-1 rounded">
                        {prompt.generator}
                      </div>
                      <div className="absolute top-2 right-2 bg-orange-primary text-white text-xs font-bold px-2 py-1 rounded">
                        {prompt.category}
                      </div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            navigator.clipboard.writeText(prompt.prompt)
                          }}
                          className="px-6 py-3 bg-orange-primary text-white text-sm font-bold rounded-md hover:bg-orange-dark transform scale-90 group-hover:scale-100 transition-transform"
                        >
                          Copy Prompt
                        </button>
                      </div>
                    </div>
                    <div className="h-[40%] p-3 flex flex-col justify-between">
                      <p className="text-xs font-mono text-gray-700 line-clamp-2 leading-snug mb-2">
                        {prompt.prompt}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-700">
                        <span>{prompt.views} views</span>
                        <span className="text-orange-400">⭐ {prompt.rating}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Gallery

