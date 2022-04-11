import * as E from 'fp-ts/lib/Either'
import { GetProcessEnvType } from './types'

export const getAzureConnectionString: GetProcessEnvType = () =>
  E.fromNullable('Unable to find Azure connection string')(process.env.AZ_CONNECTION_STRING)
// TODO: Should this be in the env? Perhaps to generic.
export const getContainerName: GetProcessEnvType = () =>
  E.fromNullable('Unable to find container name')(process.env.CONTAINER_NAME)
export const getAlgoliaAppId: GetProcessEnvType = () =>
  E.fromNullable('Unable to find app id')(process.env.ALGOLIA_APP_ID)
export const getAlgoliaApiKey: GetProcessEnvType = () =>
  E.fromNullable('Unable to find API key')(process.env.ALGOLIA_API_KEY)
export const getEnvironment: GetProcessEnvType = () => E.fromNullable('Unable to find environment')(process.env.ENV)
