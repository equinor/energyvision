const archiveServerHostname = 'http://localhost:8080'

module.exports = {
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
    locales: ['en'],
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
}
