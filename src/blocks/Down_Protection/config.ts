import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";



export const Down_Protection: Block = {
    slug: 'down_protection',
  imageURL: '/block-previews/downside_protection.png',
  imageAltText: 'down_protection preview',
    interfaceName: 'down_protection',
    labels: {
        singular: 'down_protection',
        plural: 'down_protections'
    },
    fields:
        [
            {
                name: 'Heading',
                type: 'text',
                label: "Heading"
            },

            {
                name: 'Description',
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
                label: 'Upload Image'
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
