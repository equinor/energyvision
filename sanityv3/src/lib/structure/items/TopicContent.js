import { TopicDocuments } from '../../../../icons'
import { i18n } from '../../../../schemas/documentTranslation'

export const TopicContent = (S) =>
  S.listItem()
    .title('Topic content')
    .icon(TopicDocuments)
    .schemaType('page')
    .child(
      S.documentTypeList('page')
        .id('pages')
        .title('Topic content')
        .apiVersion('v2023-12-05')
        .filter('_type == "page" && (!defined(_lang) || _lang == $baseLang)')
        .params({ baseLang: i18n.base })
        .canHandleIntent((_name, params) => {
          // Assume we can handle all intents (actions) regarding post documents
          return params.type === 'page'
        }),
    )
