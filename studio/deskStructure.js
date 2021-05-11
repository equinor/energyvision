/* eslint-disable no-unused-vars */
import React from 'react'
import S from '@sanity/desk-tool/structure-builder'
import { EdsList } from './icons'
import NewsPreview from './src/previews/news/NewsPreview'
import { getTopicConfig } from './helpers/topics'

// I'm having a hard time to get the desk structure file work with typescript.
// So not possible to type the topicSuffix :/
const topicPageStructure = (topicSuffix, icon) => {
  const topic = getTopicConfig(topicSuffix)
  //return S.documentTypeListItem(`${topic.id}_page`).icon(icon).title(topic.title)
  return S.listItem()
    .title(`${topic.title} (Work in progress)`)
    .icon(icon)
    .child(
      S.list()
        .title(`/${topic.slug.en}`)
        .items([
          /* We can do something clever here if we have a pushlishedDate that actually works :) */
          /*  S.listItem()
            .title('Published pages')
            .schemaType(`${topic.id}_page`)
            .child(
              S.documentList(`${topic.id}_page`)
                .title('Published posts')
                .filter('_type == "careers_page" && publishedAt < now() && !(_id in path("drafts.**"))')
                .child((documentId) =>
                  S.document().documentId(documentId).schemaType(`${topic.id}_page`).views([S.view.form()]),
                ),
            ), */
          S.documentTypeListItem(`page_${topic.id}`).title('All pages'),
        ]),
    )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default () => {
  const listItems = [
    S.documentTypeListItem('news').icon(EdsList).title('News'),
    topicPageStructure('careers', EdsList),
    topicPageStructure('whatWeDo', EdsList),
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
    return S.document().views([S.view.form(), S.view.component(NewsPreview).title('News preview')])
  }

  return S.document().views([S.view.form()])
}
