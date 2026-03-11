import { cacheTag } from 'next/cache'
import { dataset } from '@/languageConfig'
import { client } from './client'
import type { DefinedSanityFetchType } from './live'

/**
 * To be removed when issue fixed
 * https://github.com/sanity-io/next-sanity/issues/2542
 *
 * Examples: https://github.com/sanity-io/lcapi-examples/blob/main/next-16/src/sanity/fetch.ts
 */

//@ts-ignore: look at a bit later why return type is missing some required props
export const tempSanityFetch: DefinedSanityFetchType = async ({
  query,
  params = {},
  tags = [],
  stega,
}) => {
  'use cache: remote'
  const { data, syncTags } = await client.fetch(query, params, {
    cacheMode: 'noStale',
    //cache: dataset === 'global-development' ? 'force-cache' : 'no-cache',
    /* next: {
      ...(tags.length > 0 && { tags }), // for tag-based revalidation
    },*/
    ...(stega && { stega }),
  })

  const cacheTags = [...(syncTags || []), ...tags]
  /**
   * The tags used here, are expired later on in the `updateTags` Server Action with the `updateTag` function from `next/cache`
   */
  cacheTag(...cacheTags)

  return { data: data, tags: cacheTags, fetchedAt: new Date().toJSON() }
}
