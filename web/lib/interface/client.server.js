import { createClient } from 'next-sanity'

const sanityConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'global',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'h61q9gi9',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
}

export const nextSanityClient = createClient({
  ...sanityConfig,
  useCdn: false,
})
