import S from '@sanity/desk-tool/structure-builder'
// eslint-disable-next-line import/no-unresolved
import documentStore from 'part:@sanity/base/datastore/document'
import RoutePreview from '../previews/page/RoutePreview'
import { map } from 'rxjs/operators'
import { RouteDocuments } from '../../icons'

/**
 * This is an example of a Structure Builder list item that:
 *
 * 1. Provides a top level link to edit 'parent' 'category' documents
 * 2. Queries the documentStore for those same documents to
 *    create a 'folder' for each 'parent', to show their 'children'
 * 3. Calls for a 'category-child' template and pre-populates
 *    the 'parent' reference field with the 'parent' _id
 */

const views = [S.view.form(), S.view.component(RoutePreview).title('Route preview')]
// Original version without preview pane
// const views = [S.view.form()]
export default function parentChild(schema = 'category') {
  const categoryParents = `_type == "${schema}" && !defined(parent) && !(_id in path("drafts.**"))`

  return S.listItem(schema)
    .title('Topic Routes')
    .icon(RouteDocuments)
    .child(() =>
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
                    .schemaType(schema)
                    .filter(categoryParents)
                    .child((id) => S.document().documentId(id).views(views)),
                ),
              S.divider(),
              ...parents.map((parent) =>
                S.listItem()
                  // Fix to avoid multiple list items with the same id
                  .id(`${parent._id}`)
                  .title(`${parent.slug?.en_gb.current || 'Missing slug'}`)
                  .icon(RouteDocuments)
                  .child(() =>
                    S.documentList()
                      .title('Child Routes')
                      .schemaType(schema)
                      .filter(`_type == "${schema}" && parent._ref == $parentId`)
                      .params({ parentId: parent._id })
                      .canHandleIntent(S.documentTypeList(schema).getCanHandleIntent())
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
      ),
    )
}
