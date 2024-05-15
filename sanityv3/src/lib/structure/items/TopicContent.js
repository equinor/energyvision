import { TopicDocuments } from '../../../../icons'
import { defaultLanguage } from '../../../../languages'
import { apiVersion } from '../../../../sanity.client'

export const TopicContent = (S) =>
  S.listItem()
    .title('Topic content')
    .icon(TopicDocuments)
    .schemaType('page')
    .child(
      S.documentTypeList('page')
        .id('pages')
        .title('Topic content')
        .apiVersion(apiVersion)
        .filter('_type == "page" && (!defined(lang) || lang == $baseLang)')
        .params({ baseLang: defaultLanguage.name })
        .canHandleIntent((_name, params) => {
          // Assume we can handle all intents (actions) regarding post documents
          return params.type === 'page'
        }),
    )
