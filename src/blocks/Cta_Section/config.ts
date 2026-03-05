import { FixedToolbarFeature, HeadingFeature, HorizontalRuleFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";



export const Cta_Section: Block = {
    slug: 'cta_section',
     imageURL: '/block-previews/cta_section.png',
  imageAltText: 'CTA Section',
    interfaceName: 'cta_section',
    labels: {
        singular: 'cta_section',
        plural: 'cta_sections'
    },

    fields: [
        {
            name: 'ctaHeading',
            type: 'text',
            label: 'Heading',
        },
        {
            name: 'descrip',
            type: 'richText',

            editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                ],
            }),
        },
        {
            name: 'button',
            type: 'group',
            label: 'Button',
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    label: 'Button Name',
                },
                {
                    name: 'url',
                    type: 'text',
                    label: 'Url',
                },
                {
                    name: 'target',
                    type: 'select',
                    label: 'Target',
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