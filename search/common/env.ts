import * as E from 'fp-ts/lib/Either'
import { GetProcessEnvType } from './types'

export const getAzureConnectionString: GetProcessEnvType = () =>
  E.fromNullable('Unable to find Azure connection string')(process.env.AZ_CONNECTION_STRING)
// TODO: Should this be in the env? Perhaps to generic.
export const getContainerName: GetProcessEnvType = () =>
  E.fromNullable('Unable to find container name')(process.env.CONTAINER)
export const getAlgoliaAppId: GetProcessEnvType = () =>
  E.fromNullable('Unable to find app id')(process.env.ALGOLIA_APP_ID)
export const getAlgoliaApiKey: GetProcessEnvType = () =>
  E.fromNullable('Unable to find API key')(process.env.ALGOLIA_API_KEY)
export const getEnvironment: GetProcessEnvType = () => E.fromNullable('Unable to find environment')(process.env.ENV)
export const getSanityDataset: GetProcessEnvType = () =>
  E.fromNullable('Unable to find Sanity dataset')(process.env.SANITY_DATASET)
export const getSanityProjectId: GetProcessEnvType = () =>
  E.fromNullable('Unable to find Sainty Project ID')(process.env.SANITY_PROJECT_ID)
export const getSanityApiToken: GetProcessEnvType = () =>
  E.fromNullable('Unable to find Sanity API token')(process.env.SANITY_API_TOKEN)
export const getDevEnvironment: GetProcessEnvType = () => E.fromNullable('Unable to find environment')('dev')
export const getSanityDevDataset: GetProcessEnvType = () =>
  E.fromNullable('Unable to find Sanity dataset')('global-development')
