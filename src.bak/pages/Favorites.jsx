import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'

const Favorites = () => {
  const favorites = [
    { id: 1, category: 'Portrait', views: '2.4K', rating: '4.8', prompt: 'Professional headshot of a business executive' },
    { id: 2, category: 'Landscape', views: '1.8K', rating: '4.9', prompt: 'Serene mountain landscape at sunset' },
  ]

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
            <button className="px-6 py-3 bg-white border border-gray-100 rounded-md hover:bg-gray-50 flex items-center gap-2 text-sm font-bold text-gray-900">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear All
            </button>
          )}
        </div>

        {hasFavorites ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {favorites.map((fav) => (
              <Link key={fav.id} to={`/prompts/${fav.id}`}>
                <Card hover className="overflow-hidden aspect-[4/5] relative group">
                  <button className="absolute top-2 right-2 z-10 w-6 h-6 bg-white border border-gray-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-red-500 hover:border-red-500">
                    <svg className="w-4 h-4 text-gray-700 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="relative h-[60%] bg-gray-100">
                    <div className="absolute top-2 right-2 bg-orange-primary text-white text-xs font-bold px-2 py-1 rounded">
                      {fav.category}
                    </div>
                  </div>
                  <div className="h-[40%] p-3">
                    <p className="text-xs font-mono text-gray-700 line-clamp-2 leading-snug mb-2">
                      {fav.prompt}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-700">
                      <span>{fav.views} views</span>
                      <span className="text-orange-400">⭐ {fav.rating}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
            <svg className="w-16 h-16 text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No favorites yet</h2>
            <p className="text-sm text-gray-700 mb-6 max-w-md">
              Start saving prompts you love! Click the heart icon on any prompt to add it to your favorites.
            </p>
            <Link to="/gallery" className="px-6 py-3 bg-orange-primary text-white text-sm font-bold rounded-md hover:bg-orange-dark">
              Browse Gallery
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Favorites

