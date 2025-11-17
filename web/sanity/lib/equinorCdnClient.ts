import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './api'

export const sanityClientWithEquinorCDN = createClient({
  projectId,
  dataset,
  apiVersion,
  perspective: 'published',
  useCdn: true,
  apiHost: 'https://cdn.equinor.com',
})
