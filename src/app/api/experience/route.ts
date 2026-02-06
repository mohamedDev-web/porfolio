import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'work' or 'education'

    const where = type ? { type } : {}

    const experiences = await db.experience.findMany({
      where,
      orderBy: {
        startDate: 'desc'
      }
    })

    return NextResponse.json(experiences)
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, company, institution, description, startDate, endDate, type } = body

    // Validation
    if (!title || !description || !startDate || !type) {
      return NextResponse.json(
        { error: 'Title, description, startDate, and type are required' },
        { status: 400 }
      )
    }

    if (!['work', 'education'].includes(type)) {
      return NextResponse.json(
        { error: 'Type must be either "work" or "education"' },
        { status: 400 }
      )
    }

    // Create experience
    const experience = await db.experience.create({
      data: {
        title,
        company: company || null,
        institution: institution || null,
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        type,
      },
    })

    return NextResponse.json(
      { 
        message: 'Experience created successfully',
        experience
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating experience:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}