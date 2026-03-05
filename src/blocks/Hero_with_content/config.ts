import { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Hero_with_content: Block = {
  slug: 'hero_with_content',
  imageURL: '/block-previews/hero_with_content.png',
  imageAltText: 'hero_with_content preview',
  interfaceName: 'hero_with_content',
  labels: {
    singular: 'hero_with_content',
    plural: 'hero_with_contents',
  },
  fields: [
    {
      name: 'Heading',
      type: 'text',
      label: 'Heading',
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
      label: false,
    },
    {
      name: 'button1',
      type: 'text',
      label: {
        en: 'Link Label 1',
        de: 'Link-Beschriftung',
      },
    },
    {
      name: 'Url1',
      type: 'text',
      label: {
        en: 'URL',
        de: 'URL',
      },
    },
    {
      name: 'target1',
      type: 'select',
      label: {
        en: 'Target',
        de: 'Ziel',
      },
      options: [
        {
          label: {
            en: 'Same Tab',
            de: 'Gleiches Fenster',
          },
          value: '_self',
        },
        {
          label: {
            en: 'New Tab',
            de: 'Neues Fenster',
          },
          value: '_blank',
        },
      ],
      defaultValue: '_self',
    },
    {
      name: 'button2',
      type: 'text',
      label: {
        en: 'Link Label 2',
        de: 'Link-Beschriftung',
      },
    },
    {
      name: 'Url2',
      type: 'text',
      label: {
        en: 'URL',
        de: 'URL',
      },
    },
    {
      name: 'target2',
      type: 'select',
      label: {
        en: 'Target',
        de: 'Ziel',
      },
      options: [
        {
          label: {
            en: 'Same Tab',
            de: 'Gleiches Fenster',
          },
          value: '_self',
        },
        {
          label: {
            en: 'New Tab',
            de: 'Neues Fenster',
          },
          value: '_blank',
        },
      ],
      defaultValue: '_self',
    },
  ],
}
