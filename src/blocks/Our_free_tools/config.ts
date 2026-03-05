import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const ToolSection: Block = {
  slug: 'Our_free_tools',
  imageURL: '/block-previews/our_free_tools.png',
  imageAltText: 'Our_free_tools preview',
  interfaceName: 'Our_free_tools',
  labels: {
    singular: 'Our free tools',
    plural: 'Our free toolss',
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
      name: 'tools',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      label: 'Tool  tab',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Button Text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',

        },
        {
          name: 'ButtonText',
          type: 'group',
          label: 'hero link',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Button Name ',
            },
            {
              name: 'url',
              type: 'text',
              label: 'Url',
            },
            {
              name: 'target',
              type: 'select',
              label: 'target',
              options: [
                { label: 'Same Tab', value: '_self' },
                { label: 'New Tab', value: '_blank' },
              ],
              defaultValue: '_self',
            },
          ],
        },
       {
          name: 'Subheading',
          type: 'text',
          label: 'Heading',
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
      ],
    },
    {
      name: 'subheading',
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
