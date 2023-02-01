module.exports = {
  extends: ['../.eslintrc.cjs', 'plugin:@next/next/recommended'],
  rules: {
    '@next/next/no-html-link-for-pages': ['warn', 'web/pages'],
  },
}
