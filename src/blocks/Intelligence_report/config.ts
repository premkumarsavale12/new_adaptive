import { FixedToolbarFeature, HeadingFeature, HorizontalRuleFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";



export const Intelligence_report: Block = {
    slug: 'intelligences_report',
     imageURL: '/block-previews/intelligence_report.png',
  imageAltText: 'Intelligence Report',
    interfaceName: 'intelligences_report',
    labels: {
        singular: 'intelligences_report',
        plural: 'intelligences_reports'
    },
    fields: [
        {
            name: 'intelligences',
            type: 'array',
            fields: [
                {
                    name: 'intelligenceHeading',
                    type: 'text',
                    label: 'Heading',
                },
                {
                    name: 'description',
                    type: 'richText',
                    label: 'Add Description',

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
            ],
        },
    ]
}