const archiveServerHostname = process.env.NEXT_PUBLIC_ARCHIVE_CONTENT_LINK

import { join } from 'node:path'
/* import { withSentryConfig } from '@sentry/nextjs' */
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import securityHeaders from './securityHeaders'

/* import { getAllRedirects } from './sanity/interface/redirects' */

const withNextIntl = createNextIntlPlugin()

const isProd = process.env.NODE_ENV === 'production'
/* const sentryConfig = {
  org: 'equinor',
  project: 'equinor-com',
  silent: true,
  disableLogger: true,
  widenClientFileUpload: true,
  disableClientWebpackPlugin: !isProd,
  disableServerWebpackPlugin: !isProd,
} */

//TODO: Find the Redirect type from config that is not in /dist.
export type ConfigRedirect = {
  source: string
  destination: string
  basePath?: false | undefined
  locale?: false | undefined
  has?: any[] | undefined
  missing?: any[]
} & (
  | {
      statusCode?: never
      permanent: boolean
    }
  | {
      statusCode: number
      permanent?: never
    }
)

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ['friendly-challenge', '@energyvision/shared'],
  turbopack: {
    root: join(__dirname, '../../'),
  },
  //this includes files from the monorepo base two directories up
  outputFileTracingRoot: join(__dirname, '../../'),
  outputFileTracingIncludes: {
    '../shared/*': ['../shared/*'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'cdn.equinor.com',
      },
    ],
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async rewrites() {
    return [
      // Archive_Rule: This rule load the archived images from dam
      {
        source: '/content/dam/:slug*',
        destination: `${archiveServerHostname}/content/dam/:slug*`,
      },
      // Archive_Rule: This rule loads the necessary client libraries for old html content
      {
        source: '/etc.clientlibs/:slug*',
        destination: `${archiveServerHostname}/etc.clientlibs/:slug*`,
      },
      {
        source: '/legacy/:slug*',
        destination: `${archiveServerHostname}/:slug*`,
      },
    ].filter(e => e)
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, immutable',
          },
        ],
      },
    ].filter(e => e)
  },
  /*   async redirects() {
    return getAllRedirects()
  }, */
  env: {
    // Matches the behavior of `sanity dev` which sets styled-components to use the fastest way of inserting CSS rules in both dev and production. It's default behavior is to disable it in dev mode.
    SC_DISABLE_SPEEDY: 'false',
  },
  experimental: {
    optimizePackageImports: [
      '@equinor/eds-core-react',
      '@equinor/eds-icons',
      'video.js',
    ],
  },
}

export default withNextIntl(nextConfig)
