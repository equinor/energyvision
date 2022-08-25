import T from '@sanity/base/initial-value-template-builder'
import { languages } from './languages'
import textSnippets from './schemas/textSnippets'
import { Flags } from './src/lib/datasetHelpers'

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

const MenuTemplates = Flags.HAS_FANCY_MENU
  ? [
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
    ]
  : [
      T.template({
        id: 'simple-menu-with-locale',
        title: 'Site menu (simple)',
        schemaType: 'simpleMenu',
        parameters: [{ name: 'isoCode', type: 'string' }],
        value: (params) => ({
          _lang: params.isoCode,
        }),
      }),
    ]

export default [
  ...T.defaults(),
  ...MenuTemplates,
  T.template({
    id: 'footer-with-locale',
    title: 'Footer',
    schemaType: 'footer',
    parameters: [{ name: 'isoCode', type: 'string' }],
    value: (params) => ({
      _lang: params.isoCode,
    }),
  }),
  T.template({
    id: 'redirect-with-locale',
    title: 'Redirect',
    schemaType: 'redirect',
    parameters: [{ name: 'isoCode', type: 'string' }],
    value: (params) => ({
      _lang: params.isoCode,
    }),
  }),
  T.template({
    id: 'localnews-with-tag',
    title: 'Local news',
    schemaType: 'localNews',
    parameters: [{ name: 'localNewsTag', type: 'reference' }],
    value: (params) => ({
      localNewsTag: params.localNewsTag,
    }),
  }),
  ...ParentRoutesTemplates,
  ...TextSnippetsTemplates,
]
