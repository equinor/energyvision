//@ts-ignore:followiong documentation but ts complain
// eslint-disable-next-line import/no-unresolved
import { defineLive } from 'next-sanity/live'
import { client } from './client'
import { token } from './token'

export const { sanityFetch, SanityLive } = defineLive({
  client,
  // Required for showing draft content when the Sanity Presentation Tool is used
  serverToken: token,
  // Required for stand-alone live previews, the token is only shared to the browser if it's a valid Next.js Draft Mode session
  browserToken: token,
})
