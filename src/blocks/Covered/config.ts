import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";



export const Covered: Block = {
    slug: 'covered',
  imageURL: '/block-previews/covered.png',
  imageAltText: 'covered preview',
    interfaceName: 'covered',
    labels: {
        singular: 'covered',
        plural: 'covered'
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
            name: 'SubHeading',
            type: 'text',
            label: 'SubHeading',

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
        },

        {
            name: 'Image',
            type: 'upload',
            relationTo: 'media',
            label: 'Upload Image'
        }
    ]
}