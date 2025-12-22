import * as E from 'fp-ts/lib/Either'
import { GetProcessEnvType } from './types'
import { configDotenv, DotenvPopulateInput, populate } from 'dotenv'
import { DefaultAzureCredential } from '@azure/identity'
import { load } from '@azure/app-configuration-provider'
import { Logger } from '@azure/functions'

export const loadEnv = async (logger: Logger) => {
  configDotenv()
  const connectionString = process.env.AZURE_APP_CONFIG_CONNECTION_STRING
  if (!connectionString) {
    logger.error('App config connection string not provided ')
    return
  }
  const credential = new DefaultAzureCredential()
  let settings
  try { 
  settings = await load(
    connectionString, // Or endpoint and credential
    {
      keyVaultOptions: {
        credential: credential, // Provide credential for Key Vault access
      },
    },
  )
 const parsed = {
    SANITY_DATASET: settings.get('SANITY_DATASET'),
    ALGOLIA_API_KEY: settings.get('ALGOLIA_API_KEY'),
    ALGOLIA_APP_ID: settings.get('ALGOLIA_APP_ID'),
    CONTAINER: settings.get('CONTAINER'),
    ENV: settings.get('ENV'),
    SANITY_API_TOKEN: settings.get('SANITY_API_TOKEN'),
    SANITY_PROJECT_ID: settings.get('SANITY_PROJECT_ID'),
    STORAGE_ACCOUNT: settings.get('STORAGE_ACCOUNT'),
    AZ_CONNECTION_STRING: settings.get('AZ_CONNECTION_STRING'),
  } as DotenvPopulateInput
  populate(process.env as DotenvPopulateInput, parsed)
}
  catch(err){
    console.log("Error loading app config", err)
  }

 
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
