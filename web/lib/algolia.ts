import algoliasearch, { AlgoliaSearchOptions } from 'algoliasearch/lite'
import { algolia } from './config'

export const searchClient = (options: AlgoliaSearchOptions | undefined) =>
  algoliasearch(algolia.applicationId, algolia.searchApiKey, options)
