import { TopicDocuments } from '../../../../icons'
import { defaultLanguage } from '../../../../languages'
import { Flags } from '../../datasetHelpers'
import { EmptyItem } from './EmptyItem'

export const Magazine = (S) =>
  Flags.HAS_MAGAZINE
    ? S.listItem()
        .title('Magazine')
        .icon(TopicDocuments)
        .schemaType('magazine')
        .child(
          S.documentTypeList('magazine')
            .id('magazines')
            .title('Magazines')
            .filter('_type == "magazine" && (!defined(lang) || lang == $baseLang)')
            .params({ baseLang: defaultLanguage.iso })
            .canHandleIntent((_name, params) => {
              // Assume we can handle all intents (actions) regarding post documents
              return params.type === 'magazine'
            }),
        )
    : EmptyItem
