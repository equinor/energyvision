const archiveServerHostname = 'https://envis-legacy.azureedge.net/equinor-archive-content'
const staticPageServerHostname = 'https://envis-legacy.azureedge.net/equinor-static-non-news-content'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  publicRuntimeConfig: {
    domain: 'https://energyvision.app.radix.equinor.com',
    archiveStorageURL: archiveServerHostname,
    staticPageStorageURL: staticPageServerHostname,
  },
  images: {
    domains: ['cdn.sanity.io'],
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
  webpack(config, { defaultLoaders }) {
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
  },
})
