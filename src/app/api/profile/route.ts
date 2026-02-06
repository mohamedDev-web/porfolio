import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const profile = await db.profile.findFirst({
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, title, bio, avatarUrl, resumeUrl, githubUrl, linkedinUrl, email, location } = body

    // Validation
    if (!name || !title || !bio) {
      return NextResponse.json(
        { error: 'Name, title, and bio are required' },
        { status: 400 }
      )
    }

    // Create or update profile
    const existingProfile = await db.profile.findFirst()
    
    let profile
    if (existingProfile) {
      profile = await db.profile.update({
        where: { id: existingProfile.id },
        data: {
          name,
          title,
          bio,
          avatarUrl: avatarUrl || null,
          resumeUrl: resumeUrl || null,
          githubUrl: githubUrl || null,
          linkedinUrl: linkedinUrl || null,
          email: email || null,
          location: location || null,
        },
      })
    } else {
      profile = await db.profile.create({
        data: {
          name,
          title,
          bio,
          avatarUrl: avatarUrl || null,
          resumeUrl: resumeUrl || null,
          githubUrl: githubUrl || null,
          linkedinUrl: linkedinUrl || null,
          email: email || null,
          location: location || null,
        },
      })
    }

    return NextResponse.json(
      { 
        message: existingProfile ? 'Profile updated successfully' : 'Profile created successfully',
        profile
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error saving profile:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}