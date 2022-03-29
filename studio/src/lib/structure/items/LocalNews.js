import S from '@sanity/desk-tool/structure-builder'
import { NewsDocuments, EdsIcon } from '../../../../icons'
// eslint-disable-next-line import/no-unresolved
import documentStore from 'part:@sanity/base/datastore/document'
import { map } from 'rxjs/operators'
import { i18n } from '../../../../schemas/documentTranslation'
import { list, tag as tagIcon } from '@equinor/eds-icons'
import { EmptyItem } from './EmptyItem'
import { HAS_LOCAL_NEWS } from '../../datasetHelpers'

const localNewsStructure = () => {
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
              .child(() =>
                S.documentTypeList('localNews')
                  .id('localNews')
                  .title('Local news articles')
                  .filter('_type == "localNews" && (!defined(_lang) || _lang == $baseLang)')
                  .params({ baseLang: i18n.base })
                  .canHandleIntent((_name, params) => {
                    // Assume we can handle all intents (actions) regarding post documents
                    return params.type === 'localNews'
                  }),
              ),
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
                    .filter(
                      `_type == "${documentName}" && references($tagId) && (!defined(_lang) || _lang == $baseLang)`,
                    )
                    .params({ tagId: tag._id, baseLang: i18n.base })
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

export const LocalNews = HAS_LOCAL_NEWS
  ? S.listItem().title('Local news').icon(NewsDocuments).schemaType('localNews').child(localNewsStructure())
  : EmptyItem
