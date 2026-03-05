import type { Graph, BreadcrumbList, FAQPage } from 'schema-dts'
import { Page, Post, Webinar, Media } from '@/payload-types'
import { getServerSideURL } from './getURL'

export const generateOrganizationSchema = (): Graph => {
    const serverUrl = getServerSideURL()
    return ({
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': `${serverUrl}/#organization`,
                name: 'Adaptive',
                legalName: 'Adaptive',
                url: serverUrl,
                logo: {
                    '@type': 'ImageObject',
                    '@id': `${serverUrl}/#logo`,
                    url: `${serverUrl}/api/media/file/Adaptive-Logo.svg`,
                    contentUrl: `${serverUrl}/api/media/file/Adaptive-Logo.svg`,
                    width: 512,
                    height: 512,
                    caption: 'Adaptive'
                },
                image: {
                    '@id': `${serverUrl}/#logo`,
                },
                sameAs: [
                    'https://www.facebook.com/adaptive', // Update with actual links
                    'https://twitter.com/adaptive',
                    'https://www.linkedin.com/company/adaptive',
                ],
                contactPoint: [
                    {
                        '@type': 'ContactPoint',
                        telephone: '+1-000-000000', // Placeholder
                        contactType: 'customer service',
                        availableLanguage: ['English']
                    }
                ],
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Main Street 1', // Placeholder
                    addressLocality: 'City',        // Placeholder
                    postalCode: '10001',           // Placeholder
                    addressCountry: 'US'
                }
            },
            {
                '@type': 'WebSite',
                '@id': `${serverUrl}/#website`,
                name: 'Adaptive',
                url: serverUrl,
                description: 'Adaptive - Solutions & Services',
                publisher: {
                    '@id': `${serverUrl}/#organization`,
                },
                potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                        '@type': 'EntryPoint',
                        urlTemplate: `${serverUrl}/search?q={search_term_string}`,
                    },
                    ['query-input']: 'required name=search_term_string',
                },
                inLanguage: 'en-US'
            },
        ],
    } as unknown) as Graph
}

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]): BreadcrumbList => {
    return {
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    }
}

export const generateFAQSchema = (items: { question: string; answer: string }[]): FAQPage => {
    return {
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    }
}

export const generatePageSchema = (page: Partial<Page>, faqs?: { question: string; answer: string }[]): Graph => {
    const serverUrl = getServerSideURL()
    const url = `${serverUrl}${page.slug === 'home' ? '' : `/${page.slug}`}`
    const breadcrumbs = [
        { name: 'Home', url: serverUrl },
    ]
    if (page.slug !== 'home') {
        breadcrumbs.push({ name: page.title || 'Page', url })
    }

    const graph: Record<string, unknown>[] = [
        {
            '@type': 'WebPage',
            '@id': `${url}/#webpage`,
            name: page.title || 'Adaptive',
            description: page.meta?.description || '',
            url: url,
            isPartOf: { '@id': `${serverUrl}/#website` },
            breadcrumb: { '@id': `${url}/#breadcrumb` },
            publisher: { '@id': `${serverUrl}/#organization` },
            datePublished: page.createdAt,
            dateModified: page.updatedAt,
            inLanguage: 'en-US'
        },
        {
            ...generateBreadcrumbSchema(breadcrumbs),
            '@id': `${url}/#breadcrumb`,
        },
    ]

    if (faqs && faqs.length > 0) {
        graph.push({
            ...generateFAQSchema(faqs),
            '@id': `${url}/#faq`,
        })

    }

    return ({
        '@context': 'https://schema.org',
        '@graph': graph,
    } as unknown) as Graph
}

