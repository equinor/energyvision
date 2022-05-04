/* eslint-disable @typescript-eslint/no-var-requires */
const archiveServerHostname = 'https://envis-legacy.azureedge.net/equinor-archive-content'

import { languages, defaultLanguage, domain } from './languages.js'
import securityHeaders from './securityHeaders.mjs'
import withBundleAnalyzer from '@next/bundle-analyzer'
import nextTranspileModules from 'next-transpile-modules'

const withTM = nextTranspileModules(['friendly-challenge'])

const withBundle = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const locales = languages.map((lang) => lang.locale)

export default withTM(
  withBundle({
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
      domains: ['cdn.sanity.io'],
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
    /*   webpack(config, { defaultLoaders }) {
    config.module.rules.push({
      test: /\.(css)$/,
      use: [
        defaultLoaders.babel,
        {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          loader: require('styled-jsx/webpack').loader,
          options: {
            type: 'global',
          },
        },
      ],
    })
    return config
  }, */
  }),
)
