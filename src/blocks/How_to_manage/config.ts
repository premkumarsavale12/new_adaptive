import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";



export const How_to_manage: Block = {
    slug: 'how_to_manage',
    imageURL: '/block-previews/how_to_manage_to_cost.png',
    imageAltText: 'how_to_manage preview',
    interfaceName: 'how_to_manage',
    labels: {
        singular: 'how_to_manage',
        plural: 'how_to_manages'
    },
    fields: [
        {
            name: 'Heading',
            type: 'text',
            label: 'Heading'
        },

        {
            name: 'first_Description',
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
            label: "First Description",
        },

        {
            name: 'Second_Description',
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
            label: "Second_Description",
        },

        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
       
            label: 'Image upload'
        }

    ]
}  