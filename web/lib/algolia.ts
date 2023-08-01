import algoliasearch from 'algoliasearch/lite'
import { algolia } from './config'

export const searchClient = algoliasearch(algolia.applicationId, algolia.searchApiKey)
