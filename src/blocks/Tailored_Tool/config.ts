import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const Tailored_Tool: Block = {
  slug: 'tailored_tool',
  imageURL: '/block-previews/tailored_tools.png',
  imageAltText: 'tailored_tool preview',
  interfaceName: 'tailored_tool',
  labels: {
    singular: 'tailored_tool',
    plural: 'tailored_tools',
  },

  fields: [
    {
      name: 'Heading',
      type: 'text',
      label: 'Heading',
    },

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Upload Image',
    },
    {
      name: 'item',
      type: 'array',
      label: 'Add Items',
      fields: [
          {
      name: 'Check_Image',
      type: 'upload',
      relationTo: 'media',
      label: 'Upload Checked Image',
    },
        {
          name: 'heading',
          type: 'text',
          label: 'heading',
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
      ],
    },
  ],
}
