import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const For_Feature: Block = {
    slug: 'for_feature',
  imageURL: '/block-previews/for_feature.png',
  imageAltText: 'for_feature preview',
    interfaceName: 'for_feature',
    labels: {
        singular: 'for_feature',
        plural: 'for_feature'
    },
    fields: [
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

        {
            name: 'Items',
            type: 'array',
            label: 'Add Items',
            fields: [
                {
                    name: 'Image',
                    type: 'upload',
                    relationTo: 'media',


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
            label: 'Button',
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    label: 'Button Name',
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