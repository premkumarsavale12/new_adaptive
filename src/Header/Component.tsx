import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { HeaderClient } from './Component.client'

export async function Header() {
  const payload = await getPayload({ config: configPromise })

  const headerData = await payload.findGlobal({
    slug: 'header',
    depth: 2,
  })

  return <HeaderClient data={headerData} />
}
