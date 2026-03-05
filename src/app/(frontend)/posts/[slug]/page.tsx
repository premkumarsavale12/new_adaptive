import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { notFound } from 'next/navigation'
import BlogSingleClient from './BlogSingleClient'
import PageClient from './page.client'
import { generatePostSchema } from '@/utilities/generateSchema'
import { generateMeta } from '@/utilities/generateMeta'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const { slug } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2, // Get related posts and categories details
  })

  const post = result.docs[0]

  if (!post) {
    return notFound()
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePostSchema(post)) }}
      />
      <PageClient />
      <BlogSingleClient post={post} />
    </>
  )
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    limit: 1000,
    select: {
      slug: true,
    },
  })

  return posts.docs
    .filter((doc) => doc.slug)
    .map(({ slug }) => ({
      slug,
    }))
}

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await paramsPromise
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const post = result.docs[0]

  return generateMeta({ doc: post })
}
