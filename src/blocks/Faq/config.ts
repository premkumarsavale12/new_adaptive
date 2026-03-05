import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const Faq: Block = {
  slug: "faq",
  imageURL: '/block-previews/faq.png',
  imageAltText: 'faq preview',
  interfaceName: "FaqBlock",
  labels: {
    singular: "FAQ Section",
    plural: "FAQ Sections",
  },
  fields: [
    {
      name: "faq_title",
      type: "text",
      label: "Main Title",
    },
    {
      name: "faq_desc",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
        ],
      }),
      label: "Description",
    },
    {
      name: "categories",
      type: "array",
      label: "FAQ Categories",

      fields: [
        {
          name: "name",
          type: "text",
          label: "Category Name",
        },
        {
          name: "posts",
          type: "array",
          label: "Questions",

          fields: [
            {
              name: "title",
              type: "text",

              label: "Question",
            },
            {
              name: "content",
              type: "richText",
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                ],
              }),
              label: "Answer",
            },
          ],
        },
      ],
    },
  ],
};
