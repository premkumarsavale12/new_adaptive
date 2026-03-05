import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  imageURL: '/block-previews/mediaBlock.jpg',
  imageAltText: 'mediaBlock preview',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
