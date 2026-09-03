import { cacheLife } from 'next/cache'
import { draftMode } from 'next/headers'
import type { QueryParams } from 'next-sanity'
import type { DefinedFetchType, LivePerspective } from 'next-sanity/live'
import { sanityFetch as nextSanityFetch } from './live'
import {
  simpleClientFetch,
  simpleClientMetadataFetch,
} from './simple/simpleFetch'

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

const cachedNextSanityFetch: DefinedFetchType = async options => {
  cacheLife('max')
  if (!options.requestTag) {
    console.log(options.query)
  }
  return nextSanityFetch(options)
}

// For usage within generateMetadata and generateViewport
async function nextSanityMetadataFetch<const QueryString extends string>({
  query,
  params = {},
  perspective,
}: {
  query: QueryString
  params?: QueryParams
  perspective: LivePerspective
}) {
  "use cache"
  cacheLife('max')
  const { data } = await nextSanityFetch({
    query,
    params,
    perspective,
    stega: false,
  })
  return { data }
}

export const sanityFetchMetadata = (options: any) => {
  return IS_FETCH_OPTIMIZED
    ? simpleClientMetadataFetch(options)
    : nextSanityMetadataFetch(options)
}

export const routeSanityFetch: DefinedFetchType = async options => {
  // Drafts must stay uncached and keep stega/visual editing support.

  const { isEnabled: isDraft } = await draftMode()
  if (isDraft) {
    if (!options.requestTag) {
      console.log(options.query)
    }
    return nextSanityFetch({ ...options })
  }

  return IS_FETCH_OPTIMIZED
    ? simpleClientFetch(options)
    : cachedNextSanityFetch(options)
}
