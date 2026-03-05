import {  FixedToolbarFeature, HeadingFeature, HorizontalRuleFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";




export const Tools_Section: Block = {
    slug: 'tools_section',
    imageURL: '/block-previews/tools_section.png',
    imageAltText: 'Tools Section',
    interfaceName: 'tools_section',
    labels: {
        singular: 'tools_section',
        plural: 'tools_sections'
    },
    fields: [
        {
            name: 'toolsHeading',
            type: 'text',
            label: 'Heading',
        },
        {
            name: 'useAlternateLayout',
            type: 'checkbox',
            label: 'Show Alternate Layout',
            defaultValue: false,
        },
        {
            name: 'content',
            type: 'richText',
            label: 'Add Content',
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
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            label: 'Upload Image',
        },
    ]
}