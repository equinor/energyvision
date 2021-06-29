module.exports = {
  extends: ['../.eslintrc.js', 'plugin:@next/next/recommended'],
  rules: {
    '@next/next/no-html-link-for-pages': ['warn', 'web/pages'],
  },
}
