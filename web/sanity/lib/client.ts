import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn, revalidateSecret } from './api'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  apiHost: 'https://cdn.equinor.com',
  // If webhook revalidation is setup we want the freshest content, if not then it's best to use the speedy CDN
  //useCdn: revalidateSecret ? false : true,
  //perspective: 'published',
})
