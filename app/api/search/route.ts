import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { query, limit = 20, offset = 0 } = await request.json()

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      )
    }

    const searchQuery = query.trim()

    const [prompts, total] = await Promise.all([
      prisma.prompts.findMany({
        where: {
          OR: [
            {
              title: {
                contains: searchQuery,
                mode: 'insensitive',
              },
            },
            {
              prompt: {
                contains: searchQuery,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: searchQuery,
                mode: 'insensitive',
              },
            },
          ],
        },
        take: limit,
        skip: offset,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.prompts.count({
        where: {
          OR: [
            {
              title: {
                contains: searchQuery,
                mode: 'insensitive',
              },
            },
            {
              prompt: {
                contains: searchQuery,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: searchQuery,
                mode: 'insensitive',
              },
            },
          ],
        },
      }),
    ])

    return NextResponse.json({
      data: prompts,
      count: prompts.length,
      total
    })
  } catch (error) {
    console.error('Error searching prompts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

