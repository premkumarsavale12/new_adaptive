import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import type { Webinar } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<Webinar> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const { revalidatePath, revalidateTag } = await import('next/cache')

    if (doc._status === 'published') {
      const path = `/webinars/${doc.slug}`

      payload.logger.info(`Revalidating webinar at path: ${path}`)

      revalidatePath(path)
      revalidateTag('webinars-sitemap')
    }

    // If the webinar was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/webinars/${previousDoc.slug}`

      payload.logger.info(`Revalidating old webinar at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('webinars-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Webinar> = async ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const { revalidatePath, revalidateTag } = await import('next/cache')
    const path = `/webinars/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('webinars-sitemap')
  }

  return doc
}
