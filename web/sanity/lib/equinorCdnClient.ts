import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './api'

/**
 *  Use this client only for fetching assets like images and other files for production. This won't work for sanity api calls. 
 */
export const assetOnlyCdnClient = createClient({
  projectId,
  dataset,
  apiVersion,
  perspective: 'published',
  useCdn: true,
  ...(process.env.NODE_ENV === 'production' && { apiHost: 'https://cdn.equinor.com' }),
})
