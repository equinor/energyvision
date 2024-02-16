const archiveServerHostname = process.env.NEXT_PUBLIC_ARCHIVE_CONTENT_LINK
/* eslint-disable @typescript-eslint/no-var-requires */
import withBundleAnalyzer from '@next/bundle-analyzer'
import nextTranspileModules from 'next-transpile-modules'
import { dataset, defaultLanguage, domain, languages } from './languages.js'
import securityHeaders from './securityHeaders.js'
import { getAllRedirects } from './redirects.js'

const withTM = nextTranspileModules(['friendly-challenge'])

const withBundle = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const locales = languages.map((lang) => lang.locale)

const getPageExtensions = (dataset) => {
  const extensions = ['tsx', 'ts', 'js', 'jsx']
  const globalOnlyExtensions = ['global.tsx', 'global.ts']
  const devOnlyExtensions = ['dev.tsx', 'dev.ts']

  if (dataset === 'global') {
    return [...extensions, ...globalOnlyExtensions]
  }

  if (dataset === 'global-development' || dataset === 'global-test') {
    return [...extensions, ...globalOnlyExtensions, ...devOnlyExtensions]
  }

  return extensions
}

const pageExtensions = getPageExtensions(dataset)

export default withBundle(
  withTM({
    output: 'standalone',
    pageExtensions: pageExtensions,
    reactStrictMode: true,
    experimental: {
      largePageDataBytes: 300 * 1000,
      scrollRestoration: true,
      optimizePackageImports: [
        '@components',
        '@chakra-ui',
        '@chakra-ui/skip-nav',
        '@emotion/react',
        '@emotion/styled',
        '@equinor/eds-core-react',
        '@equinor/eds-icons',
        'hls.js',
      ],
    },
    eslint: {
      // Warning: Dangerously allow production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    compiler: {
      // Enables the styled-components SWC transform
      styledComponents: true,
    },
    publicRuntimeConfig: {
      domain: domain,
      archiveStorageURL: archiveServerHostname,
    },
    images: {
      domains: ['cdn.sanity.io', 'cdn.equinor.com'],
      dangerouslyAllowSVG: true,
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    i18n: {
      locales: locales,
      defaultLocale: defaultLanguage.locale,
      localeDetection: false,
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
      ]
    },
    async headers() {
      return [
        {
          source: '/:path*',
          headers: securityHeaders,
        },
      ]
    },
    async redirects() {
      return await getAllRedirects()
    },
  }),
)
