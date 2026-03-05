import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";



export const Personalized: Block = {
    slug: 'personalized',
  imageURL: '/block-previews/personalized_risk.png',
  imageAltText: 'personalized preview',
    interfaceName: 'personalized',
    labels: {
        singular: 'personalized',
        plural: 'personalized',

    },
    fields: [
        {
            name: 'Items',
            type: 'array',
            label: 'Add Items ',
            fields: [

                {
                    name: 'Heading',
                    type: 'text',
                    label: 'Heading',

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
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                 
                },
            ]
        }
    ]
}