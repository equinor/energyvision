import { map } from 'rxjs/operators'
import { RouteDocuments } from '../../../../icons'
import { languages } from '../../../../languages'

import flags from '../../../../icons/countries'
import Preview from '../../../previews/Preview'

/**
 * This is an example of a Structure Builder list item that:
 *
 * 1. Provides a top level link to edit 'parent' 'category' documents
 * 2. Queries the documentStore for those same documents to
 *    create a 'folder' for each 'parent', to show their 'children'
 * 3. Calls for a 'category-child' template and pre-populates
 *    the 'parent' reference field with the 'parent' _id
 */

const views = (S) => [S.view.form().title('Edit route'), S.view.component(Preview).title('Preview')]
// Original version without preview pane
// const views = [S.view.form()]

const schema = 'route'

const topicRoutes = (S, context) =>
  languages.map((lang) =>
    S.listItem().title(`${lang.title} routes`).icon(flags[lang.id]).child(routeStructure(S, context, lang.name)),
  )

function routeStructure(S, context, isoCode) {
  const { documentStore } = context
  const documentName = `${schema}_${isoCode}`
  const categoryParents = `_type == "${documentName}" && !defined(parent) && !(_id in path("drafts.**"))`
  const categoryParentsWithDrafts = `_type == "${documentName}" && !defined(parent)`

  return () =>
    documentStore.listenQuery(`*[${categoryParents}]`).pipe(
      map((parents) =>
        S.list()
          .title('All Routes')
          .items([
            S.listItem()
              .title('Top Level Routes')
              .child(
                S.documentList()
                  .title('Topic Categories')
                  .schemaType(documentName)
                  .filter(categoryParentsWithDrafts)
                  .canHandleIntent((intent, { type }) => type === documentName && ['create', 'edit'].includes(intent))
                  .child((id) => S.document().documentId(id).views(views(S)).schemaType(documentName)),
              ),
            S.divider(),
            ...parents.map((parent) =>
              S.listItem(`{documentName}`)
                // Fix to avoid multiple list items with the same id
                .id(`${parent._id}`)
                .title(`${parent.slug?.current || 'Missing slug'}`)
                .icon(RouteDocuments)
                .child(
                  S.documentList()
                    .title('Child Routes')
                    .schemaType(documentName)
                    .filter(`_type == "${documentName}" && parent._ref == $parentId`)
                    .params({ parentId: parent._id })
                    .canHandleIntent(S.documentTypeList(documentName).getCanHandleIntent())
                    .child((id) =>
                      S.documentWithInitialValueTemplate(`parent-route-${isoCode}`, {
                        parentId: parent._id,
                      })
                        .documentId(id)
                        .views(views(S))
                        .schemaType(documentName),
                    ),
                ),
            ),
          ]),
      ),
    )
}

export const Routes = (S, context) =>
  S.listItem()
    .title('Topic Routes')
    .icon(RouteDocuments)
    .child(S.list().id('routes').title('Routes').items(topicRoutes(S, context)))
