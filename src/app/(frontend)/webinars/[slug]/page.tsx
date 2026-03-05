import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Media } from '@/components/Media'

import { generateWebinarSchema } from '@/utilities/generateSchema'

export async function generateStaticParams() {
    const payload = await getPayload({ config: configPromise })
    const webinars = await payload.find({
        collection: 'webinars',
        draft: false,
        limit: 1000,
        overrideAccess: false,
        pagination: false,
        select: {
            slug: true,
        },
    })

    const params = webinars.docs.map(({ slug }) => {
        return { slug }
    })

    return params
}


type Args = {
    params: Promise<{
        slug?: string
    }>
}

export default async function WebinarPage({ params: paramsPromise }: Args) {
    const { isEnabled: draft } = await draftMode()
    const { slug = '' } = await paramsPromise
    // Decode to support slugs with special characters
    const decodedSlug = decodeURIComponent(slug)
    const url = '/webinars/' + decodedSlug
    const webinar = await queryWebinarBySlug({ slug: decodedSlug })

    if (!webinar) return <PayloadRedirects url={url} />

    return (
        <article className="">
            {/* Allows redirects for valid pages too */}
            <PayloadRedirects disableNotFound url={url} />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebinarSchema(webinar)) }}
            />

            {draft && <LivePreviewListener />}

            <div className="flex flex-col items-center gap-4 pt-8">
                <div className="container">
                    <div className="max-w-[48rem] mx-auto mb-8">
                        {webinar.heroImage && typeof webinar.heroImage !== 'string' && (
                            <div className="relative w-full aspect-video mb-6 overflow-hidden rounded-lg">
                                <Media resource={webinar.heroImage} fill className="object-cover" />
                            </div>
                        )}

                        <div className="flex flex-col gap-4">
                            {webinar.tag && (
                                <span className="text-sm font-bold text-primary uppercase tracking-wider">{webinar.tag}</span>
                            )}

                            {webinar.date && (
                                <time dateTime={webinar.date}>
                                    {webinar.date}
                                </time>
                            )}
                            {webinar.Heading && (
                                <h1 className="text-4xl md:text-5xl font-bold leading-tight">{webinar.Heading}</h1>
                            )}

                            <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
                                {webinar.populatedAuthors && webinar.populatedAuthors.length > 0 && (
                                    <div className="flex items-center gap-2">
                                        <span>By</span>
                                        {webinar.populatedAuthors.map((author, index) => (
                                            <span key={author.id ?? index}>{author.name ?? 'Unknown Author'}</span>
                                        ))}

                                    </div>
                                )}
                                {/* {webinar.link && (
                                    <a href={webinar.link} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary">
                                        Visit Webinar &rarr;
                                    </a>
                                )} */}
                            </div>
                        </div>
                    </div>

                    {webinar.content && (
                        <RichText className="max-w-[48rem] mx-auto" data={webinar.content} enableGutter={false} />
                    )}
                    {webinar.relatedPosts && webinar.relatedPosts.length > 0 && (
                        <RelatedPosts
                            className="mt-12 max-w-[52rem]"
                            docs={webinar.relatedPosts.filter((post) => typeof post === 'object')}
                            relationTo="webinars"
                        />
                    )}
                </div>
            </div>
        </article>
    )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
    const { slug = '' } = await paramsPromise
    // Decode to support slugs with special characters
    const decodedSlug = decodeURIComponent(slug)
    const webinar = await queryWebinarBySlug({ slug: decodedSlug })

    return generateMeta({ doc: webinar })
}

const queryWebinarBySlug = cache(async ({ slug }: { slug: string }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
        collection: 'webinars',
        draft,
        limit: 1,
        overrideAccess: draft,
        pagination: false,
        where: {
            slug: {
                equals: slug,
            },
        },
    })

    return result.docs?.[0] || null
})
