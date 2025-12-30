import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    // Fetch prompt and related prompts in parallel for speed
    const [prompt, relatedPrompts] = await Promise.all([
      // Get the main prompt
      prisma.prompts.findUnique({
        where: { slug },
      }),
      // This will be populated after we know the category
      Promise.resolve([])
    ])

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt not found' },
        { status: 404 }
      )
    }

    // Fetch related prompts from same category
    const related = await prisma.prompts.findMany({
      where: {
        category: prompt.category,
        id: { not: prompt.id }
      },
      take: 3,
      orderBy: {
        views: 'desc'
      }
    })

    return NextResponse.json({
      data: prompt,
      related
    }, {
      headers: {
        // Cache for 5 minutes
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    })
  } catch (error) {
    console.error('Error fetching prompt:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
