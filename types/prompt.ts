export interface Prompt {
  id: string
  title: string
  prompt: string
  description?: string
  imageUrl?: string
  category: string
  generator: string
  complexity: 'simple' | 'medium' | 'advanced'
  views: number
  rating: number
  ratingCount: number
  createdAt: string
  updatedAt: string
  userId?: string
  slug: string
  tags?: string[]
  isFeatured?: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  gradientStart?: string
  gradientEnd?: string
  promptCount: number
  createdAt: string
  updatedAt: string
}

