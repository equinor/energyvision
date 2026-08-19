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

const optimizedFetch: DefinedFetchType = async ({
  query,
  params = {},
  tags = [],
  stega = false,
  perspective = 'published',
  requestTag = 'optimized-fetch',
}) => {
  console.log('Fetching with optimized fetch:', {
    tags,
    stega,
    perspective,
    requestTag,
  })
  const { result, resultSourceMap } = await client.fetch(query, await params, {
    filterResponse: false,
    perspective,
    stega,
    useCdn: true,
    tag: requestTag,
    next: {
      // only revalidated on demand through the Sanity webhook
      revalidate: false,
      tags: tags,
    },
  })

  return { data: result, sourceMap: resultSourceMap ?? null, tags: tags }
}

export const routeSanityFetch: DefinedFetchType = async options => {
  if (!IS_FETCH_OPTIMIZED) {
    return sanityFetch(options)
  }

  // drafts must stay uncached and keep stega/visual editing support
  const { isEnabled: isDraft } = await draftMode()

  return isDraft ? sanityFetch(options) : optimizedFetch(options)
}
