const archiveServerHostname = 'http://localhost:8080'

module.exports = {
  publicRuntimeConfig: {
    domain: 'https://energyvision.app.radix.equinor.com',
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
  async rewrites() {
    return [
      // Archive_Rule: This rule load the archived images from dam
      {
        source: '/content/dam/:slug*',
        destination: `${archiveServerHostname}/content/dam/:slug*`
      },
      // Archive_Rule: This rule loads the necessary client libraries for old html content
      {
        source: '/etc.clientlibs/:slug*',
        destination: `${archiveServerHostname}/etc.clientlibs/:slug*`
      }
    ]
  },
  webpack(config, {defaultLoaders}) {
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
    });
    return config;
  }
}
