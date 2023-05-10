import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'h61q9gi9',
  dataset: 'global-development',
  apiVersion: '2023-01-01',
  useCdn: false,
})
