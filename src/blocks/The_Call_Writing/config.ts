import { Block } from "payload";

export const The_call_Writing: Block = {
  slug: "the_call_writing",
  imageURL: '/block-previews/the_call_writing_tool.png',
  imageAltText: 'the_call_writing preview',
  interfaceName: 'the_call_writing',
  labels: {
    singular: "the_call_writing",
    plural: "the_cal_writings",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
    },
    {
      name: "des",
      type: "richText",
      label: "Description",
    },
    {
      name: "measures",
      type: "array",
      label: "Measures",
      fields: [
        {
          name: "item_title",
          type: "text",
          label: "Item Title",
        },
        {
          name: "item_desc",
          type: "richText",
          label: "Item Description",
        },
        {
          name: "description",
          type: "richText",
          label: "Alternate Description",
        },
      ],
    },

    {
      name: "imageSrc",
      type: "upload",
      relationTo: "media",
      label: "Image",
    },

  ],
};
