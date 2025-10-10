//eslint-disable-next-line
import { createClient } from '@sanity/client'

const datasets = ['global-development']
export const sanityClients = datasets.map((dataset) => {
  return createClient({
    apiVersion: '2023-08-29',
    projectId: process.env.SANITY_STUDIO_API_PROJECT_ID || 'h61q9gi9',
    token: process.env.SANITY_STUDIO_MUTATION_TOKEN,
    dataset: dataset,
  })
})
