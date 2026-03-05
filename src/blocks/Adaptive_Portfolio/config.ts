import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";



export const Adaptive_Portfolio: Block = {
    slug: 'adaptive_portfolio',
  imageURL: '/block-previews/adaptive_portfolio.png',
  imageAltText: 'adaptive_portfolio preview',
    interfaceName: 'adaptive_portfolio',
    labels: {
        singular: 'adaptive_portfolio',
        plural: 'adaptive_portfolios'
    },

    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'title'
        },
        {
            name: 'description',
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
            name: 'ProtectionLevels',
            type: 'array',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    label: 'title'
                },



                {
                    name: 'content',
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
                    label: 'Add conclusion',
                },
            ]
        },


        {
            name: 'conclusion',
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
            label: 'Add conclusion',
        },


    ]
}