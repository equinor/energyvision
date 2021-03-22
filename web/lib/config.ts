import { ClientConfig } from 'next-sanity'

export const sanityConfig: ClientConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'h61q9gi9',
  useCdn: process.env.NODE_ENV === 'production',
}
