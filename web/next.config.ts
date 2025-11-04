const archiveServerHostname = process.env.NEXT_PUBLIC_ARCHIVE_CONTENT_LINK
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import { withSentryConfig } from '@sentry/nextjs'
import securityHeaders from './securityHeaders'
import { dataset } from './languages.js'

const withNextIntl = createNextIntlPlugin()

const isProd = process.env.NODE_ENV === 'production'
const sentryConfig = {
  org: 'equinor',
  project: 'equinor-com',
  silent: true,
  disableLogger: true,
  widenClientFileUpload: true,
  disableClientWebpackPlugin: !isProd,
  disableServerWebpackPlugin: !isProd,
}

//TODO: Find the Redirect type from config that is not in /dist.
type ConfigRedirect = {
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
const getRedirects = () => {
  const redirects: ConfigRedirect[] = [
    // Redirect IE users to not-supported page
    {
      source: '/',
      has: [
        {
          type: 'header',
          key: 'user-agent',
          value: '.*(MSIE|Trident).*',
        },
      ],
      permanent: true,
      destination: '/not-supported.html',
    },
  ]
  if (dataset && ['global', 'global-development', 'global-test'].includes(dataset)) {
    const fiftySiteRedirects: ConfigRedirect[] = [
      {
        source: '/50/en/:slug*',
        destination: '/magazine',
        permanent: true,
      },
      {
        source: '/50/:slug*',
        destination: '/no/magasin',
        permanent: true,
      },
    ]
    redirects.concat(fiftySiteRedirects)
  }
  return redirects.filter((e) => e)
}

const nextConfig: NextConfig = {
  output: 'standalone',
  turbopack: {
    resolveAlias: {
      '@/*': './*',
    },
  }, // Essential for next-intl alias resolution
  outputFileTracingRoot: __dirname,
  transpilePackages: ['friendly-challenge'],
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
    ].filter((e) => e)
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
    ].filter((e) => e)
  },
  async redirects() {
    return getRedirects()
  },
  env: {
    // Matches the behavior of `sanity dev` which sets styled-components to use the fastest way of inserting CSS rules in both dev and production. It's default behavior is to disable it in dev mode.
    SC_DISABLE_SPEEDY: 'false',
  },
  experimental: {
    optimizePackageImports: ['@equinor/eds-core-react', '@equinor/eds-icons', 'video.js'],
  },
}

export default withSentryConfig(withNextIntl(nextConfig), sentryConfig)
