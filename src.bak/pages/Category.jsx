import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Card from '../components/ui/Card'

const Category = () => {
  const { slug } = useParams()
  const [selectedSubcategory, setSelectedSubcategory] = useState('all')

  const subcategories = ['All', 'Professional', 'Casual', 'Artistic', 'Corporate']

  const prompts = [
    { id: 1, category: slug, views: '2.4K', rating: '4.8', prompt: 'Professional headshot of a business executive' },
    { id: 2, category: slug, views: '1.8K', rating: '4.9', prompt: 'Portrait with natural lighting, soft focus' },
    { id: 3, category: slug, views: '3.2K', rating: '4.7', prompt: 'Corporate headshot, modern office background' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Category Header */}
      <section className="bg-gradient-to-br from-orange-primary to-orange-dark text-white py-16 md:py-20 px-4 md:px-6 lg:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
            {slug.charAt(0).toUpperCase() + slug.slice(1)}
          </h1>
          <p className="text-base md:text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Discover amazing {slug} prompts that have been tested and verified by our community.
          </p>
          <div className="flex justify-center gap-8 text-sm">
            <span>2,450 prompts</span>
            <span>Most popular this week</span>
            <span>Updated 3 hours ago</span>
          </div>
        </div>
      </section>

      {/* Subcategories */}
      <section className="bg-white border-b border-gray-100 px-4 md:px-6 lg:px-10 py-4">
        <div className="max-w-7xl mx-auto overflow-x-auto">
          <div className="flex gap-3">
            {subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubcategory(sub.toLowerCase())}
                className={`px-4 py-2 text-xs md:text-sm rounded-full border whitespace-nowrap transition ${
                  selectedSubcategory === sub.toLowerCase()
                    ? 'bg-orange-light border-orange-primary text-gray-900'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-8 md:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {prompts.map((prompt) => (
            <Link key={prompt.id} to={`/prompts/${prompt.id}`}>
              <Card hover className="overflow-hidden aspect-[4/5]">
                <div className="relative h-[60%] bg-gray-100 group">
                  <div className="absolute top-2 right-2 bg-orange-primary text-white text-xs font-bold px-2 py-1 rounded">
                    {prompt.category}
                  </div>
                </div>
                <div className="h-[40%] p-3">
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
      </section>
    </div>
  )
}

export default Category

