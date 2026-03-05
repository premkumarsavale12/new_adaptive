import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { Robots } from './Robots/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'

import { Webinars } from './collections/Webinars'
import { Promotion } from './collections/Promotion'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL:
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.NODE_ENV === 'production'
      ? 'https://adaptive-payload-cms.vercel.app'
      : 'http://localhost:3000'),

  admin: {
    meta: {
      titleSuffix: '- Adaptive',
      icons: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          url: '/media/favicon.ico',
        },
      ],
    },
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
      graphics: {
        Icon: '@/components/Graphics/Icon',
        Logo: '@/components/Graphics/Logo',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },

  editor: defaultLexical,

  // ✅ POSTGRES CONFIG
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    schemaName: 'adap_schema',
  }),

  collections: [Pages, Posts, Webinars, Promotion, Media, Categories, Users],

  cors: [
    'https://adaptive-payload-cms.vercel.app',
    'http://localhost:3000',
    process.env.NEXT_PUBLIC_SERVER_URL,
  ].filter(Boolean) as string[],

  globals: [Header, Footer, Robots],

  plugins,

  secret: process.env.PAYLOAD_SECRET,

  sharp,

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true

        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
