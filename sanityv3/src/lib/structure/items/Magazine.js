import { TopicDocuments } from '../../../../icons'
import { defaultLanguage, languages } from '../../../../languages'
import { Flags } from '../../datasetHelpers'
import { EmptyItem } from './EmptyItem'

const documentList = (S, lang) =>
  S.documentTypeList('magazine')
    .id('magazines')
    .title('Magazines')
    .filter('_type == "magazine" && (!defined(lang) || lang == $baseLang)')
    .params({ baseLang: lang.iso })
    .canHandleIntent((_name, params) => {
      // Assume we can handle all intents (actions) regarding post documents
      return params.type === 'magazine'
    })

export const Magazine = (S) =>
  Flags.HAS_MAGAZINE
    ? S.listItem()
        .title('Magazine')
        .icon(TopicDocuments)
        .schemaType('magazine')
        .child(
          S.list()
            .title('Magazines')
            .items(
              languages.map((it) =>
                S.listItem(`${it.title} magazines`)
                  .title(`${it.title} magazines`)
                  .id(`${it.iso}_magazines`)
                  .icon(TopicDocuments)
                  .child(() => documentList(S, it)),
              ),
            ),
        )
    : EmptyItem
