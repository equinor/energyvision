import S from '@sanity/desk-tool/structure-builder'
import { NewsDocuments } from '../../../../icons'
import { i18n } from '../../../../schemas/documentTranslation'
import { HAS_NEWS } from '../../datasetHelpers'
import { EmptyItem } from './EmptyItem'

export const News = HAS_NEWS
  ? S.listItem()
      .title('News')
      .icon(NewsDocuments)
      .schemaType('news')
      .child(
        S.documentTypeList('news')
          .id('news')
          .title('News articles')
          .filter(' _type == "news" && (!defined(_lang) || _lang == $baseLang)')
          .params({ baseLang: i18n.base })
          .canHandleIntent((_name, params) => {
            // Assume we can handle all intents (actions) regarding post documents
            return params.type === 'news'
          }),
      )
  : EmptyItem
