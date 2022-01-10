import T from '@sanity/base/initial-value-template-builder'
import languages from './languages'

const ParentRoutesTemplates = languages.map(({ name, title }) =>
  T.template({
    id: `parent-route-${name}`,
    title: `Parent route - ${title}`,
    schemaType: `route_${name}`,
    parameters: [{ name: 'parentId', type: 'string' }],
    value: (params) => ({ parent: { _type: 'reference', _ref: params.parentId } }),
  }),
)

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
  T.template({
    id: 'submenu-with-locale',
    title: 'Sub menu',
    schemaType: 'siteMenu',
    parameters: [{ name: 'isoCode', type: 'string' }],
    value: (params) => ({
      _lang: params.isoCode,
    }),
  }),
  T.template({
    id: 'simple-menu-with-locale',
    title: 'Site menu(simple)',
    schemaType: 'simpleMenu',
    parameters: [{ name: 'isoCode', type: 'string' }],
    value: (params) => ({
      _lang: params.isoCode,
    }),
  }),
  T.template({
    id: 'footer-with-locale',
    title: 'Footer',
    schemaType: 'footer',
    parameters: [{ name: 'isoCode', type: 'string' }],
    value: (params) => ({
      _lang: params.isoCode,
    }),
  }),
  ...ParentRoutesTemplates,
]
