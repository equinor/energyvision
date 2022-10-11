/* eslint-disable @typescript-eslint/no-var-requires */
const archiveServerHostname = 'https://envis-legacy.azureedge.net/equinor-archive-content'

import { languages, defaultLanguage, domain, dataset } from './languages.js'
import securityHeaders, { UnsafeContentSecurityPolicy } from './securityHeaders.mjs'
import withBundleAnalyzer from '@next/bundle-analyzer'
import nextTranspileModules from 'next-transpile-modules'

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

export default withTM(
  withBundle({
    experimental: {
      // https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#self-hosting-isr
      isrMemoryCacheSize: 0,
    },
    pageExtensions: pageExtensions,
    reactStrictMode: true,
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
        // Add 50 years celebration page to equinor
        dataset === 'global' && {
          source: '/50/:slug*',
          destination: 'https://equinor-50-historier.vercel.app/50/:slug*',
        },
      ].filter((e) => e)
    },
    async headers() {
      return [
        {
          source: '/:path*',
          headers: securityHeaders,
        },
        // Disable security headers for 50 years celebration page
        dataset === 'global' && {
          source: '/50/:path*',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: UnsafeContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
            },
            {
              key: 'Content-Security-Policy-Report-Only',
              value: UnsafeContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
            },
          ],
        },
      ].filter((e) => e)
    },
  }),
)
