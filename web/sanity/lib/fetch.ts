import { draftMode } from 'next/headers'
import type { DefinedFetchType } from 'next-sanity/live'
import { client } from './client'
import { sanityFetch } from './live'

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

/** Tag applied to every optimized fetch, used by the revalidation webhook. */
export const SANITY_CACHE_TAG = 'sanity'

export const documentCacheTag = (id: string) => `sanity:id:${id}`
export const documentTypeCacheTag = (type: string) => `sanity:type:${type}`

const optimizedFetch: DefinedFetchType = async ({
  query,
  params = {},
  tags = [],
  stega = false,
  perspective = 'published',
  requestTag = 'optimized-fetch',
}) => {
  const cacheTags = [SANITY_CACHE_TAG, ...tags]

  const { result, resultSourceMap } = await client.fetch(query, await params, {
    filterResponse: false,
    perspective,
    stega,
    useCdn: true,
    tag: requestTag,
    next: {
      // only revalidated on demand through the Sanity webhook
      revalidate: false,
      tags: cacheTags,
    },
  })

  return { data: result, sourceMap: resultSourceMap ?? null, tags: cacheTags }
}

export const routeSanityFetch: DefinedFetchType = async options => {
  if (!IS_FETCH_OPTIMIZED) {
    return sanityFetch(options)
  }

  // drafts must stay uncached and keep stega/visual editing support
  const { isEnabled: isDraft } = await draftMode()

  return isDraft ? sanityFetch(options) : optimizedFetch(options)
}
