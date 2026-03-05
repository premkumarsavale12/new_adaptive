import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { PromotionArchiveClient } from './PromotionArchiveClient'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
    const payload = await getPayload({ config: configPromise })

    const promotions = await payload.find({
        collection: 'promotion',
        depth: 1,
        limit: 100,
        overrideAccess: false,
    })

    return (
        <div className="pt-10 pb-24 bg-white-100">
            <PromotionArchiveClient data={promotions.docs} />
        </div>
    )
}

export function generateMetadata(): Metadata {
    return {
        title: `Promotions`,
    }
}
