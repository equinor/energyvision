import { TopicDocuments } from '../../../../icons'
import { defaultLanguage } from '../../../../languages'

export const TopicContent = (S) =>
  S.listItem()
    .title('Topic content')
    .icon(TopicDocuments)
    .schemaType('page')
    .child(
      S.documentTypeList('page')
        .id('pages')
        .title('Topic content')
        .filter('_type == "page" && (!defined(lang) || lang == $baseLang)')
        .params({ baseLang: defaultLanguage.iso })
        .canHandleIntent((_name, params) => {
          // Assume we can handle all intents (actions) regarding post documents
          return params.type === 'page'
        }),
    )
