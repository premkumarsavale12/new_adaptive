import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";



export const The_Put_Buying: Block = {
    slug: 'the_put_buying',
  imageURL: '/block-previews/the_put_buying_tool.png',
  imageAltText: 'the_put_buying preview',
    interfaceName: 'the_put_buying',
    labels: {
        singular: 'the_put_buying',
        plural: 'the_put_buyings'
    },
    fields: [
        {
            name: 'Heading',
            type: 'text',
            label: 'Heading'
        },

        {
            name: 'Items',
            type: 'array',
            label: 'Add Items',
            fields: [
                {
                    name: 'Heading',
                    type: 'text',
                    label: "Heading"
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