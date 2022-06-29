import S from '@sanity/desk-tool/structure-builder'
import { TopicDocuments } from '../../../../icons'
import { i18n } from '../../../../schemas/documentTranslation'
import { HAS_MAGAZINE } from '../../datasetHelpers'
import { EmptyItem } from './EmptyItem'

export const Magazine = HAS_MAGAZINE
  ? S.listItem()
      .title('Magazine')
      .icon(TopicDocuments)
      .schemaType('magazine')
      .child(
        S.documentTypeList('magazine')
          .id('magazines')
          .title('Magazines')
          .filter('_type == "magazine" && (!defined(_lang) || _lang == $baseLang)')
          .params({ baseLang: i18n.base })
          .canHandleIntent((_name, params) => {
            // Assume we can handle all intents (actions) regarding post documents
            return params.type === 'magazine'
          }),
      )
  : EmptyItem
