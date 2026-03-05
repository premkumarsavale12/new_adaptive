import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";



export const Tailored_downside: Block = {
    slug: "tailored_downside",
  imageURL: '/block-previews/tailored_downside.png',
  imageAltText: 'tailored_downside preview',
    interfaceName: 'tailored_downside',
    labels: {
        singular: 'tailwored_downside',
        plural: 'tailwored_downsides'
    },
    fields: [
        {

            name: 'Items',
            type: 'array',
            label: 'Add Items',
            fields: [
                {
                    name: 'Heading',
                    type: "text",
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