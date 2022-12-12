//eslint-disable-next-line
import sanityClient from 'part:@sanity/base/client'

const datasets = ['global-development']
export const sanityClients = datasets.map((dataset) => {
  return sanityClient.withConfig({
    apiVersion: '2021-05-19',
    projectId: process.env.SANITY_STUDIO_API_PROJECT_ID || 'h61q9gi9',
    token: process.env.SANITY_STUDIO_MUTATION_TOKEN,
    dataset: dataset,
  })
})
