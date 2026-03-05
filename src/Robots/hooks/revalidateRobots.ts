import type { GlobalAfterChangeHook } from 'payload'
import { revalidateTag } from 'next/cache'

export const revalidateRobots: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
    payload.logger.info(`Revalidating robots`)
    revalidateTag('robots')
    return doc
}
