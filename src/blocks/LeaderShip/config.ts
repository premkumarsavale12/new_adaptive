import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const LeaderShip: Block = {
  slug: 'leaderShip',
  imageURL: '/block-previews/leadership.png',
  imageAltText: 'leaderShip preview',
  interfaceName: 'leaderShip',
  labels: {
    singular: 'leaderShip',
    plural: 'ledaerShips',
  },
  fields: [
    {
      name: 'Heading',
      type: 'text',
      label: 'heading',
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
      name: 'Items',
      type: 'array',
      fields: [
        {
          name: 'Image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
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
          name: 'title',
          type: 'text',
          label: 'Name',
        },
        {
          name: 'designation',
          type: 'text',
          label: 'Designation',
        },
      ],
    },
  ],
}
