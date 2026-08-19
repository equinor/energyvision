import { draftMode } from 'next/headers'
import type { DefinedFetchType } from 'next-sanity/live'
import { sanityFetch } from './live'
import { optimizedFetch } from './simpleFetch'

/**
 * Feature flag for the optimized fetch.
 *
 * `sanityFetch` tags every request with the `syncTags` returned by Content Lake, which also
 * invalidates published content when a referenced draft is created or edited. When optimized,
 * content is fetched with the plain client and revalidated on demand from the
 * `/api/revalidate-sanity` webhook route instead of Sanity Live.
 */
export const IS_FETCH_OPTIMIZED =
  process.env.NEXT_PUBLIC_OPTIMIZED_SANITY_FETCH === 'true'

const cachedSanityFetch: DefinedFetchType = async options => {
  'use cache'
  return sanityFetch(options)
}

export const routeSanityFetch: DefinedFetchType = async options => {
  // Drafts must stay uncached and keep stega/visual editing support.
  const { isEnabled: isDraft } = await draftMode()

  if (isDraft) {
    return sanityFetch(options)
  }

  return IS_FETCH_OPTIMIZED
    ? optimizedFetch(options)
    : cachedSanityFetch(options)
}
