import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    domains: ['adaptive-payload-cms.vercel.app'],
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    webpackConfig.resolve.fallback = {
      ...webpackConfig.resolve.fallback,
      "pino-abstract-transport": false,
      "worker_threads": false,
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
