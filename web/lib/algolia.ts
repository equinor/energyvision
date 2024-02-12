import algoliasearch, { AlgoliaSearchOptions } from 'algoliasearch/lite'
import { algolia } from './config'
import { createInMemoryCache } from '@algolia/cache-in-memory'
import { createFallbackableCache } from '@algolia/cache-common'
import { createBrowserLocalStorageCache } from '@algolia/cache-browser-local-storage'

export const searchClient = (options?: AlgoliaSearchOptions) =>
  algoliasearch(algolia.applicationId, algolia.searchApiKey, {
    ...options,
    responsesCache: createFallbackableCache({
      caches: [
        createBrowserLocalStorageCache({
          key: `algolia-responses-${algolia.applicationId}`,
          timeToLive: 600, // 10 minutes cache
        }),
        createInMemoryCache(),
      ],
    }),
  })
