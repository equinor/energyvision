import { createClient } from 'next-sanity'

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'zomg-ts',
  useCdn: process.env.NODE_ENV === 'production',
}

export const client = createClient(config)
