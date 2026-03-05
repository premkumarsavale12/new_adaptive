import type { Block } from 'payload'

export const Personalize: Block = {
  slug: 'personalize',
  imageURL: '/block-previews/personalize_risk.png',
  imageAltText: 'personalize preview',
  interfaceName: 'personalize',
  labels: {
    singular: 'personalize',
    plural: 'personalize'
  },
  fields: [
    {
      name: 'box1_title',
      label: 'Box 1 Title',
      type: 'richText',

    },
    {
      name: 'box1_description',
      label: 'Box 1 Description',
      type: 'richText',

    },
    {
      name: 'box1_personalize_content',
      label: 'Box 1 Bold Content',
      type: 'richText',

    },
    {
      name: 'box1_BTN',
      label: 'Box 1 Button',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Button Text',
          type: 'text',
        },
        {
          name: 'url',
          label: 'Button URL',
          type: 'text',

        },
      ],
    },



    {
      name: 'box2_title',
      label: 'Box 2 Title',
      type: 'richText',

    },
    {
      name: 'box2_description',
      label: 'Box 2 Description',
      type: 'richText',

    },
    {
      name: 'box2_automate_list',
      label: 'Automation List',
      type: 'array',
      fields: [
        {
          name: 'condition_image',
          label: 'Icon Image',
          type: 'upload',
          relationTo: 'media',

        },
        {
          name: 'condition_items',
          label: 'List Text',
          type: 'text',

        },
      ],
    },
    {
      name: 'automate_sub_title',
      label: 'Automation Bold Subtitle',
      type: 'richText',

    },
    {
      name: 'box2_BTN',
      label: 'Box 2 Button',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Button Text',
          type: 'text',

        },
        {
          name: 'url',
          label: 'Button URL',
          type: 'text',

        },
      ],
    },
  ],
}
