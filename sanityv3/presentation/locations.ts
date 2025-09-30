import { DocumentLocationResolver } from 'sanity/presentation'
import { getDraftId } from 'sanity'
import { map } from 'rxjs'
import { getLocaleFromName } from '../src/lib/localization'

export const locations: DocumentLocationResolver = (params, context) => {
  // Set up locations for page documents
  if (params.type === 'page') {
    const query = {
      fetch: `*[_id==$id][0]{
      _type,
      title,
      lang,
      "slugs": *[_type match "route_*" && references(^._id)],
      ...
      }
      `,
      listen: `*[_id in [$id,$draftId]]`,
    }
    const pageParams = { id: params.id, draftId: getDraftId(params.id) }

    const doc$ = context.documentStore.listenQuery(
      query,
      pageParams,
      { perspective: 'drafts' }, // returns a draft article if it exists
    )

    // Return a streaming list of locations
    return doc$.pipe(
      map((doc) => {
        // If the document doesn't exist or have a slug, return null
        if (!doc?.slugs || doc.slugs?.length === 0) {
          return null
        }
        const locale = getLocaleFromName(doc?.lang)
        const locs = doc?.slugs.map((item: any) => {
          return {
            title: item?.topicSlug ? `Topic slug:${item?.topicSlug}` : 'Route',
            href: `${locale !== 'en-GB' ? `/${locale}` : ''}${item?.slug?.current}`,
          }
        })
        return {
          locations: [...locs],
        }
      }),
    )
  }
  return null
}
