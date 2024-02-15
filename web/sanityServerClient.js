export const sanityConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'global',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'h61q9gi9',
  token: process.env.SANITY_API_TOKEN,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
}
