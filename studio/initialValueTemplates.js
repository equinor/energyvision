import T from '@sanity/base/initial-value-template-builder'

export default [
  ...T.defaults(),
  T.template({
    id: 'menu-norwegian',
    title: 'Norwegian menu',
    schemaType: 'siteMenu',
    /*  value: {
      _lang: 'nb_NO',
    }, */
    parameters: [{ name: 'isoCode', type: 'string' }],
    value: (params) => ({
      _lang: params.isoCode,
    }),
  }),
]
