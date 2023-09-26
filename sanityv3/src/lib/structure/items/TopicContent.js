import { TopicDocuments } from '../../../../icons'
import { languages } from '../../../../languages'

const documentList = (S, lang) =>
  S.documentTypeList('page')
    .id('pages')
    .title('Topic content')
    .filter('_type == "page" && (!defined(lang) || lang == $baseLang)')
    .params({ baseLang: lang.name })
    .canHandleIntent((_name, params) => {
      // Assume we can handle all intents (actions) regarding post documents
      return params.type === 'page'
    })
export const TopicContent = (S) =>
  S.listItem()
    .title('Topic content')
    .icon(TopicDocuments)
    .schemaType('page')
    .child(
      S.list()
        .title('Topic Content')
        .items(
          languages.map((it) =>
            S.listItem(`${it.title} topics`)
              .title(`${it.title} topics`)
              .id(`${it.iso}_topics`)
              .icon(TopicDocuments)
              .child(() => documentList(S, it)),
          ),
        ),
    )
