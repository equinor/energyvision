import T from '@sanity/base/initial-value-template-builder'

export default [
  ...T.defaults(),
  T.template({
    id: 'menu-with-locale',
    title: 'Site menu',
    schemaType: 'siteMenu',
    parameters: [{ name: 'isoCode', type: 'string' }],
    value: (params) => ({
      _lang: params.isoCode,
    }),
  }),
]
