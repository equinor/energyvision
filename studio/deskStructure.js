import React from 'react'
import S from '@sanity/desk-tool/structure-builder'
import { TopicDocuments, NewsDocuments, MenuIcon, LibraryIcon, FileIcon, TagMoreIcon } from './icons'
import NewsPreview from './src/previews/news/NewsPreview'
import PagePreview from './src/previews/page/PagePreview'
import FilePreview from './src/previews/file/filePreview'
import parentChild from './src/structure/parentChild'
import assetTagFilters from './src/structure/assetTagFilters'
import extensionFilters from './src/structure/assetExtensionFilters'
import * as I18nS from 'sanity-plugin-intl-input/lib/structure'
import { i18n } from './schemas/documentTranslation'
import DocumentsPane from 'sanity-plugin-documents-pane'
import languages from './languages'
// eslint-disable-next-line import/no-unresolved
import client from 'part:@sanity/base/client'
// import Iframe from 'sanity-plugin-iframe-pane'
import flags from './icons/countries'

// import resolveProductionUrl from './resolveProductionUrl'
const dataSet = client.clientConfig.dataset
const isGlobal = dataSet === 'global'

const menuId = (lang) => {
  if (isGlobal) {
    return lang.id + '-menu'
  } else {
    return lang.id + '-simple-menu'
  }
}

const menus = languages.map((lang) =>
  S.listItem({
    title: `${lang.title} menu`,
    id: `menu-${lang.id}`,
    icon: flags[lang.id],
    child: () =>
      S.list({
        id: 'menu-list',
        items: [
          S.listItem({
            title: 'Main menu',
            id: `main-menu`,
            icon: MenuIcon,
            child: () =>
              S.documentWithInitialValueTemplate(isGlobal ? 'menu-with-locale' : 'simple-menu-with-locale', {
                isoCode: `${lang.name}`,
              })
                .id(menuId(lang))
                .title(`${lang.title} site menu`),
          }),
          isGlobal
            ? S.listItem({
                title: 'Sub menus',
                id: 'subMenuTest',
                child: () =>
                  S.documentTypeList('subMenu')
                    .title('Sub menu')
                    .filter('_type == "subMenu" && _lang == $baseLang')
                    .params({ baseLang: lang.name })
                    //.params({ isoCode: `${lang.name}` })
                    .initialValueTemplates([
                      S.initialValueTemplateItem('submenu-with-locale', { isoCode: `${lang.name}` }),
                    ]),
              })
            : null,
        ].filter(Boolean),
      }),
  }),
)

const footers = languages.map((lang) =>
  S.listItem({
    title: `${lang.title} footer`,
    id: `footer-${lang.id}`,
    icon: flags[lang.id],
    child: () =>
      S.documentWithInitialValueTemplate('footer-with-locale', { isoCode: `${lang.name}` })
        .id(`${lang.id}-footer`)
        .title(`${lang.title} footer`)
        .views([S.view.form()]),
  }),
)
const homepages = languages.map((lang) =>
  S.listItem({
    title: `${lang.title} Homepage`,
    id: `homepage-${lang.id}`,
    icon: flags[lang.id],
    child: () =>
      S.documentTypeList(`route_${lang.name}_homepage`)
        .id(`${lang.id}-homepage`)
        .title(`Homepage route - ${lang.title}`),
  }),
)

