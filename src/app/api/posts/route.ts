import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 1000

    const payload = await getPayload({ config: configPromise })

    const data = await payload.find({
      collection: 'posts',
      limit,
      depth: 2,
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Failed to fetch related posts' },
      { status: 500 }
    )
  }
}
