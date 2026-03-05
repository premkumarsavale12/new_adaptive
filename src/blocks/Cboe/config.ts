import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";



export const Cboe: Block = {
    slug: 'cboe',
  imageURL: '/block-previews/cboe.png',
  imageAltText: 'cboe preview',
    interfaceName: 'cboe',
    labels: {
        singular: 'cboe',
        plural: 'cboes'
    },
    fields: [
        {
            name: 'Image',
            type: 'upload',
            relationTo: 'media',
            label: 'Image Upload'
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

        {
            name: 'SubHeading',
            type: 'text',
            label: 'SubHeading'
        },


        {

            name: 'SImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Uplaod Image'

        }

    ]
}

