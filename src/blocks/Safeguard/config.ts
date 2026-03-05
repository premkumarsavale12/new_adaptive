import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";



export const Safeguard: Block = {
    slug: 'safeguard',
  imageURL: '/block-previews/safeguard.png',
  imageAltText: 'safeguard preview',
    interfaceName: 'safeguard',
    labels: {
        singular: 'safeguard',
        plural: 'safeguard'
    },
    fields: [
        {

            name: 'Heading',
            type: 'text',
            label: "Heading",
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
            name: 'Items',
            type: 'array',
            label: 'Add Item',
            fields: [
                {
                    name: 'Image',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'Upload Image '
                },
                {
                    name: 'Heading',
                    type: 'text',
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
            name: 'button',
            type: 'group',
            label: 'Button link ',
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    label: 'button',
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