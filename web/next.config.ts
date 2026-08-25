/** biome-ignore-all assist/source/organizeImports: <explanation> */
// 1. Fetch the environment variable
let archiveServerHostname = process.env.NEXT_PUBLIC_ARCHIVE_CONTENT_LINK

// 2. SAFETY CHECK: If the variable is missing or evaluates to the literal string "undefined",
// fall back to an empty string so Next.js doesn't crash on local development startup.
if (!archiveServerHostname || archiveServerHostname === 'undefined') {
  archiveServerHostname = ''
}

import path from 'node:path'
/* import { withSentryConfig } from '@sentry/nextjs' */
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
//import { getAllRedirects } from './sanity/interface/redirects'
import securityHeaders from './securityHeaders'
import { withSentryConfig } from '@sentry/nextjs'

const withNextIntl = createNextIntlPlugin()

const sentryConfig = {
  org: 'equinor',
  project: 'equinor-com',
  silent: true,
  //disableLogger: true,
  hideSourceMaps: true,
}

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

const nextConfig: NextConfig = withNextIntl({
  output: 'standalone',
  cacheComponents: true,
  transpilePackages: [
    'require-in-the-middle',
    'import-in-the-middle',
    'next-seo',
  ],
  logging: {
    fetches: {
      fullUrl: true, // shows logs only when using fetch
    },
    browserToTerminal: true,
  },

  /*turbopack: {
     root: join(__dirname),
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json'],
    resolveAlias: {
      //"@repo/typescript-config":"../packages/typescript-config",
      "@energyvision/shared":"../packages/energyvision/*"
    }
  },*/
  //cacheComponents: true,
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
    if (!archiveServerHostname) {
      return []
    }

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
  // async redirects() {
  //   return await getAllRedirects()
  // },
  env: {
    SC_DISABLE_SPEEDY: 'false',
  },

  outputFileTracingRoot: path.join(__dirname, '../'),
  experimental: {
    optimizePackageImports: [
      '@equinor/eds-core-react',
      '@equinor/eds-icons',
      'video.js',
    ],
    //externalDir: true,
  },
})

// Only wrap with Sentry if we are building for production
export default process.env.NODE_ENV === 'production'
  ? withSentryConfig(nextConfig, sentryConfig)
  : nextConfig
