import type { GlobalConfig } from 'payload'
import { revalidateRobots } from './hooks/revalidateRobots'

export const Robots: GlobalConfig = {
    slug: 'robots',
    label: 'Robots.txt',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'rules',
            type: 'array',
            label: 'Rules',
            fields: [
                {
                    name: 'userAgent',
                    type: 'text',
                    label: 'User Agent',
                    defaultValue: '*',

                },
                {
                    name: 'allow',
                    type: 'array',
                    label: 'Allow',
                    fields: [
                        {
                            name: 'path',
                            type: 'text',
                            label: 'Path',

                        },
                    ],
                },
                {
                    name: 'disallow',
                    type: 'array',
                    label: 'Disallow',
                    fields: [
                        {
                            name: 'path',
                            type: 'text',
                            label: 'Path',

                        },
                    ],
                },
            ],
        },
        {
            name: 'sitemaps',
            type: 'array',
            label: 'Sitemaps',
            fields: [
                {
                    name: 'url',
                    type: 'text',
                    label: 'Sitemap URL',

                },
            ],
        },
    ],
    hooks: {
        afterChange: [revalidateRobots],
    },
}
