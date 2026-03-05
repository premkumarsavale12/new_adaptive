import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { BlogTab } from './PostComponents'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 100,
    overrideAccess: false,
    sort: '-date',
  })

  const categories = await payload.find({
    collection: 'categories',
    depth: 0,
    limit: 100,
  })

  return (
    <div className="pt-[140px] pb-24 bg-white-100">
      <PageClient />
      <BlogTab allPosts={posts.docs} allCategories={categories.docs} />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}
