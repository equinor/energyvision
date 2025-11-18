import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './api'

export const sanityClientWithEquinorCDN = createClient({
  projectId,
  dataset,
  apiVersion,
  perspective: 'published',
  useCdn: true,
  ...(process.env.NODE_ENV === 'production' && { apiHost: 'https://cdn.equinor.com' }),
})
