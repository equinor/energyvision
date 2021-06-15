import React from 'react'
import S from '@sanity/desk-tool/structure-builder'
import { EdsList, EdsIcon } from './icons'
import NewsPreview from './src/previews/news/NewsPreview'
import PagePreview from './src/previews/page/PagePreview'
import parentChild from './src/structure/parentChild'
import * as I18nS from 'sanity-plugin-intl-input/lib/structure'
import { i18n } from './schemas/documentTranslation'
import { warning_outlined } from '@equinor/eds-icons'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default () => {
  const listItems = [
    S.listItem()
      .title('News')
      .icon(EdsList)
      .schemaType('news')
      .child(
        S.documentList()
          .id('news')
          .title('News articles')
          .filter('_type == "news" && (!defined(_lang) || _lang == $baseLang)')
          .params({ baseLang: i18n.base })
          .canHandleIntent((_name, params, _context) => {
            // Assume we can handle all intents (actions) regarding post documents
            return params.type === 'news'
          }),
      ),
    S.listItem()
      .title('Topic content')
      .icon(EdsList)
      .schemaType('page')
      .child(
        S.documentList('page')
          .id('pages')
          .title('Topic content')
          .filter('_type == "page" && (!defined(_lang) || _lang == $baseLang)')
          .params({ baseLang: i18n.base })
          .canHandleIntent((_name, params, _context) => {
            // Assume we can handle all intents (actions) regarding post documents
            return params.type === 'page'
          }),
      ),
    S.divider(),
    parentChild('route'),
    S.divider(),
    S.listItem()
      .title('News nb_no (Temporary)')
      .icon(() => EdsIcon(warning_outlined))
      .schemaType('news')
      .child(
        S.documentList()
          .id('news')
          .title('News articles')
          .filter('_type == "news" &&  _lang == "nb_no"')
          .canHandleIntent((_name, params, _context) => {
            // Assume we can handle all intents (actions) regarding post documents
            return params.type === 'news'
          }),
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
  } else if (schemaType === 'page') {
    return S.document().views([
      ...I18nS.getDocumentNodeViewsForSchemaType(schemaType),
      S.view.component(PagePreview).title('Page preview'),
    ])
  }

  return S.document().views([S.view.form()])
}
