import S from '@sanity/desk-tool/structure-builder'
// eslint-disable-next-line import/no-unresolved
import documentStore from 'part:@sanity/base/datastore/document'
import RoutePreview from '../previews/page/RoutePreview'
import NorwegianRoutePreview from '../previews/page/NorwegianRoutePreview'
import { map } from 'rxjs/operators'
import { RouteDocuments } from '../../icons'
import GreatBritain from '../../icons/GreatBritain'
import Norway from '../../icons/Norway'

/**
 * This is an example of a Structure Builder list item that:
 *
 * 1. Provides a top level link to edit 'parent' 'category' documents
 * 2. Queries the documentStore for those same documents to
 *    create a 'folder' for each 'parent', to show their 'children'
 * 3. Calls for a 'category-child' template and pre-populates
 *    the 'parent' reference field with the 'parent' _id
 */

const views = [
  S.view.form(),
  S.view.component(RoutePreview).title('English preview'),
  S.view.component(NorwegianRoutePreview).title('Norwegian preview'),
]
// Original version without preview pane
// const views = [S.view.form()]
export default function parentChild(schema = 'category') {
  return S.listItem()
    .title('Topic Routes')
    .icon(RouteDocuments)
    .child(
      S.list()
        .id('routes')
        .title('Routes')
        .items([
          S.listItem().title('English routes').icon(GreatBritain).child(routeStructure(schema, 'en_GB')),
          S.listItem().title('Norwegian routes').icon(Norway).child(routeStructure(schema, 'nb_NO')),
        ]),
    )
}

function routeStructure(schema, isoCode) {
  const documentName = `${schema}_${isoCode}`
  const categoryParents = `_type == "${documentName}" && !defined(parent) && !(_id in path("drafts.**"))`
  return () =>
    documentStore.listenQuery(`*[${categoryParents}]`).pipe(
      map((parents) =>
        S.list()
          .title('All Routes')
          .items([
            S.listItem()
              .title('Top Level Routes')
              .child(() =>
                S.documentList()
                  .title('Topic Categories')
                  .schemaType(documentName)
                  .filter(categoryParents)
                  .child((id) => S.document().documentId(id).views(views)),
              ),
            S.divider(),
            ...parents.map((parent) =>
              S.listItem(`{documentName}`)
                // Fix to avoid multiple list items with the same id
                .id(`${parent._id}`)
                .title(`${parent.slug?.current || 'Missing slug'}`)
                .icon(RouteDocuments)
                .child(() =>
                  S.documentList()
                    .title('Child Routes')
                    .schemaType(documentName)
                    .filter(`_type == "${documentName}" && parent._ref == $parentId`)
                    .params({ parentId: parent._id })
                    .canHandleIntent(S.documentTypeList(documentName).getCanHandleIntent())
                    .initialValueTemplates([
                      S.initialValueTemplateItem('category-child', {
                        parentId: parent._id,
                      }),
                    ])
                    .child((id) => S.document().documentId(id).views(views)),
                ),
            ),
          ]),
      ),
    )
}
