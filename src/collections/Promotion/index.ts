import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

import { For_Feature } from '../../blocks/For_Feature/config'
import { HorizontalContent as AdvisorsWealthManagers } from '../../blocks/Advisors-Wealth-Managers/config'
import { Tools_Section } from '@/blocks/Tools_Section/config'
import { Intelligence_report } from '@/blocks/Intelligence_report/config'
import { Cta_Section } from '@/blocks/Cta_Section/config'
import { Media_Section } from '@/blocks/Media_Section/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'

import { populateAuthors } from './hook/populateAuthors'
import { revalidatePost, revalidateDelete } from './hook/revalidatePost'


import { slugField } from 'payload'

export const Promotion: CollectionConfig<'promotion'> = {
    slug: 'promotion',
    access: {
        create: authenticated,
        delete: authenticated,
        read: authenticatedOrPublished,
        update: authenticated,
    },
    defaultPopulate: {
        title: true,
        slug: true,
    },
    admin: {
        defaultColumns: ['title', 'slug', 'updatedAt'],
        livePreview: {
            url: ({ data, req }) =>
                generatePreviewPath({
                    slug: data?.slug,
                    collection: 'promotion',
                    req,
                }),
        },
        preview: (data, { req }) =>
            generatePreviewPath({
                slug: data?.slug as string,
                collection: 'promotion',
                req,
            }),
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
           
        },
        {
            type: 'tabs',
            tabs: [


                {
                    name: 'Component',
                    label: 'Component',
                    fields: [

                    ]
                },

            ],
        },
        {
            name: 'layout',
            type: 'blocks',
            blocks: [For_Feature, AdvisorsWealthManagers, Tools_Section, Intelligence_report, Cta_Section, Media_Section]
        },

        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                date: { pickerAppearance: 'dayAndTime' },
                position: 'sidebar',
            },
            hooks: {
                beforeChange: [
                    ({ siblingData, value }) => {
                        if (siblingData._status === 'published' && !value) {
                            return new Date()
                        }
                        return value
                    },
                ],
            },
        },
        {
            name: 'authors',
            type: 'relationship',
            admin: { position: 'sidebar' },
            hasMany: true,
            relationTo: 'users',
        },
        {
            name: 'populatedAuthors',
            type: 'array',
            access: { update: () => false },
            admin: { disabled: true, readOnly: true },
            fields: [
                { name: 'id', type: 'text' },
                { name: 'name', type: 'text' },
            ],
        },
        slugField(),
    ],
    hooks: {
        afterChange: [revalidatePost],
        afterRead: [populateAuthors],
        afterDelete: [revalidateDelete],
    },
    versions: {
        drafts: {
            autosave: { interval: 100 },
            schedulePublish: true,
        },
        maxPerDoc: 50,
    },
}