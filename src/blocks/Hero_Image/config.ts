import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const Hero_Image: Block = {
  slug: 'hero_image',
  imageURL: '/block-previews/hero_image.png',
  imageAltText: 'hero_image preview',
  interfaceName: 'hero_image',
  labels: {
    singular: 'hero_image',
    plural: 'heros_images',
  },
  fields: [
    {
      name: 'heading',
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
    {
      name: 'button1',
      type: 'group',
      label: 'hero link 1',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'link lable',
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
      name: 'button2',
      type: 'group',
      label: 'hero link 2',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'link lable',
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
      name: 'heroImage',
      type: 'upload',
      label: 'Hero Image',
      relationTo: 'media',
    },
  ],
}
