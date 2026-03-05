import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const Card: Block = {
  slug: 'card',
  imageURL: '/block-previews/card.png',
  imageAltText: 'card preview',
  labels: {
    singular: 'Card Section',
    plural: 'Card Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: false,
    },
  ],
}
