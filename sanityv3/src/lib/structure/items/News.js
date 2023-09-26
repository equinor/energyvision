import { NewsDocuments } from '../../../../icons'
import { Flags } from '../../datasetHelpers'
import { EmptyItem } from './EmptyItem'
import { languages } from '../../../../languages'

const documentList = (S, lang) =>
  S.documentTypeList('news')
    .id(`news`)
    .title(`${lang.title} articles`)
    .filter(`_type == "news" && (lang == $baseLang || !defined(lang))`)
    .params({ baseLang: lang.name })
    .canHandleIntent((_name, params) => {
      // Assume we can handle all intents (actions) regarding post documents
      return params.type === 'news'
    })

export const News = (S) =>
  Flags.HAS_NEWS
    ? S.listItem()
        .title('News')
        .icon(NewsDocuments)
        .schemaType('news')
        .child(
          S.list()
            .title('News')
            .items(
              languages.map((it) =>
                S.listItem(`${it.title} news`)
                  .title(`${it.title} news`)
                  .id(`${it.iso}_news`)
                  .icon(NewsDocuments)
                  .child(() => documentList(S, it)),
              ),
            ),
        )
    : EmptyItem
