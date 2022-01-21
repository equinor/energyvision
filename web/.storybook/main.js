const { pathToFileURL } = require('url')
const webpack = require('webpack')

const path = require('path')

module.exports = {
  stories: [
    '../components/stories/docs/*.stories.mdx',
    '../components/stories/components/**/*.stories.@(ts|tsx|mdx)',
    '../components/stories/typography/**/*.stories.@(ts|tsx|mdx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', 'storybook-css-modules-preset'],
  previewMainTemplate: path.resolve(__dirname, 'template.ejs'),
  webpackFinal: async (config) => {
    // Respect the baseUrl from tsconfig
    config.resolve.modules.push(path.resolve(__dirname, '../components'))
    config.resolve.alias['@components'] = path.resolve(__dirname, '../components/src')
    config.resolve.alias['@utils'] = path.resolve(__dirname, '../components/utils')
    config.plugins.push(
      new webpack.EnvironmentPlugin({
        STORYBOOK_BUILT_AT: Date.now(),
        VNYS_717_IMPROVED_TYPOGRAPHY: process.env.NEXT_PUBLIC_VNYS_717_IMPROVED_TYPOGRAPHY === 'true' ? 'v2' : 'v1',
      }),
    )
    return config
  },
}
