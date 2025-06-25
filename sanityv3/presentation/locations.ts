import { DocumentLocationResolver } from 'sanity/presentation'
import { getDraftId } from 'sanity'
import { map } from 'rxjs'
import { getLocaleFromName } from '../src/lib/localization'
// Pass 'context' as the second argument
export const locations: DocumentLocationResolver = (params, context) => {
  // Set up locations for page documents
  if (params.type === 'page') {
    console.log('context', context)
    const query = {
      fetch: `*[_id==$id][0]{
      _type,
      title,
      lang,
      "slugs": *[_type match "route_*" && references(^._id)].slug.current,
      ...
      }
      `,
      listen: `*[_id in [$id,$draftId]]`,
    }
    const pageParams = { id: params.id, draftId: getDraftId(params.id) }

    const doc$ = context.documentStore.listenQuery(
      query,
      pageParams,
      { perspective: 'previewDrafts' }, // returns a draft article if it exists
    )

    // Return a streaming list of locations
    return doc$.pipe(
      map((doc) => {
        console.log('doc', doc)
        // If the document doesn't exist or have a slug, return null
        if (!doc?.slugs || doc.slugs?.length === 0) {
          return null
        }
        const locale = getLocaleFromName(doc?.lang)
        return {
          locations: [
            {
              title: doc.title || 'Untitled',
              href: `/${locale !== 'en' ? `/${locale}` : ''}${doc.slugs?.[0]}`,
            },
          ],
        }
      }),
    )
  }
  return null
}
