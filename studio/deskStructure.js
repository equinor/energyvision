import React from 'react'
import S from '@sanity/desk-tool/structure-builder'
import { TopicDocuments, NewsDocuments, MenuIcon, LibraryIcon, FileIcon, TagMoreIcon, EdsIcon } from './icons'
import NewsPreview from './src/previews/news/NewsPreview'
import PagePreview from './src/previews/page/PagePreview'
import FilePreview from './src/previews/file/filePreview'
import parentChild from './src/structure/parentChild'
import errorPages from './src/structure/errorPages'
import assetTagFilters from './src/structure/assetTagFilters'
import extensionFilters from './src/structure/assetExtensionFilters'
import localNewsStructure from './src/structure/localNewsStructure'
import * as I18nS from '@sanity/document-internationalization/lib/structure'
import { i18n } from './schemas/documentTranslation'
import DocumentsPane from 'sanity-plugin-documents-pane'
import { languages } from './languages'
import { settings, directions, text_field, tag, tag_more, view_stream } from '@equinor/eds-icons'
// eslint-disable-next-line import/no-unresolved
import client from 'part:@sanity/base/client'
// import Iframe from 'sanity-plugin-iframe-pane'
import flags from './icons/countries'
import textSnippets from './schemas/textSnippets'

// import resolveProductionUrl from './resolveProductionUrl'
const dataSet = client.clientConfig.dataset
const EQUINOR_COM_NAME = 'global'
const EQUINOR_COM_DEV = 'global-development'
const isGlobal = dataSet === EQUINOR_COM_NAME || dataSet === EQUINOR_COM_DEV

const menuId = (lang) => {
  if (isGlobal) {
    return lang.id + '-menu'
  } else {
    return lang.id + '-simple-menu'
  }
}

const redirects = languages.map((lang) =>
  S.listItem()
    .title(`${lang.title} Redirects`)
    .id(`redirect-${lang.id}`)
    .icon(flags[lang.id])
    .child(() =>
      S.documentList()
        .title(`${lang.title} Redirects`)
        .schemaType('redirect')
        .filter(`_type == 'redirect' && _lang == '${lang.name}'`)
        .canHandleIntent(S.documentTypeList('redirect').getCanHandleIntent())
        .child((id) =>
          S.documentWithInitialValueTemplate('redirect-with-locale', {
            isoCode: lang.name,
          }).documentId(id),
        ),
    ),
)

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
      S.documentWithInitialValueTemplate(`route_${lang.name}_homepage`)
        .id(`${lang.id}-homepage`)
        .title(`Homepage route - ${lang.title}`),
  }),
)

const textSnippetItems = Object.keys(textSnippets).map((key) =>
  S.listItem({
    title: textSnippets[key].title,
    displayOptions: {
      showIcon: false,
    },
    id: `snippet-${key}`,
    child: () =>
      S.documentWithInitialValueTemplate(`text-snippet-${key}`, {
        defaultValue: textSnippets[key].defaultValue,
      })
        .documentId(`text_snippet_${key}`)
        .title(`Text Snippet: ${key} `)
        .schemaType('textSnippet'),
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
    S.listItem().title('Local news').icon(NewsDocuments).schemaType('localNews').child(localNewsStructure()),
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

    S.listItem().title('Misc').icon(TopicDocuments).child(S.list('misc').id('misc').title('Misc').items(errorPages)),

    S.divider(),
    S.listItem()
      .title('Home Page')
      .icon(TopicDocuments)
      .child(() => S.list('homepage').id('homepage').title('Homepages').items(homepages)),
    parentChild('route'),
    S.divider(),
    S.listItem().title('Menu').icon(MenuIcon).child(S.list('menu').id('menu').title('Menus').items(menus)),
    S.listItem()
      .title('Footer')
      .icon(() => EdsIcon(view_stream))
      .child(S.list('footer').id('footer').title('Footers').items(footers)),
    S.divider(),
    S.listItem()
      .title('Asset library')
      .icon(LibraryIcon)
      .child(S.list('assets').id('assets').title('Asset library').items(AssetLibrary)),
    S.divider(),
    S.listItem()
      .title('Settings')
      .icon(() => EdsIcon(settings))
      .child(
        S.list()
          .id('settings')
          .title('Settings')
          .items([
            S.listItem()
              .icon(() => EdsIcon(tag))
              .title('Tags')
              .schemaType('tag')
              .child(S.documentTypeList('tag').title('Tags').showIcons(false)),
            S.listItem()
              .icon(() => EdsIcon(tag_more))
              .title('Country tags')
              .schemaType('countryTag')
              .child(S.documentTypeList('countryTag').title('Country tag')),
            S.listItem()
              .icon(() => EdsIcon(text_field))
              .title('Text Snippets')
              .child(() => S.list('textSnippet').id('textSnippet').title('Text Snippets').items(textSnippetItems)),
            S.listItem()
              .icon(() => EdsIcon(directions))
              .title('Redirects')
              .child(() => S.list('redirects').id('redirects').title('Redirects').items(redirects)),
            S.listItem()
              .icon(() => EdsIcon(tag))
              .title('Local news tags')
              .schemaType('localNewsTag')
              .child(S.documentTypeList('localNewsTag').title('Local news tags').showIcons(false)),
          ]),
      ),
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
  } else if (schemaType === 'pageNotFound') {
    return S.document().views([...I18nS.getDocumentNodeViewsForSchemaType(schemaType)])
  } else if (schemaType === 'internalServerError') {
    return S.document().views([...I18nS.getDocumentNodeViewsForSchemaType(schemaType)])
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
