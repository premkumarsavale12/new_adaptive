import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import type { Promotion } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<Promotion> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const { revalidatePath, revalidateTag } = await import('next/cache')

    if (doc._status === 'published') {
      const path = `/Promotion/${doc.slug}`

      payload.logger.info(`Revalidating promotion at path: ${path}`)

      revalidatePath(path)
      revalidateTag('promotion-sitemap')
    }

    // If the promotion was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/Promotion/${previousDoc.slug}`

      payload.logger.info(`Revalidating old promotion at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('promotion-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Promotion> = async ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const { revalidatePath, revalidateTag } = await import('next/cache')
    const path = `/Promotion/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('promotion-sitemap')
  }

  return doc
}