const AssetLibrary = [
  S.listItem()
    .title('Show all asset files')
    .icon(FileIcon)
    .child(S.documentTypeList('assetFile').id('allFiles').title('All files')),
  S.divider(),
  extensionFilters(),
  assetTagFilters(),
  S.divider(),
  S.listItem()
    .title('Manage file tags')
    .icon(TagMoreIcon)
    .child(S.documentTypeList('assetTag').id('manageAssetTags').title('Manage asset tags')),
]

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default () => {
  const listItems = [
    S.listItem()
      .title('News')
      .icon(NewsDocuments)
      .schemaType('news')
      .child(
        S.documentTypeList('news')
          .id('news')
          .title('News articles')
          .filter('_type == "news" && (!defined(_lang) || _lang == $baseLang)')
          .params({ baseLang: i18n.base })
          .canHandleIntent((_name, params) => {
            // Assume we can handle all intents (actions) regarding post documents
            return params.type === 'news'
          }),
      ),
    S.listItem()
      .title('Topic content')
      .icon(TopicDocuments)
      .schemaType('page')
      .child(
        S.documentTypeList('page')
          .id('pages')
          .title('Topic content')
          .filter('_type == "page" && (!defined(_lang) || _lang == $baseLang)')
          .params({ baseLang: i18n.base })
          .canHandleIntent((_name, params) => {
            // Assume we can handle all intents (actions) regarding post documents
            return params.type === 'page'
          }),
      ),
    S.listItem()
      .title('Landing page')
      .icon(TopicDocuments)
      .schemaType('landingPage')
      .child(
        S.documentTypeList('landingPage')
          .id('landingPages')
          .title('Landing page')
          .filter('_type == "landingPage" && (!defined(_lang) || _lang == $baseLang)')
          .params({ baseLang: i18n.base })
          .canHandleIntent((_name, params) => {
            // Assume we can handle all intents (actions) regarding post documents
            return params.type === 'landingPage'
          }),
      ),
    S.listItem()
      .title('Event')
      .icon(TopicDocuments)
      .schemaType('event')
      .child(
        S.documentTypeList('event')
          .id('events')
          .title('Events')
          .filter('_type == "event" && (!defined(_lang) || _lang == $baseLang)')
          .params({ baseLang: i18n.base })
          .canHandleIntent((_name, params) => {
            // Assume we can handle all intents (actions) regarding post documents
            return params.type === 'event'
          }),
      ),
    S.divider(),
    // S.listItem()
    //   .title('Home Page')
    //   .icon(TopicDocuments)
    //   .child(() => S.list('homepage').id('homepage').title('Homepages').items(homepages)),
    // S.divider(),
    parentChild('route'),
    S.divider(),
    S.listItem().title('Menu').icon(MenuIcon).child(S.list('menu').id('menu').title('Menus').items(menus)),
    S.divider(),
    S.listItem().title('Footer').child(S.list('footer').id('footer').title('Footers').items(footers)),
    S.divider(),
    S.listItem()
      .title('Asset library')
      .icon(LibraryIcon)
      .child(S.list('assets').id('assets').title('Asset library').items(AssetLibrary)),
    S.divider(),
    S.listItem().title('Tags').schemaType('tag').child(S.documentTypeList('tag').title('Tags')),
    S.listItem()
      .title('Country tags')
      .schemaType('countryTag')
      .child(S.documentTypeList('countryTag').title('Country tag')),
  ]

  return S.list().title('Content').items(listItems)
}

export const getDefaultDocumentNode = (props) => {
  /**
   * Here you can define fallback views for document types without
   * a structure definition for the document node. If you want different
   * fallbacks for different types, or document values (e.g. if there is a slug present)
   * you can set up that logic in here too.
   * https://www.sanity.io/docs/structure-builder-reference#getdefaultdocumentnode-97e44ce262c9
   */
  const { schemaType } = props
  if (schemaType === 'news') {
    return S.document().views([
      ...I18nS.getDocumentNodeViewsForSchemaType(schemaType),
      S.view.component(NewsPreview).title('News preview'),
    ])
  } else if (schemaType === 'landingPage') {
    return S.document().views([
      ...I18nS.getDocumentNodeViewsForSchemaType(schemaType),
      S.view.component(PagePreview).title('Preview'),
    ])
  } else if (schemaType === 'event') {
    return S.document().views([
      ...I18nS.getDocumentNodeViewsForSchemaType(schemaType),
      S.view.component(PagePreview).title('Preview'),
      S.view
        .component(DocumentsPane)
        .options({
          query: `*[!(_id in path("drafts.**")) && references($id) && _type match "route_*"]`,
          params: { id: `_id` },
          useDraft: false,
        })
        .title('Connected routes'),
    ])
  } else if (schemaType === 'page') {
    return S.document().views([
      ...I18nS.getDocumentNodeViewsForSchemaType(schemaType),
      S.view.component(PagePreview).title('Preview'),
      /* S.view
        .component(Iframe)
        .options({
          url: (doc) => resolveProductionUrl(doc),
        })
        .title('Preview'), */
      S.view
        .component(DocumentsPane)
        .options({
          query: `*[!(_id in path("drafts.**")) && references($id) && _type match "route_*"]`,
          params: { id: `_id` },
          useDraft: false,
        })
        .title('Connected routes'),
    ])
  } else if (schemaType === 'assetFile') {
    return S.document().views([
      S.view.form(),
      S.view
        .component(DocumentsPane)
        .options({
          query: `*[!(_id in path("drafts.**")) && references($id) && _type in ["news", "event", "page"]]`,
          params: { id: `_id` },
          useDraft: false,
        })
        .title('References'),
      S.view.component(FilePreview).title('Preview'),
    ])
  } else if (schemaType === 'assetTag') {
    return S.document().views([
      S.view.form(),
      S.view
        .component(DocumentsPane)
        .options({
          query: `*[!(_id in path("drafts.**")) && references($id) && _type match "assetFile"]`,
          params: { id: `_id` },
          useDraft: false,
        })
        .title('References'),
    ])
  }

  return S.document().views([S.view.form()])
}
