import { createBrowserLocalStorageCache } from '@algolia/cache-browser-local-storage'
import { createFallbackableCache } from '@algolia/cache-common'
import { createInMemoryCache } from '@algolia/cache-in-memory'
import { liteClient } from 'algoliasearch/lite'
import type { SearchOptions } from 'instantsearch.js'
import { algolia } from './config'

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
