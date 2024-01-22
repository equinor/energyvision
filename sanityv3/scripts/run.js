import { getCliClient } from 'sanity/cli'

const DATASET_TARGET = ['global-development']
const RUN_SCRIPTS = ['issue-1832/index.mjs']

export const getSanityClients = DATASET_TARGET.map((dataset) => {
  return getCliClient({
    apiVersion: '2024-01-01',
    projectId: process.env.SANITY_STUDIO_API_PROJECT_ID || 'h61q9gi9',
    dataset: dataset,
    useCdn: false,
  })
})

RUN_SCRIPTS.map(async (path) => {
  const script = await import(`./${path}`)
  getSanityClients.map((e) => {
    script.default(e)
  })
})
