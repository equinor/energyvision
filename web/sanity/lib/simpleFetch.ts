import { cacheTag } from 'next/cache'
import type { DefinedFetchType } from 'next-sanity/live'
import { client as simpleClient } from './simpleClient'

export const optimizedFetch: DefinedFetchType = async ({
  query,
  params = {},
  tags = [],
  perspective = 'published',
  requestTag = 'optimized-fetch',
}) => {
  'use cache'
  console.log('Fetching with optimized fetch:', {
    tags,
    perspective,
    requestTag,
  })
  cacheTag(...tags)
  const { result, resultSourceMap } = await simpleClient.fetch(
    query,
    await params,
    {
      filterResponse: false,
      perspective,
      useCdn: true,
      tag: requestTag,
    },
  )

  return { data: result, sourceMap: resultSourceMap ?? null, tags: tags }
}
