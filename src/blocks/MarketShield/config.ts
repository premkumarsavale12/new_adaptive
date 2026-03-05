import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const MarketShield: Block = {
  slug: 'marketShield',
  imageURL: '/block-previews/market_shield.png',
  imageAltText: 'marketShield preview',
  interfaceName: 'marketShield',
  labels: {
    singular: 'MarketShieldSection',
    plural: 'MarketShieldSections',
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
        features: ({ defaultFeatures }) => {
          return [
            ...defaultFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    {
      name: 'ctaText',
      type: 'text',
    },
    {
      name: 'ctaLink',
      type: 'text',
    },

    {
      name: 'subheading',
      type: 'text',
    },

    {
      name: 'features',
      type: 'array',
      label: 'Feature Items',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
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
        },
      ],
    },

    {
      name: 'Bottom_subheading',
      type: 'text',
    },
    {
      name: 'subrichText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => {
          return [
            ...defaultFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
  ],
}
