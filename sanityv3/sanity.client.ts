import { createClient } from '@sanity/client'

export const projectId = process.env.SANITY_STUDIO_API_PROJECT_ID || 'h61q9gi9'
export const dataset = process.env.SANITY_STUDIO_API_DATASET || 'global-development'

export const sanityClient = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: '2023-01-01',
  useCdn: false,
})
