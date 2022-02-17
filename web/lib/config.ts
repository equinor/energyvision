import { ClientConfig } from 'next-sanity'

export const sanityConfig: ClientConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'global',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'h61q9gi9',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2021-12-17',
}

export const algolia = {
  applicationId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
  searchApiKey: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || '',
}
