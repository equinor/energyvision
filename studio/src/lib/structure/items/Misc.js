import S from '@sanity/desk-tool/structure-builder'
import { FileIcon, TopicDocuments, NewsDocuments } from '../../../../icons'
import { HAS_NEWSROOM, HAS_MAGAZINE } from '../../datasetHelpers'

const miscPages = [
  S.listItem()
    .title('404 - Page not found')
    .icon(FileIcon)
    .child(S.document().id('pageNotFound').title('404').schemaType('pageNotFound')),
  S.listItem()
    .title('500 - Internal server error')
    .icon(FileIcon)
    .child(S.document().id('internalServerError').title('500').schemaType('internalServerError')),
  HAS_NEWSROOM &&
    S.listItem()
      .title('Newsroom')
      .icon(NewsDocuments)
      .child(S.document().id('newsroom').title('Newsroom').schemaType('newsroom')),
  HAS_MAGAZINE &&
    S.listItem()
      .title('Magazine')
      .icon(NewsDocuments)
      .child(S.document().id('magazine').title('Magazine').schemaType('newsroom')),
].filter((e) => e)

export const Misc = S.listItem()
  .title('Misc')
  .icon(TopicDocuments)
  .child(S.list('misc').id('misc').title('Misc').items(miscPages))
