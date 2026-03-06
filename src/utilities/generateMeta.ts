import type { Metadata } from 'next'
import type { Media, Page, Post, Webinar, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | Partial<Webinar> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? doc?.meta?.title + ' | Adaptive'
    : 'Adaptive'

  const urlPath = Array.isArray(doc?.slug) ? doc?.slug.join('/') : (doc?.slug || '')
  const serverUrl = getServerSideURL()
  const canonicalUrl = serverUrl + (urlPath.startsWith('/') ? urlPath : `/${urlPath}`)

  return {
    metadataBase: new URL(serverUrl || 'http://localhost:3000'),
    title,
    description: doc?.meta?.description || 'Adaptive Template',
    authors: [{ name: 'Adaptive' }],
    keywords: ['Adaptive', 'Next.js', 'React', 'Payload CMS'],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || 'Adaptive Template',
      images: ogImage
        ? [
          {
            url: ogImage,
          },
        ]
        : undefined,
      title,
      url: canonicalUrl,
    }),
    alternates: {
      canonical: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: doc?.meta?.description || 'Adaptive Template',
      images: ogImage ? [ogImage] : undefined,
    },
  }
}
