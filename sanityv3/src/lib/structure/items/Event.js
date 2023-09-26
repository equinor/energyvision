import { TopicDocuments } from '../../../../icons'
import { languages } from '../../../../languages'
import { Flags } from '../../datasetHelpers'
import { EmptyItem } from './EmptyItem'

const documentList = (S, lang) =>
  S.documentTypeList('event')
    .id('events')
    .title(`${lang.title} Events`)
    .filter('_type == "event" && (!defined(lang) || lang == $baseLang)')
    .params({ baseLang: lang.name })
    .canHandleIntent((_name, params) => {
      // Assume we can handle all intents (actions) regarding post documents
      return params.type === 'event'
    })

export const Event = (S) =>
  Flags.HAS_EVENT
    ? S.listItem()
        .title('Event')
        .icon(TopicDocuments)
        .schemaType('event')
        .child(
          S.list()
            .title('Events')
            .items(
              languages.map((it) =>
                S.listItem(`${it.title} events`)
                  .title(`${it.title} events`)
                  .id(`${it.iso}_events`)
                  .icon(TopicDocuments)
                  .child(() => documentList(S, it)),
              ),
            ),
        )
    : EmptyItem
