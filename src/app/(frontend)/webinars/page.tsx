import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import WebinarArchiveClient from './WebinarArchiveClient'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
    const payload = await getPayload({ config: configPromise })

    const webinars = await payload.find({
        collection: 'webinars',
        depth: 1,
        limit: 100, // Increased limit to show all
        overrideAccess: false,
    })

    const categories = await payload.find({
        collection: 'categories',
        limit: 100,
    })

    return (
        <WebinarArchiveClient
            initialWebinars={webinars.docs}
            categories={categories.docs}
        />
    )
}

export function generateMetadata(): Metadata {
    return {
        title: `Webinars`,
    }
}
