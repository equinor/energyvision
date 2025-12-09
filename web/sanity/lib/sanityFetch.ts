import { type QueryParams } from 'next-sanity'
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
  stega
}: {
  query: QueryString
  params?: QueryParams
  revalidate?: number | false
  tags?: string[]
  stega?: boolean;
}) {
    console.log("sanityfetch stega", stega);
  return client.fetch(query, params, {
    cache: 'force-cache',
    next: {
      revalidate: tags.length ? false : revalidate, // for simple, time-based revalidation
      tags, // for tag-based revalidation
    },
    ...(stega && {stega}),
  })
}