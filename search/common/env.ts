import * as E from 'fp-ts/lib/Either'
import { GetProcessEnvType } from './types'

export const getAlgoliaAppId: GetProcessEnvType = () => E.fromNullable('Unable to find app id')(process.env.ALGOLIA_APP_ID)
export const getAlgoliaApiKey: GetProcessEnvType = () => E.fromNullable('Unable to find API key')(process.env.ALGOLIA_API_KEY)
export const getEnvironment: GetProcessEnvType = () => {
  console.log('Should not run early')
  return E.fromNullable('Unable to find environment')(process.env.ENV)
}
