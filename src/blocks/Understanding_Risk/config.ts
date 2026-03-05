import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const Understanding_Risk: Block = {
    slug: 'understanding_risk',
    imageURL: '/block-previews/understanding_risk.png',
    imageAltText: 'understanding_risk preview',
    interfaceName: 'understanding_risk',
    labels: {
        singular: 'understanding_risk',
        plural: 'understanding_risks'
    },
    fields: [
        {
            name: 'Heading',
            type: 'text',
            label: 'Heading',

        },

        {
            name: 'description',
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
            label: 'Add Content',
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

        {
            name: 'content',
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
            label: 'Add Content',
        },

        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
        },



        {
            name: 'SubHeading',
            type: 'text',
            label: 'SubHeading',
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
            label: 'Add Content',
        },

        {
            name: 'list',
            type: 'richText',
            editor: lexicalEditor({
                features: ({ defaultFeatures }) => {
                    return [
                        ...defaultFeatures,
                        HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                        FixedToolbarFeature(),
                        InlineToolbarFeature(),
                    ]
                },
            }),
            label: 'Add list Item',
        },


        {
            name: 'bottomdescription',
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
            label: 'Add Botton  Description ',
        },


    ]
}