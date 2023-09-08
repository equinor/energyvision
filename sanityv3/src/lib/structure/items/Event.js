import { TopicDocuments } from '../../../../icons'
import { defaultLanguage } from '../../../../languages'
import { i18n } from '../../../../schemas/documentTranslation'
import { Flags } from '../../datasetHelpers'
import { EmptyItem } from './EmptyItem'

export const Event = (S) =>
  Flags.HAS_EVENT
    ? S.listItem()
        .title('Event')
        .icon(TopicDocuments)
        .schemaType('event')
        .child(
          S.documentTypeList('event')
            .id('events')
            .title('Events')
            .filter('_type == "event" && (!defined(lang) || lang == $baseLang)')
            .params({ baseLang: defaultLanguage.iso })
            .canHandleIntent((_name, params) => {
              // Assume we can handle all intents (actions) regarding post documents
              return params.type === 'event'
            }),
        )
    : EmptyItem
