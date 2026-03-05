import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";



export const See_For: Block = {
    slug: 'see_for',
  imageURL: '/block-previews/sea_for.png',
  imageAltText: 'see_for preview',
    interfaceName: 'sea_for',
    labels: {
        singular: 'sea_for',
        plural: 'sea_fors'
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


        {
            name: 'button',
            type: 'group',
            label: 'Button link ',
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    label: 'button',
                },
                {
                    name: 'url',
                    type: 'text',
                    label: 'Url',
                },
                {
                    name: 'target',
                    type: 'select',
                    label: 'target',
                    options: [
                        { label: 'Same Tab', value: '_self' },
                        { label: 'New Tab', value: '_blank' },
                    ],
                    defaultValue: '_self',
                },
            ],
        },
    ]
}