import createClient from '@sanity/client'

// @TODO Where
export interface ProjectConfig {
  projectId: string
  dataset: string
}
export interface ClientConfig extends ProjectConfig {
  token?: string
  useCdn?: boolean
  withCredentials?: boolean
  apiVersion?: string
}

const sanityConfig: ClientConfig = {
  dataset: process.env.SANITY_DATASET || 'global',
  projectId: process.env.SANITY_PROJECT_ID || 'h61q9gi9',
  token: process.env.NEXT_PUBLIC_SANITY_DATASET === 'global-development' ? process.env.SANITY_API_TOKEN : undefined,
  useCdn: true,
  apiVersion: '2021-12-17',
}

export const sanityClient = createClient(sanityConfig)
