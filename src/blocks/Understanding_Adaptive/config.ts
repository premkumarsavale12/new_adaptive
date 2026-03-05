import { Block } from "payload";


export const UnderStanding_Adaptive: Block = {
    slug: 'understanding_adaptive',
    imageURL: '/block-previews/understanding_adaptive.png',
    imageAltText: 'understanding_adaptive preview',
    interfaceName: 'understanding_adaptive',
    labels: {
        singular: 'understanding_adaptive',
        plural: 'understanding_adaptives'
    },


    fields: [
        {
            name: "title",
            type: "richText",

        },

        {
            name: "factor_analysis_desc",
            type: "richText",

        },

        {
            name: "factor_analysis_sub",
            type: "array",
            label: "Factor Analysis Points",
            admin: {
                initCollapsed: false,
            },
            fields: [
                {
                    name: "title",
                    type: "richText",

                },
            ],
        },

        {
            name: "basket_title",
            type: "richText",

        },

        {
            name: "basket",
            type: "array",
            label: "Basket Items",
            admin: {
                initCollapsed: false,
            },
            fields: [
                {
                    name: "title",
                    type: "text",

                },
                {
                    name: "desc",
                    type: "richText",

                },
            ],
        },
    ],
};

