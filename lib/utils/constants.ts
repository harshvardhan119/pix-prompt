export const SITE_NAME = 'PixPrompt AI'
export const SITE_DESCRIPTION = 'Browse 10K+ tested AI prompts. Copy instantly. No account needed.'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pixprompt.ai'

export const COLORS = {
  PRIMARY: '#FF7A59',
  DARK: '#FF6A40',
  LIGHT: '#FFE8DC',
  GRAY_50: '#F9FAFB',
  GRAY_100: '#F3F4F6',
  GRAY_300: '#D1D5DB',
  GRAY_700: '#374151',
  GRAY_900: '#111827',
}

export const GENERATORS = [
  'DALL-E 3',
  'Midjourney',
  'Stable Diffusion',
  'Adobe Firefly',
  'Microsoft Designer',
]

export const COMPLEXITIES = [
  { value: 'simple', label: 'Simple (1-2 sentences)' },
  { value: 'medium', label: 'Medium (2-3 sentences)' },
  { value: 'advanced', label: 'Advanced (3+ sentences)' },
]

export const SORT_OPTIONS = [
  { value: 'relevant', label: 'Most Relevant' },
  { value: 'trending', label: 'Trending' },
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most Popular' },
]

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
}

