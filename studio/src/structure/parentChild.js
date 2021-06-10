import S from '@sanity/desk-tool/structure-builder'
// eslint-disable-next-line import/no-unresolved
import documentStore from 'part:@sanity/base/datastore/document'
import { map } from 'rxjs/operators'
import { EdsList } from '../../icons'

/**
 * This is an example of a Structure Builder list item that:
 *
 * 1. Provides a top level link to edit 'parent' 'category' documents
 * 2. Queries the documentStore for those same documents to
 *    create a 'folder' for each 'parent', to show their 'children'
 * 3. Calls for a 'category-child' template and pre-populates
 *    the 'parent' reference field with the 'parent' _id
 */

const views = [S.view.form()]

export default function parentChild(schema = 'category') {
  const categoryParents = `_type == "${schema}" && !defined(parent)`

  return S.listItem(schema)
    .title('Topic Routes')
    .icon(EdsList)
    .child(() =>
      documentStore.listenQuery(`*[${categoryParents}]`).pipe(
        map((parents) =>
          S.list()
            .title('All Categories')
            .items([
              S.listItem()
                .title('Top Level Pages')
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
                  .title(`${parent.slug?.current || 'Missing slug'}`)
                  .icon(EdsList)
                  .child(() =>
                    S.documentList()
                      .title('Child Pages')
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
