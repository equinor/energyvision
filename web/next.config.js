const archiveServerHostname = 'https://envis-legacy.azureedge.net/equinor-archive-content'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  publicRuntimeConfig: {
    domain: 'https://energyvision.app.radix.equinor.com',
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
  future: {
    webpack5: true,
  },
  i18n: {
    locales: ['no', 'en'],
    defaultLocale: 'en',
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
    ]
  },
})
