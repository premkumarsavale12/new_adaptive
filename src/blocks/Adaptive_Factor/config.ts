import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";



export const Adaptive_Factor: Block = {
    slug: 'adaptive_factor',
  imageURL: '/block-previews/adaptive_factor.png',
  imageAltText: 'adaptive_factor preview',
    interfaceName: 'adaptive_factor',
    labels: {
        singular: 'adaptive_factor',
        plural: 'adaptive_factors'
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
                }
            ]
        }
    ]
}