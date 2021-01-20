const { pathToFileURL } = require('url')

const path = require('path')

module.exports = {
  stories: [
    '../stories/docs/*.stories.mdx',
    '../stories/components/**/*.stories.@(ts|tsx|mdx)',
    '../stories/pages/**/*.@(ts|tsx|mdx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config) => {
    config.resolve.alias['@components'] = path.resolve(__dirname, '../src')
    return config
  },
}
