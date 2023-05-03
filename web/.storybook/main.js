const path = require('path')
const { mergeConfig } = require('vite')

module.exports = {
  stories: [
    '../components/stories/docs/*.stories.mdx',
    '../components/stories/typography/**/*.stories.@(ts|tsx|mdx)',
    '../components/src/**/*.stories.@(ts|tsx|mdx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', 'storybook-css-modules-preset'],
  previewMainTemplate: path.resolve(__dirname, 'template.ejs'),
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@components': path.resolve(__dirname, '../components/src'),
          '@stories': path.resolve(__dirname, '../components/stories'),
          '@utils': path.resolve(__dirname, '../components/utils'),
        },
      },
      define: {
        'process.env': {
          STORYBOOK_BUILT_AT: Date.now(),
        },
      },
    })
  },
  core: {
    builder: '@storybook/builder-vite', // 👈 The builder enabled here.
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: true,
  },
}
