/* import { ClientConfig, type QueryParams } from 'next-sanity'
import { client, clientNoCdn } from './client'

export async function sanityFetch({
  query,
  params = {},
  revalidate = 3600, // default update cache at most once every hour
  useCdn = true,
  perspective = 'published',
}: {
  query: any
  params?: QueryParams
  revalidate?: number | false
} & ClientConfig) {
  const sanityClient = useCdn ? client : clientNoCdn
  return sanityClient.fetch(query, params, {
    cache: 'force-cache', // on next v14 it's force-cache by default, in v15 it has to be set explicitly
    next: {
      revalidate: revalidate, // for simple, time-based revalidation
    },
    perspective,
  })
}
 */

import { defineLive } from 'next-sanity'
import { client } from './client'
import { token } from './token'

/**
 * Use defineLive to enable automatic revalidation and refreshing of your fetched content
 * Learn more: https://github.com/sanity-io/next-sanity?tab=readme-ov-file#1-configure-definelive
 */

export const { sanityFetch, SanityLive } = defineLive({
  client,
  // Required for showing draft content when the Sanity Presentation Tool is used, or to enable the Vercel Toolbar Edit Mode
  serverToken: token,
  // Required for stand-alone live previews, the token is only shared to the browser if it's a valid Next.js Draft Mode session
  browserToken: token,
})
