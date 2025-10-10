import { TopicDocuments } from '../../../../icons'
import { defaultLanguage } from '../../../../languages'
import { apiVersion } from '../../../../sanity.client'
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
            .apiVersion(apiVersion)
            .filter('_type == "magazine" && (!defined(lang) || lang == $baseLang)')
            .params({ baseLang: defaultLanguage.name })
            .canHandleIntent((_name, params) => {
              // Assume we can handle all intents (actions) regarding post documents
              return params.type === 'magazine'
            }),
        )
    : EmptyItem
