import { cacheLife } from 'next/cache'
import { draftMode } from 'next/headers'
import { QueryParams } from 'next-sanity'
import type { DefinedFetchType, LivePerspective } from 'next-sanity/live'
import { sanityFetch } from './live'
import { optimizedFetch, optimizedMetadataFetch } from './simpleFetch'

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
  cacheLife('max')
  console.log('Using cached sanityFetch for', options.requestTag)
  if (!options.requestTag) {
    console.log(options.query)
  }
  return sanityFetch(options)
}

// For usage within generateMetadata and generateViewport
async function nextSanityFetch<const QueryString extends string>({
  query,
  params = {},
  perspective,
}: {
  query: QueryString
  params?: QueryParams
  perspective: LivePerspective
}) {
  'use cache'
  cacheLife('max')
  const { data } = await sanityFetch({
    query,
    params,
    perspective,
    stega: false,
  })
  return { data }
}

export const sanityFetchMetadata = (options: any) => {
  return IS_FETCH_OPTIMIZED
    ? optimizedMetadataFetch(options)
    : nextSanityFetch(options)
}

export const routeSanityFetch: DefinedFetchType = async options => {
  // Drafts must stay uncached and keep stega/visual editing support.
  const { isEnabled: isDraft } = await draftMode()

  if (isDraft) {
    console.log(
      'Draft mode enabled, using uncached sanityFetch for',
      options.requestTag,
    )
    if (!options.requestTag) {
      console.log(options.query)
    }
    return sanityFetch(options)
  }

  return IS_FETCH_OPTIMIZED
    ? optimizedFetch(options)
    : cachedSanityFetch(options)
}
