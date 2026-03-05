import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const What_is_market: Block = {
    slug: 'what_is_market',
  imageURL: '/block-previews/what_is_the_market.png',
  imageAltText: 'what_is_market preview',
    interfaceName: 'what_is_market',
    labels: {
        singular: 'what_is_market',
        plural: 'what_is_markets'
    },


    fields: [

        {
            name: 'title',
            type: 'text',
   

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
            name: 'protectionDetails',
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
            name: 'protectionDetailsArray',
            type: 'array',


            fields: [

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
                    label: false,
                },
            ],
        },

        {
            name: 'imageSrc',
            type: 'upload',
            relationTo: 'media',


        },
    ],
};


