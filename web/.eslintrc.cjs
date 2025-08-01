module.exports = {
  extends: ['plugin:@next/next/recommended', '../.eslintrc.cjs'],
  rules: {
    '@next/next/no-html-link-for-pages': ['warn', 'web/pages'],
  },
}
