import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
// import PromotionArchiveClient from '../PromotionArchiveClient'
import { PromotionArchiveClient } from '../PromotionArchiveClient'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'

export async function generateStaticParams() {
    const payload = await getPayload({ config: configPromise })
    const promotions = await payload.find({
        collection: 'promotion',
        draft: false,
        limit: 1000,
        overrideAccess: false,
        pagination: false,
        select: {
            slug: true,
        },
    })

    const params = promotions.docs.map(({ slug }) => {
        return { slug }
    })

    return params
}

type Args = {
    params: Promise<{
        slug?: string
    }>
}

export default async function PromotionPage({ params: paramsPromise }: Args) {
    const { isEnabled: draft } = await draftMode()
    const { slug = '' } = await paramsPromise
    const decodedSlug = decodeURIComponent(slug)
    const url = '/Promotion/' + decodedSlug

    const promotion = await queryPromotionBySlug({
        slug: decodedSlug,
    })

    if (!promotion) {
        return <PayloadRedirects url={url} />
    }

    return (
        <article className="pt-10 pb-24">
            {draft && <LivePreviewListener />}
            <PromotionArchiveClient
                data={promotion}
                renderBlocks={<RenderBlocks blocks={promotion.layout} />}
            />
        </article>
    )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
    const { slug = '' } = await paramsPromise
    const decodedSlug = decodeURIComponent(slug)
    const promotion = await queryPromotionBySlug({
        slug: decodedSlug,
    })

    return generateMeta({ doc: promotion })
}

const queryPromotionBySlug = cache(async ({ slug }: { slug: string }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
        collection: 'promotion',
        draft,
        limit: 1,
        pagination: false,
        overrideAccess: draft,
        where: {
            slug: {
                equals: slug,
            },
        },
    })

    return result.docs?.[0] || null
})
