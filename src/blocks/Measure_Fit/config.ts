import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";



export const Measure_Fit: Block = {
    slug: 'measure_fit',
  imageURL: '/block-previews/measure_of_fit_to_portfolio.png',
  imageAltText: 'measure_fit preview',
    interfaceName: 'measure_fit',
    labels: {
        singular: 'measure_fit',
        plural: 'measure_fits'
    },
    fields: [

        {
            name: 'Heading',
            type: 'text',
            label: 'Heading',

        },

        {
            name: 'Items',
            type: 'array',
            label: 'Add Item',
            fields: [
                {
                    name: 'Heading',
                    type: "text",
                    label: 'Heading'
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


            ]
        },

        {
            name: 'Image',
            type: 'upload',
            relationTo: 'media',
            label: 'Upload Image '
        },
          {
      name: 'button',
      type: 'group',
      label: 'hero link',
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
    ]
} 