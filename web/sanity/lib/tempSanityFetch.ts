import { dataset } from '@/languageConfig'
import { client } from './client'
import type { DefinedSanityFetchType } from './live'

/**
 * To be removed when issue fixed
 * https://github.com/sanity-io/next-sanity/issues/2542
 *
 * Examples: https://github.com/sanity-io/lcapi-examples/blob/main/next-16/src/sanity/fetch.ts
 */

export const tempSanityFetch: DefinedSanityFetchType = ({
  query,
  params = {},
  tags = [],
  stega,
}) => {
  const data = client.fetch(query, params, {
    cache: dataset === 'global-development' ? 'force-cache' : 'no-cache',
    next: {
      ...(tags.length > 0 && { tags }), // for tag-based revalidation
    },
    ...(stega && { stega }),
  })

  return {
    data,
    sourceMap: undefined,
    tags,
  }
}
