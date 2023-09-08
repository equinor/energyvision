import { NewsDocuments } from '../../../../icons'
import { Flags } from '../../datasetHelpers'
import { EmptyItem } from './EmptyItem'
import { defaultLanguage } from '../../../../languages'

export const News = (S) =>
  Flags.HAS_NEWS
    ? S.listItem()
        .title('News')
        .icon(NewsDocuments)
        .schemaType('news')
        .child(
          S.documentTypeList('news')
            .id('news')
            .title('News articles')
            .filter(' _type == "news" && (!defined(lang) || lang == $baseLang)')
            .params({ baseLang: defaultLanguage.iso })
            .canHandleIntent((_name, params) => {
              // Assume we can handle all intents (actions) regarding post documents
              return params.type === 'news'
            }),
        )
    : EmptyItem
