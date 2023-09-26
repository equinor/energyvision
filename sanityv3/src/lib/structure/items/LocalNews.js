import { list, tag as tagIcon } from '@equinor/eds-icons'
import { map } from 'rxjs/operators'
import { EdsIcon, NewsDocuments } from '../../../../icons'
import { languages } from '../../../../languages'
import { Flags } from '../../datasetHelpers'
import { EmptyItem } from './EmptyItem'

const documentList = (S, lang) =>
  S.documentTypeList('localNews')
    .id('localNews')
    .title('Local news articles')
    .filter('_type == "localNews" && (!defined(lang) || lang == $baseLang)')
    .params({ baseLang: lang.name })
    .canHandleIntent((_name, params) => {
      // Assume we can handle all intents (actions) regarding post documents
      return params.type === 'localNews'
    })

const localNewsStructure = (S, context, lang) => {
  const { documentStore } = context
  const documentName = 'localNews'

  return () =>
    documentStore.listenQuery(`*[_type == "localNewsTag"]`).pipe(
      map((tags) =>
        S.list()
          .title('All tags')
          .items([
            S.listItem('allNews')
              .id('allLocalNews')
              .title('All local news')
              .icon(() => EdsIcon(list))
              .child(() => documentList(S, lang)),
            ...tags.map((tag) =>
              S.listItem(`${tag._id}`)
                // Fix to avoid multiple list items with the same id
                .id(`${tag._id}`)
                .title(`${tag.title}`)
                .icon(() => EdsIcon(tagIcon))
                .child(() =>
                  S.documentList()
                    .title(`Results for: ${tag.title}`)
                    .schemaType(documentName)
                    .filter(`_type == "${documentName}" && references($tagId) && (!defined(lang) || lang == $baseLang)`)
                    .params({ tagId: tag._id, baseLang: lang.name })
                    .canHandleIntent(S.documentTypeList(documentName).getCanHandleIntent())
                    .child((documentId) =>
                      S.documentWithInitialValueTemplate('localnews-with-tag', {
                        localNewsTag: {
                          _ref: tag._id,
                          _type: 'reference',
                        },
                      }).documentId(documentId),
                    ),
                ),
            ),
          ]),
      ),
    )
}

export const LocalNews = (S, context) =>
  Flags.HAS_LOCAL_NEWS
    ? S.listItem()
        .title('Local news')
        .icon(NewsDocuments)
        .schemaType('localNews')
        .child(
          S.list('local_news')
            .title('Local news')
            .items(
              languages.map((it) =>
                S.listItem(`${it.title} local news`)
                  .title(`${it.title} local news`)
                  .id(`${it.iso}_local_news`)
                  .icon(NewsDocuments)
                  .child(() => localNewsStructure(S, context, it)),
              ),
            ),
        )
    : EmptyItem
