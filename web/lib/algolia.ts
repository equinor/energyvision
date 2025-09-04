import { liteClient } from 'algoliasearch/lite'
import { algolia } from './config'
import { createInMemoryCache } from '@algolia/cache-in-memory'
import { createFallbackableCache, createNullCache } from '@algolia/cache-common'
import { createBrowserLocalStorageCache } from '@algolia/cache-browser-local-storage'
import { SearchOptions } from 'instantsearch.js'

export const searchClient = (options?: SearchOptions) =>
  liteClient(algolia.applicationId, algolia.searchApiKey, {
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

export const testSearchClient = () =>
  liteClient(algolia.applicationId, algolia.searchApiKey, {
    // Disable caching for completed requests
    responsesCache: createNullCache(),
    // Disable caching for in-flight requests
    requestsCache: createNullCache(),
  })
