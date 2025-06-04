import { FileIcon, NewsDocuments, TopicDocuments } from '../../../../icons'
import { apiVersion } from '../../../../sanity.client'
import { Flags } from '../../datasetHelpers'
import { singletonListItem } from './SingletonItem'

const miscPages = (S) =>
  [
    singletonListItem(S, 'pageNotFound', '404 - Page not found').icon(FileIcon),
    singletonListItem(S, 'internalServerError', '500 - Internal server error').icon(FileIcon),
    Flags.HAS_NEWSROOM && singletonListItem(S, 'newsroom', 'Newsroom').icon(NewsDocuments),
    Flags.HAS_MAGAZINE_INDEX && singletonListItem(S, 'magazineIndex', 'Magazine Index').icon(NewsDocuments),
  ].filter((e) => e)

export const Misc = (S) =>
  S.listItem()
    .title('Misc')
    .icon(TopicDocuments)
    .child(S.list('misc').id('misc').title('Misc').items(miscPages(S)))
