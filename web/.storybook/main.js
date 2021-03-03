const { pathToFileURL } = require('url')

const path = require('path')

module.exports = {
  stories: [
    '../components/stories/docs/*.stories.mdx',
    '../components/stories/components/**/*.stories.@(ts|tsx|mdx)',
    '../components/stories/pages/**/*.@(ts|tsx|mdx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', 'storybook-css-modules-preset'],
  webpackFinal: async (config) => {
    config.resolve.alias['@components'] = path.resolve(__dirname, '../components/src')
    config.resolve.alias['@utils'] = path.resolve(__dirname, '../components/utils')
    return config
  },
}
