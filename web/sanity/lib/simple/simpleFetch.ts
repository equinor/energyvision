import { cacheLife, cacheTag } from 'next/cache'
import type { DefinedFetchType } from 'next-sanity/live'
import { client as simpleClient } from './simpleClient'

export const simpleClientFetch: DefinedFetchType = async ({
  query,
  params = {},
  tags = [],
  perspective = 'published',
  requestTag = 'optimized-fetch',
}) => {
  'use cache'
  cacheLife('max')
  console.log('Fetching with optimized fetch:', tags)
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

export const simpleClientMetadataFetch: DefinedFetchType = async ({
  query,
  params = {},
  tags = [],
  perspective = 'published',
  requestTag = 'optimized-fetch',
}) => {
  'use cache'
  cacheLife('max')
  console.log('Fetching with optimized fetch:', tags)
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
