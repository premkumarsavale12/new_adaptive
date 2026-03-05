import configPromise from '@payload-config'
import { getPayload } from 'payload'

export default async function RelatedPosts() {
  const payload = await getPayload({ config: configPromise })
  const data = await payload.find({
    collection: 'posts',
    limit: 1000, // Adjust as needed, e.g., exclude current post
    // where: { id: { notEquals: currentPostId } }, // Optional: pass current ID if needed
    depth: 2,
  })
  return data
}
