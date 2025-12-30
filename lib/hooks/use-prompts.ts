import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import type { Prompt } from '@/types/prompt'

interface PromptsResponse {
  data: Prompt[]
  count: number
  total: number
}

interface PromptsParams {
  limit?: number
  category?: string
  generator?: string
}

export function usePrompts(params: PromptsParams = {}) {
  const { limit = 20, category, generator } = params

  return useInfiniteQuery({
    queryKey: ['prompts', category, generator],
    queryFn: async ({ pageParam = 0 }) => {
      const searchParams = new URLSearchParams({
        limit: limit.toString(),
        offset: pageParam.toString(),
        ...(category && { category }),
        ...(generator && { generator }),
      })

      const response = await fetch(`/api/prompts?${searchParams}`)
      if (!response.ok) throw new Error('Failed to fetch prompts')
      return response.json() as Promise<PromptsResponse>
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentCount = allPages.reduce((sum, page) => sum + page.data.length, 0)
      return lastPage.data.length >= limit ? currentCount : undefined
    },
    initialPageParam: 0,
  })
}

export function useSearchPrompts(query: string, enabled = true) {
  const limit = 20

  return useInfiniteQuery({
    queryKey: ['search', query],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          limit,
          offset: pageParam,
        }),
      })

      if (!response.ok) throw new Error('Failed to search prompts')
      return response.json() as Promise<PromptsResponse>
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentCount = allPages.reduce((sum, page) => sum + page.data.length, 0)
      return lastPage.data.length >= limit ? currentCount : undefined
    },
    initialPageParam: 0,
    enabled,
  })
}

export function useTrendingPrompts(period = 'week') {
  return useQuery({
    queryKey: ['trending', period],
    queryFn: async () => {
      const response = await fetch(`/api/trending?period=${period}&limit=20`)
      if (!response.ok) throw new Error('Failed to fetch trending prompts')
      const data = await response.json()
      return data.data as Prompt[]
    },
  })
}
