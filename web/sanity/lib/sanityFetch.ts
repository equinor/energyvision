import type { QueryParams } from 'next-sanity'
import { dataset } from '@/languageConfig'
import { client } from './client'

/**
 * https://github.com/sanity-io/next-sanity/issues/2542
 *
 * Examples: https://github.com/sanity-io/lcapi-examples/blob/main/next-16/src/sanity/fetch.ts
 */

//useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = false,
  tags = [],
  stega,
}: {
  query: QueryString
  params?: QueryParams
  revalidate?: number | false
  tags?: string[]
  stega?: boolean
}) {
  console.log('sanityFetch dataset', dataset)
  return client.fetch(query, params, {
    cache: dataset === 'global-development' ? 'force-cache' : 'no-cache',
    next: {
      ...(tags.length === 0 && { revalidate }), // for simple, time-based revalidation
      ...(tags.length > 0 && { tags }), // for tag-based revalidation
    },
    ...(stega && { stega }),
  })
}
