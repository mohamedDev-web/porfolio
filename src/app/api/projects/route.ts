import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')

    const where = featured === 'true' ? { featured: true } : {}

    const projects = await db.project.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Parse techStack from JSON string
    const formattedProjects = projects.map(project => ({
      ...project,
      techStack: JSON.parse(project.techStack || '[]')
    }))

    return NextResponse.json(formattedProjects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, techStack, githubUrl, demoUrl, imageUrl, featured } = body

    // Validation
    if (!title || !description || !techStack) {
      return NextResponse.json(
        { error: 'Title, description, and techStack are required' },
        { status: 400 }
      )
    }

    // Create project
    const project = await db.project.create({
      data: {
        title,
        description,
        techStack: JSON.stringify(techStack),
        githubUrl: githubUrl || null,
        demoUrl: demoUrl || null,
        imageUrl: imageUrl || null,
        featured: featured || false,
      },
    })

    return NextResponse.json(
      { 
        message: 'Project created successfully',
        project: {
          ...project,
          techStack: JSON.parse(project.techStack)
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}