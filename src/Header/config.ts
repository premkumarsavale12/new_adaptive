import type { GlobalConfig } from 'payload'
import { revalidateHeader } from './hooks/revalidateHeader'
import slugify from 'slugify'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'title',
    },
    {
      name: 'slug',
      type: 'text',

      unique: true,

      label: 'slug',
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
      name: 'Announcement_Enable',
      type: 'checkbox',
      defaultValue: true,
      label: { en: 'Enable Announcement Bar', de: 'Ankündigungsleiste aktivieren' },
    },
    {
      name: 'Announcement_Heading',
      type: 'text',

      label: { en: 'Announcement Heading', de: 'Ankündigung Überschrift' },
    },
    {
      name: 'Announcement_Button_text',
      type: 'group',
      label: 'Announcement Button',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'link label',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Url',
        },
        {
          name: 'target',
          type: 'select',
          label: 'target',
          options: [
            { label: 'Same Tab', value: '_self' },
            { label: 'New Tab', value: '_blank' },
          ],
          defaultValue: '_self',
        },
      ],
    },
    {
      name: 'Header_Logo',
      type: 'upload',
      label: 'logo',
      relationTo: 'media',
    },
    {
      name: 'Mobile_Header_Logo',
      type: 'upload',
      label: 'mobile logo',
      relationTo: 'media',
    },
    {
      name: 'menus',
      label: { en: 'Menus', de: 'Menüs' },
      type: 'array',
      fields: [
        {
          name: 'link',
          type: 'group',
          label: { en: 'Link', de: 'Link' },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: { en: 'Link Label', de: 'Link Beschriftung' },
              localized: true,
            },
            {
              name: 'url',
              type: 'text',
              label: { en: 'URL', de: 'URL' },
              localized: true,
            },
            {
              name: 'target',
              type: 'select',
              label: { en: 'Target', de: 'Ziel' },
              options: [
                {
                  label: { en: 'Same Tab', de: 'Gleiches Tab' },
                  value: '_self',
                },
                {
                  label: { en: 'New Tab', de: 'Neues Tab' },
                  value: '_blank',
                },
              ],
              defaultValue: '_self',
            },
          ],
        },
        {
          name: 'menuType',
          type: 'select',
          label: 'Menu Type',
          defaultValue: 'single',
          options: [
            {
              label: 'Single Dropdown',
              value: 'single',
            },
            {
              label: 'Mega Menu',
              value: 'mega',
            },
          ],
        },
        {
          name: 'megaColumns',
          type: 'number',
          label: 'Mega Menu Columns',
          defaultValue: 2,
          admin: {
            condition: (_, siblingData) => siblingData?.menuType === 'mega',
          },
        },
        {
          name: 'megaWidth',
          type: 'select',
          label: 'Mega Menu Width',
          defaultValue: 'md',
          options: [
            { label: 'Small (400px)', value: 'sm' },
            { label: 'Medium (520px)', value: 'md' },
            { label: 'Large (700px)', value: 'lg' },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.menuType === 'mega',
          },
        },

        {
          name: 'submenus',
          label: { en: 'Submenus', de: 'Untermenu' },
          type: 'array',
          fields: [
            {
              name: 'links',
              label: { en: 'Submenu Links', de: 'Untermenu Links' },
              type: 'array',
              fields: [
                {
                  name: 'link',
                  type: 'group',
                  label: { en: 'Link', de: 'Link' },
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      label: { en: 'Link Label', de: 'Link Beschriftung' },
                      localized: true,
                    },
                    {
                      name: 'url',
                      type: 'text',
                      label: { en: 'URL', de: 'URL' },
                      localized: true,
                    },
                    {
                      name: 'target',
                      type: 'select',
                      label: { en: 'Target', de: 'Ziel' },
                      options: [
                        {
                          label: { en: 'Same Tab', de: 'Gleiches Tab' },
                          value: '_self',
                        },
                        {
                          label: { en: 'New Tab', de: 'Neues Tab' },
                          value: '_blank',
                        },
                      ],
                      defaultValue: '_self',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'link',
      type: 'group',
      label: 'Link',
      fields: [
        {
          name: 'Kontakt_label',
          type: 'text',
          label: 'Link Label',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Url',
        },
        {
          name: 'target',
          type: 'select',
          label: 'Target',
          options: [
            {
              label: 'Same Tab',
              value: '_self',
            },
            {
              label: 'New Tab',
              value: '_blank',
            },
          ],
          defaultValue: '_self',
        },
      ],
    },
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'none',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],

    },
    {
      name: 'media',
      type: 'upload',
      label: 'Media',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',

    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
