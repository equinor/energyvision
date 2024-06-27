import 'server-only'
import * as queryStore from '@sanity/react-loader'
import { draftMode } from 'next/headers'
import { client } from './lib/client'
import { token } from './lib/token'
import { NewsRoomPageType } from 'types'
import { newsroomQuery } from 'lib/queries/newsroom'


const serverClient = client.withConfig({token})

/**
 * Sets the server client for the query store, doing it here ensures that all data fetching in production
 * happens on the server and not on the client.
 * Live mode in `sanity/presentation` still works, as it uses the `useLiveMode` hook to update `useQuery` instances with
 * live draft content using `postMessage`.
 */
queryStore.setServerClient(serverClient)

const usingCdn = serverClient.config().useCdn
// Automatically handle draft mode
export const loadQuery = ((query, params = {}, options = {}) => {
  const {
    perspective = draftMode().isEnabled ? 'previewDrafts' : 'published',
  } = options
  // Don't cache by default
  let revalidate: NextFetchRequestConfig['revalidate'] = 0
  // If `next.tags` is set, and we're not using the CDN, then it's safe to cache
  if (!usingCdn && Array.isArray(options.next?.tags)) {
    revalidate = false
  } else if (usingCdn) {
    revalidate = 60
  }
  return queryStore.loadQuery(query, params, {
    ...options,
    next: {
      revalidate,
      ...(options.next || {}),
    },
    perspective,
  })
}) satisfies typeof queryStore.loadQuery

/**
 * Loaders that are used in more than one place are declared here, 
 * otherwise they're colocated with the component
 */

export function loadNewsRoom() {
  return loadQuery<NewsRoomPageType>(
    newsroomQuery,
    {}
  )
}

/* export function loadPage(slug: string) {
  return loadQuery<PagePayload | null>(
    pagesBySlugQuery,
    { slug },
    { next: { tags: [`page:${slug}`] } },
  )
} */
