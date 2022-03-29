import S from '@sanity/desk-tool/structure-builder'
import { TopicDocuments } from '../../../../icons'
import { i18n } from '../../../../schemas/documentTranslation'
import { HAS_EVENT } from '../../datasetHelpers'
import { EmptyItem } from './EmptyItem'

export const Event = HAS_EVENT
  ? S.listItem()
      .title('Event')
      .icon(TopicDocuments)
      .schemaType('event')
      .child(
        S.documentTypeList('event')
          .id('events')
          .title('Events')
          .filter('_type == "event" && (!defined(_lang) || _lang == $baseLang)')
          .params({ baseLang: i18n.base })
          .canHandleIntent((_name, params) => {
            // Assume we can handle all intents (actions) regarding post documents
            return params.type === 'event'
          }),
      )
  : EmptyItem
