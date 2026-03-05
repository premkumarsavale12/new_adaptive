import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";




export const What_is_project_risk: Block = {
    slug: 'what_is_project_risk',
  imageURL: '/block-previews/what_is_project_risk.png',
  imageAltText: 'what_is_project_risk preview',
    interfaceName: 'what_is_project_risk',
    labels:
    {
        singular: 'what_is_project_risk',
        plural: 'what_is_project_risks'
    },
    fields: [
        {
            name: 'Heading',
            type: 'text',
            label: 'Heading'
        },

        {
            name: 'descritpion',
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
            label: ' Add Descritpion',
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
                    label: ' Add  Content',
                },
            ]
        },
        {
            name: 'Category',
            type: 'array',
            label: 'Add Category',
            fields: [
                {
                    name: 'project_risk',
                    type: 'text',
                    label: 'PROJECTED RISK'
                },
                {
                    name: 'vix_range',
                    type: 'text',
                    label: 'VIX RANGE'
                },
                {
                    name: 'notes',
                    type: 'text',
                    label: '	NOTES'
                }
            ]
        },



        {
            name: 'descrip',
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
            label: ' Add Descrip',
        },



    ]

}
