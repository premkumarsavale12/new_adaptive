import type { GlobalConfig } from 'payload'
import { revalidateFooter } from './hooks/revalidateFooter'
import slugify from 'slugify'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: {
    en: 'Footer',
    de: 'Fußzeile',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: {
        en: 'Title',
        de: 'Titel',
      },
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        readOnly: true,
      },
      label: {
        en: 'Slug',
        de: 'Kurzlink',
      },
      hooks: {
        beforeValidate: [
          ({ siblingData, value }) => {
            if (siblingData?.title) {
              return slugify(siblingData.title, { lower: true })
            }
            return value
          },
        ],
      },
    },
    {
      name: 'footerlogo',
      type: 'upload',
      label: {
        en: 'Footer Logo',
        de: 'Fußzeilen-Logo',
      },
      relationTo: 'media',
    },
    {
      name: 'navigation',
      label: {
        en: 'Navigation',
        de: 'Navigation',
      },
      type: 'array',
      labels: {
        singular: { en: 'Navigation Group', de: 'Navigationsgruppe' },
        plural: { en: 'Navigation Groups', de: 'Navigationsgruppen' },
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: {
            en: 'Heading',
            de: 'Überschrift',
          },

        },
        {
          name: 'menus',
          type: 'array',
          labels: {
            singular: { en: 'Menu Item', de: 'Menüpunkt' },
            plural: { en: 'Menu Items', de: 'Menüpunkte' },
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: {
                en: 'Link Label',
                de: 'Linktext',
              },

            },
            {
              name: 'url',
              type: 'text',
              label: {
                en: 'URL',
                de: 'URL',
              },

            },
          ],
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      label: {
        en: 'Copyright Text',
        de: 'Copyright Text',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
