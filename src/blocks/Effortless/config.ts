import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const Effortless: Block = {
    slug: 'effortless',
  imageURL: '/block-previews/effortless.png',
  imageAltText: 'effortless preview',
    interfaceName: 'effortless',
    labels: {
        singular: 'effortless',
        plural: 'effortlesss'
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
            name: 'SubHeading',
            type: 'text',
            label: 'SubHeading'
        },
        {
            name: 'Items',
            type: 'array',
            label: 'Add Items',
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
            ]

        },




        {
            name: 'SubrichText',
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