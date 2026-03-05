import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";



export const Advisors_Choose_Adaptive: Block = {
    slug: 'advisors_choose_adaptive',
  imageURL: '/block-previews/why_advisors_choose_adaptive.png',
  imageAltText: 'advisors_choose_adaptive preview',
    interfaceName: 'advisors_choose_adaptive',
    labels: {
        singular: 'advisors_choose_adaptive',
        plural: 'advisors_choose_adaptives'

    },
    fields: [
        {
            name: 'Heading',
            type: 'text',
            label: 'Heading'
        },

        {
            name: 'Items',
            type: "array",
            fields: [
                {
                    name: 'heading',
                    type: 'text',
                    label: 'heading'
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
                    name: 'Image',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'Upload Image'
                }

            ]

        },

        {
            name: 'SubHeading',
            type: 'text',
            label: 'SubHeading'
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
}