import React from 'react'
import Card from '../components/ui/Card'

const Collections = () => {
  const collections = [
    { id: 1, name: 'Business Portraits', description: 'Professional headshots and corporate photography prompts', count: 12, gradient: 'from-blue-500 to-purple-500' },
    { id: 2, name: 'Nature Landscapes', description: 'Beautiful outdoor scenes and natural environments', count: 8, gradient: 'from-green-500 to-teal-500' },
    { id: 3, name: 'Abstract Art', description: 'Creative and artistic abstract compositions', count: 15, gradient: 'from-pink-500 to-orange-500' },
  ]

  const hasCollections = collections.length > 0

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-10 py-8 md:py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              My Collections
            </h1>
            <p className="text-sm text-gray-700">
              Organize and manage your prompt collections
            </p>
          </div>
          <button className="px-6 py-3 bg-orange-primary text-white text-sm font-bold rounded-md hover:bg-orange-dark flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Collection
          </button>
        </div>

        {hasCollections ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <Card key={collection.id} hover className="overflow-hidden">
                <div className={`h-30 bg-gradient-to-br ${collection.gradient} flex items-center justify-center`}>
                  <svg className="w-12 h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-gray-900 mb-2">{collection.name}</h3>
                  <p className="text-xs text-gray-700 mb-4 line-clamp-2">{collection.description}</p>
                  <p className="text-xs text-gray-500 mb-4">{collection.count} prompts • Created 5 days ago</p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <button className="px-3 py-1.5 bg-gray-50 text-gray-900 text-xs font-bold rounded border border-gray-100 hover:bg-gray-100">
                      Edit
                    </button>
                    <button className="px-3 py-1.5 bg-transparent text-red-500 text-xs font-bold rounded border border-red-500 hover:bg-red-500 hover:text-white">
                      Delete
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <svg className="w-16 h-16 text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No collections yet</h2>
            <p className="text-sm text-gray-700 mb-6 max-w-md">
              Create a collection to organize your favorite prompts
            </p>
            <button className="px-6 py-3 bg-orange-primary text-white text-sm font-bold rounded-md hover:bg-orange-dark">
              Create Collection
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Collections

