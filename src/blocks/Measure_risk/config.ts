import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";



export const Measure_risk: Block = {
    slug: 'measure_risk',
    imageURL: '/block-previews/measures_of_risk.png',
    imageAltText: 'measure_risk preview',
    interfaceName: 'measure_risk',
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
                    label: 'Upload Image'
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
        }

    ]

}