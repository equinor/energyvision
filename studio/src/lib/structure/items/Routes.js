import { CiRoute } from 'react-icons/ci'
import { PiGlobeLight } from 'react-icons/pi'
import { map } from 'rxjs/operators'
import { RouteDocuments } from '../../../../icons'
import flags from '../../../../icons/countries'
import { languages } from '../../../../languages'
import { apiVersion } from '../../../../sanity.client'
import { singletonListItem } from './SingletonItem'

/**
 * This is an example of a Structure Builder list item that:
 *
 * 1. Provides a top level link to edit 'parent' 'category' documents
 * 2. Queries the documentStore for those same documents to
 *    create a 'folder' for each 'parent', to show their 'children'
 * 3. Calls for a 'category-child' template and pre-populates
 *    the 'parent' reference field with the 'parent' _id
 */

const views = S => [S.view.form().title('Edit route')]

const schema = 'route'

const topicRoutes = (S, context) =>
  languages.map(lang =>
    S.listItem()
      .title(`${lang.title} routes`)
      .icon(flags[lang.id])
      .child(routeStructure(S, context, lang.name)),
  )

function routeStructure(S, context, isoCode) {
  const { documentStore } = context
  const documentName = `${schema}_${isoCode}`
  const categoryParents = `_type == "${documentName}" && !defined(parent) && !(_id in path("drafts.**"))`
  const categoryParentsWithDrafts = `_type == "${documentName}" && !defined(parent)`

  return () =>
    documentStore.listenQuery(`*[${categoryParents}]`).pipe(
      map(parents =>
        S.list()
          .title('All Routes')
          .items([
            S.listItem()
              .title('Top Level Routes')
              .child(
                S.documentList()
                  .title('Top level routes')
                  .schemaType(documentName)
                  .apiVersion(apiVersion)
                  .filter(categoryParentsWithDrafts)
                  .canHandleIntent(
                    (intent, { type }) =>
                      type === documentName &&
                      ['create', 'edit'].includes(intent),
                  )
                  .child(id =>
                    S.document()
                      .documentId(id)
                      .views(views(S))
                      .schemaType(documentName),
                  ),
              ),
            S.divider(),
            ...parents.map(parent =>
              S.listItem(`{documentName}`)
                // Fix to avoid multiple list items with the same id
                .id(`${parent._id}`)
                .title(`${parent.slug?.current || 'Missing slug'}`)
                .icon(CiRoute)
                .child(
                  S.documentList()
                    .apiVersion(apiVersion)
                    .title(`${parent.slug?.current} child routes`) //Child routes
                    .schemaType(documentName)
                    .filter(
                      `_type == "${documentName}" && parent._ref == $parentId`,
                    )
                    .params({ parentId: parent._id })
                    .canHandleIntent(
                      S.documentTypeList(documentName).getCanHandleIntent(),
                    )
                    .child(id =>
                      S.documentWithInitialValueTemplate(
                        `parent-route-${isoCode}`,
                        {
                          parentId: parent._id,
                        },
                      )
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
    .title('Topic routes')
    .icon(RouteDocuments)
    .child(S.list().id('routes').title('Routes').items(topicRoutes(S, context)))

export const HomePageRoute = S =>
  singletonListItem(S, 'route_homepage', 'Homepage route').icon(PiGlobeLight)
