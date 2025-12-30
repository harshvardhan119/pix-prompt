import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || 'week'
    const limit = parseInt(searchParams.get('limit') || '20')

    // Calculate date range based on period
    const now = new Date()
    let startDate = new Date()

    if (period === 'week') {
      startDate.setDate(now.getDate() - 7)
    } else if (period === 'month') {
      startDate.setMonth(now.getMonth() - 1)
    } else {
      startDate = new Date(0) // All time
    }

    const prompts = await prisma.prompts.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      take: limit,
      orderBy: [
        {
          rating: 'desc',
        },
        {
          views: 'desc',
        },
      ],
    })

    return NextResponse.json({
      data: prompts,
      count: prompts.length
    })
  } catch (error) {
    console.error('Error fetching trending prompts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

