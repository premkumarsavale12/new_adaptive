import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const Market_Shield_for_Individual: Block = {
  slug: 'market_shield_for_individual',
  imageURL: '/block-previews/market_shield_for_individuals.png',
  imageAltText: 'market_shield_for_individual preview',
  interfaceName: 'market_shield_for_individual',
  labels: {
    singular: 'market_shield_for_individual',
    plural: 'market_shield_for_individuals',
  },
  fields: [
    {
      name: 'Heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image Upload',
    },
  ],
}
