import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";



export const Manage_PortFilio: Block = {

    slug: 'manage_portfilio',
  imageURL: '/block-previews/manage.png',
  imageAltText: 'manage_portfilio preview',
    interfaceName: 'manage_portfilio',
    labels: {
        singular: 'manage_portfilio',
        plural: 'manage_portfilios'
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
    ]

}