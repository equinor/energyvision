'use client'
import { history } from 'instantsearch.js/es/lib/routers'
import type { SearchClient, UiState } from 'instantsearch.js'
import { useLocale, useTranslations } from 'next-intl'
import { useRef } from 'react'
import { Configure, Index, InstantSearch } from 'react-instantsearch'
import { PaginationContextProvider } from '@/contexts/PaginationContext'
import { SearchBox } from '@/core/AlgoliaSearchBox/SearchBox'
import usePaginationPadding from '@/lib/hooks/usePaginationPadding'
import { Pagination } from '@/sections/searchBlocks/pagination/Pagination'
import SearchResults from '@/sections/searchBlocks/SearchResults'
import { searchClient as client } from '../../lib/algolia'

type SearchRouteState = {
  query?: string
  page?: number
  tab?: 'topics' | 'events' | 'news' | 'magazine'
}

const searchClient = client()
const queriedSearchClient: SearchClient = {
  ...searchClient,
  search(requests: any) {
    if (requests.every(({ params }: any) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
          hitsPerPage: 0,
          exhaustiveNbHits: false,
          query: '',
          params: '',
        })),
      })
    }

    return searchClient.search(requests)
  },
}
export function Search() {
  const intl = useTranslations()
  const locale = useLocale()
  const resultsRef = useRef<HTMLDivElement>(null)
  const envPrefix =
    process.env.NEXT_PUBLIC_SANITY_DATASET === 'global' ? 'prod' : 'dev'

  const padding = usePaginationPadding()
  const indices = [
    {
      value: `${envPrefix}_TOPICS_${locale}`,
      label: intl('search_topics_tab'),
    },
    {
      value: `${envPrefix}_EVENTS_${locale}`,
      label: intl('search_events_tab'),
    },
    {
      value: `${envPrefix}_NEWS_${locale}`,
      label: intl('search_news_tab'),
    },
    {
      value: `${envPrefix}_MAGAZINE_${locale}`,
      label: intl('search_magazine_tab'),
    },
  ]

  // The main index will be "all" at some point
  const mainIndex = `${envPrefix}_TOPICS_${locale}`

  const routing = {
    router: history<SearchRouteState>({ cleanUrlOnDispose: false }),
    stateMapping: {
      stateToRoute(uiState: UiState): SearchRouteState {
        const indexUiState = uiState[mainIndex]
        const tab = indexUiState.sortBy
          ?.replaceAll(locale, '')
          .replaceAll(envPrefix, '')
          .replaceAll('_', '')
          .toLowerCase() as SearchRouteState['tab']

        return {
          ...(tab && { tab }),
          ...(indexUiState?.query && { query: indexUiState.query }),
          ...(indexUiState?.page && { page: indexUiState.page }),
        }
      },
      routeToState(routeState: SearchRouteState): UiState {
        return {
          [mainIndex]: {
            ...(routeState.query && { query: routeState.query }),
            ...(routeState.page && { page: routeState.page }),
            ...(routeState.tab && {
              sortBy: `${envPrefix}_${routeState.tab.toUpperCase()}_${locale}`,
            }),
          },
        }
      },
    },
  }

  return (
    <InstantSearch<UiState, SearchRouteState>
      indexName={mainIndex}
      searchClient={queriedSearchClient}
      routing={routing}
    >
      <Configure hitsPerPage={5} snippetEllipsisText='...' />
      {indices.map(index => (
        <Index
          indexName={index.value}
          key={index.label}
          indexId={index.value}
        />
      ))}
      <div className='mx-auto p-8 px-layout-sm lg:px-layout-lg'>
        <h1 className='sr-only'>{intl('search_page_title')}</h1>

        <div className='max-w-[700px]'>
          <SearchBox variant='inverted' />
        </div>
        <SearchResults resultsRef={resultsRef} items={indices} />
        <PaginationContextProvider defaultRef={resultsRef}>
          <Pagination
            className='mt-12 justify-center'
            padding={padding}
            hitsPerPage={5}
          />
        </PaginationContextProvider>
      </div>
    </InstantSearch>
  )
}
