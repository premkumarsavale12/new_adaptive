
import { Block } from "payload";
import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";

export const HorizontalContent: Block = {
    slug: 'horizontalContent',
  imageURL: '/block-previews/advisor&wealth.png',
  imageAltText: 'horizontalContent preview',
    interfaceName: 'horizontalContent',

    labels: {
        singular: 'Advisors & Wealth Managers',
        plural: 'Advisors & Wealth Managers',
    },
    fields: [
        {
            name: 'items',
            type: 'array',
            label: 'Content Rows',
            fields: [
                {
                    name: 'title',
                    type: 'text',

                },
                {
                    name: 'subtitle',
                    type: 'text',
                },
               
                {
                    name: 'richText',
                    type: 'richText',
                    editor: lexicalEditor({
                        features: ({ defaultFeatures }) => {
                            return [
                                ...defaultFeatures,
                                HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                                FixedToolbarFeature(),
                                InlineToolbarFeature(),
                            ]
                        },
                    }),
                    label: false,
                },
                {
                    name: 'buttonText',
                    type: 'text',
                },
                {
                    name: 'buttonUrl',
                    type: 'text',
                },
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',

                },
            ],
        },
    ],
}
