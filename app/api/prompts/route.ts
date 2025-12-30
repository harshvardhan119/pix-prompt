import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const category = searchParams.get('category')
    const generator = searchParams.get('generator')

    const where = {
      ...(category && { category }),
      ...(generator && { generator }),
    }

    const [prompts, total] = await Promise.all([
      prisma.prompts.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.prompts.count({ where }),
    ])

    return NextResponse.json({
      data: prompts,
      count: prompts.length,
      total
    })
  } catch (error) {
    console.error('Error fetching prompts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

