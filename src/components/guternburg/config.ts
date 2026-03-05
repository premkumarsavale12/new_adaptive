import type { Field } from 'payload'
import {
  lexicalEditor,
  lexicalHTMLField,
  EXPERIMENTAL_TableFeature,
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'
 
export const GuternContents: Field = {
  name: 'contents',
  type: 'group',
  label: {
    en: 'Contents',
    de: 'Inhalte',
  },
  fields: [
    {
      name: 'Gutenberg',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          EXPERIMENTAL_TableFeature(),
        ],
      }),
      label: {
        en: 'Content (Gutenberg)',
        de: 'Inhalt (Gutenberg)',
      },
    },
    lexicalHTMLField({
      htmlFieldName: 'Gutenberg_html',
      lexicalFieldName: 'Gutenberg',
    }),
    {
      name: 'Featured_image',
      type: 'upload',
      label: {
        en: 'Featured Image',
        de: 'Beitragsbild',
      },
      relationTo: 'media',
     
    },
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: {
        en: 'Type',
        de: 'Typ',
      },
      options: [
        {
          label: { en: 'None', de: 'Keine' },
          value: 'none',
        },
        {
          label: { en: 'High Impact', de: 'Starke Wirkung' },
          value: 'highImpact',
        },
        {
          label: { en: 'Medium Impact', de: 'Mittlere Wirkung' },
          value: 'mediumImpact',
        },
        {
          label: { en: 'Low Impact', de: 'Geringe Wirkung' },
          value: 'lowImpact',
        },
      ],
    
    },
    {
      name: 'media',
      type: 'upload',
      label: {
        en: 'Conditional Media',
        de: 'Bedingte Medien',
      },
      admin: {
        condition: (_, { type } = {}) =>
          ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
     
    },
  ],
}