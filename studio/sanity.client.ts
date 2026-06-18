// eslint-disable-next-line import/namespace

import type { DatasetsKeys } from '@energyvision/shared/satelliteConfig'
import { createClient } from '@sanity/client'

export const projectId = process.env.SANITY_STUDIO_API_PROJECT_ID || 'h61q9gi9'
export const dataset = (process.env.SANITY_STUDIO_API_DATASET ||
  'global-development') as DatasetsKeys
export const apiVersion = 'v2023-12-06'

export const sanityClient = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: apiVersion,
  useCdn: false,
})
