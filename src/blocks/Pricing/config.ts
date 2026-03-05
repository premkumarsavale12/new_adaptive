import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const Pricing: Block = {
    slug: 'pricing',
  imageURL: '/block-previews/pricing.png',
  imageAltText: 'pricing preview',
    interfaceName: 'pricing',
    labels: {
        singular: 'pricing',
        plural: 'pricings'
    },
    fields: [
        {
            name: 'pricing_main_title',
            type: 'textarea',
        
        },



        // {
        //     name: 'pricing_description',
        //     type: 'textarea',
        // }, 

        {
            name: 'pricing_description',
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

        /* ===== Monthly Pricing ===== */
        {
            name: 'monthly',
            type: 'group',
            fields: [
                {
                    name: 'headers',
                    type: 'array',
                    fields: [
                        { name: 'plan_title', type: 'text' },

                        // { name: 'plan_description', type: 'text' },  

                        {
                            name: 'plan_description',
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


                        { name: 'cta_text', type: 'text' },
                    ],
                },
                {
                    name: 'features',
                    type: 'array',
                    fields: [
                        { name: 'feature_name', type: 'textarea' },
                        { name: 'feature_hover_name', type: 'text' },
                        { name: 'investor_plan', type: 'text' },
                        { name: 'advisor_plan', type: 'text' },
                        { name: 'advisor_pro_plan', type: 'text' },
                    ],
                },
            ],
        },

        /* ===== Yearly Pricing ===== */
        {
            name: 'yearly',
            type: 'group',
            fields: [
                {
                    name: 'headers',
                    type: 'array',
                    fields: [
                        { name: 'plan_title', type: 'text' },
                        // { name: 'plan_description', type: 'text' }, 
                        {
                            name: 'plan_description',
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
                        { name: 'cta_text', type: 'text'},
                    ],
                },
                {
                    name: 'features',
                    type: 'array',
                    fields: [
                        { name: 'feature_name', type: 'textarea' },
                        { name: 'feature_hover_name', type: 'text' },
                        { name: 'investor_plan', type: 'text' },
                        { name: 'advisor_plan', type: 'text' },
                        { name: 'advisor_pro_plan', type: 'text' },
                    ],
                },
            ],
        },
    ],
};
