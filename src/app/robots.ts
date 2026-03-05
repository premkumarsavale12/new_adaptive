import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getRobots = unstable_cache(
    async () => {
        const payload = await getPayload({ config })
        return payload.findGlobal({
            slug: 'robots',
        })
    },
    ['robots-global'],
    { tags: ['robots'] },
)

export default async function robots(): Promise<MetadataRoute.Robots> {
    const robotsQuery = await getRobots()

    const rules =
        robotsQuery?.rules?.map((rule) => ({
            userAgent: rule.userAgent ?? '*',
            allow: rule.allow?.map((a) => a.path).filter((p): p is string => !!p),
            disallow: rule.disallow?.map((d) => d.path).filter((p): p is string => !!p),
        })) || []

    const sitemaps = robotsQuery?.sitemaps?.map((s) => s.url).filter((url): url is string => !!url) || []

    return {
        rules,
        sitemap: sitemaps,
    }
}
