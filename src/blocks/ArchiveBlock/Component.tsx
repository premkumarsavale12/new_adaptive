import type { Post, Webinar, Promotion } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { CollectionArchive } from '@/components/CollectionArchive'
import { CardPostData } from '@/components/Card'

type ArchiveBlockProps = {
  introContent?: DefaultTypedEditorState
  populateBy?: 'collection' | 'selection'
  relationTo?: 'posts' | 'webinars' | 'promotion'
  categories?: (number | { id: number })[]
  limit?: number
  selectedDocs?: { relationTo: 'posts' | 'webinars' | 'promotion'; value: number | { id: number } }[]
}

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs, relationTo } = props

  const limit = limitFromProps || 1000

  let posts: (Post | Webinar | Promotion)[] = []

  const payload = await getPayload({ config: configPromise })

  if (populateBy === 'collection') {

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: relationTo || 'posts',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
          where: {
            categories: {
              in: flattenedCategories,
            },
          },
        }
        : {}),
    })

    posts = fetchedPosts.docs as (Post | Webinar | Promotion)[]
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = await Promise.all(
        selectedDocs.map(async (post) => {
          if (typeof post.value === 'object') return post.value

          const fetchedDoc = await payload.findByID({
            collection: post.relationTo,
            id: post.value,
            depth: 1,
          })

          return fetchedDoc
        })
      ) as (Post | Webinar | Promotion)[]

      posts = filteredSelectedPosts
    }
  }

  return (
    <div className="" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive posts={posts as CardPostData[]} relationTo={relationTo as 'posts' | 'webinars' || 'posts'} />
    </div>
  )
}
