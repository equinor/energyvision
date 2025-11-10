import { createClient } from 'next-sanity'
import { sanityConfig } from '../config'

export const sanityServerClient = createClient({
  ...sanityConfig,
})
export const getServerClient = () => sanityServerClient