export const generatePostSchema = (post: Partial<Post>, faqs?: { question: string; answer: string }[]): Graph => {
    const serverUrl = getServerSideURL()
    const url = `${serverUrl}/posts/${post.slug}`
    const breadcrumbs = [
        { name: 'Home', url: serverUrl },
        { name: 'Posts', url: `${serverUrl}/posts` },
        { name: post.title || 'Post', url },
    ]

    const graph: Record<string, unknown>[] = [
        {
            '@type': 'BlogPosting',
            '@id': `${url}/#post`,
            headline: post.title || '',
            description: post.meta?.description || '',
            image:
                typeof post.meta?.image === 'object' && (post.meta.image as Media)?.url
                    ? `${serverUrl}${(post.meta.image as Media).url}`
                    : undefined,
            datePublished: post.publishedAt || post.createdAt,
            dateModified: post.updatedAt || post.publishedAt,
            author:
                post.populatedAuthors && post.populatedAuthors.length > 0
                    ? {
                        '@type': 'Person',
                        name: post.populatedAuthors[0].name || '',
                        // url: `${serverUrl}/authors/${post.populatedAuthors?.[0]?.slug || ''}` // Assuming authors have slug if needed, otherwise omit
                    }
                    : undefined,
            publisher: { '@id': `${serverUrl}/#organization` },
            url: url,
            mainEntityOfPage: { '@id': `${url}/#webpage` },
            inLanguage: 'en-US'
        },
        {
            '@type': 'WebPage',
            '@id': `${url}/#webpage`,
            url: url,
            breadcrumb: { '@id': `${url}/#breadcrumb` },
            isPartOf: { '@id': `${serverUrl}/#website` }
        },
        {
            ...generateBreadcrumbSchema(breadcrumbs),
            '@id': `${url}/#breadcrumb`,
        },
    ]

    if (faqs && faqs.length > 0) {
        graph.push({
            ...generateFAQSchema(faqs),
            '@id': `${url}/#faq`,
        })
    }

    return ({
        '@context': 'https://schema.org',
        '@graph': graph,
    } as unknown) as Graph
}

export const generateWebinarSchema = (webinar: Partial<Webinar>, faqs?: { question: string; answer: string }[]): Graph => {
    const serverUrl = getServerSideURL()
    const url = `${serverUrl}/webinars/${webinar.slug}`
    const breadcrumbs = [
        { name: 'Home', url: serverUrl },
        { name: 'Webinars', url: `${serverUrl}/webinars` },
        { name: webinar.title || 'Webinar', url },
    ]

    const graph: Record<string, unknown>[] = [
        {
            '@type': 'Event',
            '@id': `${url}/#webinar`,
            name: webinar.title || '',
            description: webinar.meta?.description || '',
            startDate: webinar.date || webinar.publishedAt || webinar.createdAt,
            image:
                typeof webinar.heroImage === 'object' && (webinar.heroImage as Media)?.url
                    ? `${serverUrl}${(webinar.heroImage as Media).url}`
                    : undefined,
            eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
            eventStatus: 'https://schema.org/EventScheduled',
            location: {
                '@type': 'VirtualLocation',
                url: webinar.link || url,
            },
            organizer: { '@id': `${serverUrl}/#organization` },
            performer: webinar.populatedAuthors?.map((author) => ({
                '@type': 'Person',
                name: author.name,
            })) || [],
            url: url,
            mainEntityOfPage: { '@id': `${url}/#webpage` },
            inLanguage: 'en-US'
        },
        {
            '@type': 'WebPage',
            '@id': `${url}/#webpage`,
            url: url,
            breadcrumb: { '@id': `${url}/#breadcrumb` },
            isPartOf: { '@id': `${serverUrl}/#website` }
        },
        {
            ...generateBreadcrumbSchema(breadcrumbs),
            '@id': `${url}/#breadcrumb`,
        },
    ]

    if (faqs && faqs.length > 0) {
        graph.push({
            ...generateFAQSchema(faqs),
            '@id': `${url}/#faq`,
        })
    }

    return ({
        '@context': 'https://schema.org',
        '@graph': graph,
    } as unknown) as Graph
}
