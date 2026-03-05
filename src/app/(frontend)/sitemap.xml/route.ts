import { getServerSideSitemapIndex } from 'next-sitemap'

export async function GET() {
    const SITE_URL =
        process.env.NEXT_PUBLIC_SERVER_URL ||
        process.env.VERCEL_PROJECT_PRODUCTION_URL ||
        'https://adaptive-payload-cms.vercel.app'

    return getServerSideSitemapIndex([
        `${SITE_URL}/pages-sitemap.xml`,
        `${SITE_URL}/posts-sitemap.xml`,
        `${SITE_URL}/webinars-sitemap.xml`,
    ])
}
