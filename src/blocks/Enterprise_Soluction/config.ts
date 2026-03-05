import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";



export const Enterprise_Soluction: Block = {
    slug: 'enterprise_soluction',
  imageURL: '/block-previews/enterprise_solcutions.png',
  imageAltText: 'enterprise_soluction preview',
    interfaceName: 'enterprise_soluctuon',
    labels: {
        singular: 'enterprise_solucton',
        plural: 'enterprise_soluctions'
    },

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
            name: 'Items',
            type: "array",
            label: 'Add Items',
            fields: [
                {
                    name: 'Heading',
                    type: "text",
                    label: "Heading"
                },

                {
                    name: 'Title',
                    type: 'text',
                    label: 'Title'
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
                    label: 'Upload Image',
                    relationTo: 'media'
                }

            ]
        }
    ]
}