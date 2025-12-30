import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const PromptDetail = () => {
  const { slug } = useParams()
  const [isFavorited, setIsFavorited] = useState(false)
  const [copied, setCopied] = useState(false)

  const prompt = {
    id: slug,
    title: 'Professional Business Headshot',
    prompt: 'A professional headshot of a business executive, corporate style, high quality, studio lighting, neutral background, confident expression, modern business attire',
    category: 'Portrait',
    generator: 'DALL-E 3',
    views: '2.4K',
    rating: '4.8',
    date: '2 days ago',
    style: 'Professional',
    complexity: 'Medium',
    characterCount: 150,
    compatibleGenerators: ['DALL-E 3', 'Midjourney', 'Stable Diffusion'],
  }

  const relatedPrompts = [
    { id: 1, category: 'Portrait', views: '1.8K', prompt: 'Corporate headshot, professional lighting, business attire' },
    { id: 2, category: 'Portrait', views: '2.1K', prompt: 'Executive portrait, modern office background, confident pose' },
    { id: 3, category: 'Portrait', views: '1.5K', prompt: 'Professional photo, studio setting, neutral colors' },
  ]

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const metadata = [
    { icon: '🎨', title: 'Best Generator', value: prompt.generator },
    { icon: '🎭', title: 'Style', value: prompt.style },
    { icon: '📁', title: 'Category', value: prompt.category },
    { icon: '📅', title: 'Added', value: prompt.date },
    { icon: '⭐', title: 'Rating', value: prompt.rating },
    { icon: '🔥', title: 'Popular', value: 'Yes' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 py-4 px-4 md:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <nav className="text-xs text-gray-700">
            <Link to="/" className="hover:text-orange-primary">Home</Link>
            {' > '}
            <Link to="/gallery" className="hover:text-orange-primary">Gallery</Link>
            {' > '}
            <Link to={`/category/${prompt.category.toLowerCase()}`} className="hover:text-orange-primary">
              {prompt.category}
            </Link>
            {' > '}
            <span className="text-gray-500">Prompt Detail</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-10 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 md:gap-10">
          {/* Left Column */}
          <div>
            {/* Image */}
            <div className="aspect-video bg-gray-100 rounded-lg mb-8 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-500">Prompt Preview Image</span>
              </div>
            </div>

            {/* Prompt Display */}
            <div className="bg-gray-50 rounded-lg p-6 md:p-8 mb-8 relative">
              <pre className="text-sm md:text-base font-mono text-gray-900 whitespace-pre-wrap break-words mb-4">
                {prompt.prompt}
              </pre>
              <button
                onClick={handleCopy}
                className="absolute top-4 right-4 px-5 py-2.5 bg-orange-primary text-white text-sm font-bold rounded-md hover:bg-orange-dark transition"
              >
                {copied ? '✓ Copied!' : 'Copy Prompt'}
              </button>
              <div className="flex justify-end gap-4 text-xs text-gray-700 mt-4">
                <span>~{prompt.characterCount} characters</span>
                <span>{prompt.complexity} complexity</span>
              </div>
              <div className="mt-4 text-xs text-gray-700">
                <span className="font-semibold">Works with: </span>
                {prompt.compatibleGenerators.map((gen, i) => (
                  <span key={i}>
                    {gen} ✓{i < prompt.compatibleGenerators.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Actions */}
            <div className="space-y-3 mb-8">
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className="w-full px-4 py-3 bg-white border border-gray-100 rounded-md hover:bg-gray-50 flex items-center justify-center gap-2 text-sm font-bold text-gray-900 transition"
              >
                <svg
                  className={`w-5 h-5 ${isFavorited ? 'text-red-500 fill-current' : 'text-gray-700'}`}
                  fill={isFavorited ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {isFavorited ? 'Favorited' : 'Add to Favorites'}
              </button>
              <button className="w-full px-4 py-3 bg-white border border-gray-100 rounded-md hover:bg-gray-50 flex items-center justify-center gap-2 text-sm font-bold text-gray-900 transition">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share Prompt
              </button>
              <button className="w-full px-4 py-3 bg-white border border-gray-100 rounded-md hover:bg-gray-50 hover:border-red-500 flex items-center justify-center gap-2 text-sm font-bold text-gray-900 transition">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
                Report Prompt
              </button>
            </div>

            {/* Metadata Cards */}
            <div className="space-y-3">
              {metadata.map((item, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-light rounded-md flex items-center justify-center text-lg">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-gray-700">{item.title}</div>
                      <div className="text-sm font-bold text-orange-primary mt-1">{item.value}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Related Prompts */}
        <section className="mt-16 bg-gray-50 rounded-lg p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Related Prompts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPrompts.map((related) => (
              <Link key={related.id} to={`/prompts/${related.id}`}>
                <Card hover className="overflow-hidden aspect-[4/5]">
                  <div className="relative h-[60%] bg-gray-100 group">
                    <div className="absolute top-2 right-2 bg-orange-primary text-white text-xs font-bold px-2 py-1 rounded">
                      {related.category}
                    </div>
                  </div>
                  <div className="h-[40%] p-3">
                    <p className="text-xs font-mono text-gray-700 line-clamp-2 leading-snug mb-2">
                      {related.prompt}
                    </p>
                    <div className="text-xs text-gray-700">{related.views} views</div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/gallery" className="text-sm font-bold text-orange-primary hover:underline">
            ← Back to Gallery
          </Link>
          <div className="flex gap-6">
            <button className="text-sm font-bold text-gray-300 cursor-not-allowed">
              ← Previous Prompt
            </button>
            <button className="text-sm font-bold text-orange-primary hover:underline">
              Next Prompt →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromptDetail

