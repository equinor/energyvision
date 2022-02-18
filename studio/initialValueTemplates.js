import T from '@sanity/base/initial-value-template-builder'
import languages from './languages'
import textSnippets from './schemas/textSnippets'

const ParentRoutesTemplates = languages.map(({ name, title }) =>
  T.template({
    id: `parent-route-${name}`,
    title: `Parent route - ${title}`,
    schemaType: `route_${name}`,
    parameters: [{ name: 'parentId', type: 'string' }],
    value: (params) => ({ parent: { _type: 'reference', _ref: params.parentId } }),
  }),
)

const TextSnippetsTemplates = Object.keys(textSnippets).map((key) =>
  T.template({
    id: `text-snippet-${key}`,
    title: `Text Snippet - ${textSnippets[key].title}`,
    schemaType: `textSnippet`,
    parameters: [{ name: 'defaultValue', type: 'string' }],
    value: (params) => {
      const fields = languages.map(({ name }) => ({ [name]: params.defaultValue }))
      return Object.assign({}, ...fields)
    },
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
      isStatic: false,
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
  ...TextSnippetsTemplates,
]
