import type { ClientConfig } from 'next-sanity'

// Because dataset and projectId are optional in the ClientConfig but not in the ProjectConfig :/
type Config = {
  dataset: string
  projectId: string
} & ClientConfig

export const sanityConfig: Config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'global',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'h61q9gi9',
  token: process.env.SANITY_API_TOKEN,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2021-12-17',
}

export const algolia = {
  applicationId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
  searchApiKey: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || '',
  searchApiServerKey: process.env.ALGOLIA_SEARCH_API_SERVER_KEY || '',
}
