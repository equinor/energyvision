import { createClient } from '@sanity/client'
import { flow } from 'fp-ts/lib/function'
import * as E from 'fp-ts/lib/Either'
import { getSanityApiToken, getSanityDataset, getSanityProjectId } from './env'

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

export const getSanityClient = flow(
  getSanityDataset,
  E.bindTo('dataset'),
  E.bind('projectId', () => getSanityProjectId()),
  E.bind('token', () => getSanityApiToken()),
  E.map(({ dataset, projectId, token }) =>
    createClient({
      dataset,
      projectId,
      token,
      useCdn: false, // To get fresh content from sanity immediately after publish
      apiVersion: '2025-12-08',
      requestTagPrefix:"algolia-indexers"
    }),
  ),
)
