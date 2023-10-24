import { InstantSearch, Configure, Index } from 'react-instantsearch-hooks-web'
import { searchClient as client } from '../../lib/algolia'
import dynamic from 'next/dynamic'
import { Flags } from '../../common/helpers/datasetHelpers'
import { SearchBox } from './SearchBox'
import { getIsoFromLocale } from '../../lib/localization'
import { SearchContextProvider } from './SearchContext'
import { createInstantSearchRouterNext } from 'react-instantsearch-hooks-router-nextjs'
import singletonRouter, { useRouter } from 'next/router'
import type { UiState } from 'instantsearch.js'
import { useRef } from 'react'
import styled from 'styled-components'
import { Pagination } from '../shared/search/pagination/Pagination'
import usePaginationPadding from '../../lib/hooks/usePaginationPadding'
import { PaginationContextProvider } from '../../pageComponents/shared/search/pagination/PaginationContext'
import { useIntl } from 'react-intl'
import { SearchClient } from 'algoliasearch/lite'

const SearchResults = dynamic(() => import('./SearchResults'))

const StyledPagination = styled(Pagination)`
  margin-top: var(--space-xLarge);
  justify-content: center;
`
const searchClient = client
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

const Search = () => {
  const router = useRouter()
  const intl = useIntl()
  const padding = usePaginationPadding()
  const resultsRef = useRef<HTMLDivElement>(null)

  // @TODO: Don't hard code it like this
  if (searchClient.appId === '') {
    console.warn('Missing app ID in Algolia search client')
    return null
  }

  const envPrefix = Flags.IS_GLOBAL_PROD ? 'prod' : 'dev'
  const isoCode = getIsoFromLocale(router.locale)
  const indices = [
    {
      value: `${envPrefix}_TOPICS_${isoCode}`,
      label: intl.formatMessage({ id: 'search_topics_tab', defaultMessage: 'Topics' }),
    },
    {
      value: `${envPrefix}_EVENTS_${isoCode}`,
      label: intl.formatMessage({ id: 'search_events_tab', defaultMessage: 'Events' }),
    },
    {
      value: `${envPrefix}_NEWS_${isoCode}`,
      label: intl.formatMessage({ id: 'search_news_tab', defaultMessage: 'News' }),
    },
    {
      value: `${envPrefix}_MAGAZINE_${isoCode}`,
      label: intl.formatMessage({ id: 'search_magazine_tab', defaultMessage: 'Magazine' }),
    },
  ]

  // The main index will be "all" at some point
  const mainIndex = `${envPrefix}_TOPICS_${isoCode}`

  // eslint-disable-next-line
  // @ts-ignore: @TODO: The types are not correct
  const createURL = ({ qsModule, routeState, location }) => {
    const queryParameters: any = {}
    if (routeState.query) {
      queryParameters.query = routeState.query
    }
    if (routeState.page !== 1) {
      queryParameters.page = routeState.page
    }
    if (routeState.tab) {
      queryParameters.tab = routeState.tab
    }

    const queryString = qsModule.stringify(queryParameters, {
      addQueryPrefix: true,
      arrayFormat: 'repeat',
      format: 'RFC1738',
    })
    return `${location.pathname}${queryString}`
  }

  // eslint-disable-next-line
  // @ts-ignore: @TODO: The types are not correct
  const parseURL = ({ qsModule, location }) => {
    const { query = '', page, tab = '' }: any = qsModule.parse(location.search.slice(1))
    return {
      ...(query && { query: query }),
      ...(page && { page: page as number }),
      ...(tab && { tab: tab }),
    }
  }

  const routing = {
    router: createInstantSearchRouterNext({
      singletonRouter,
      routerOptions: {
        createURL: createURL,
        parseURL: parseURL,
        push(url) {
          if (url.split('?')[1]) {
            // replace url only if it has query params
            singletonRouter.replace(url)
          }
        },
      },
    }),
    stateMapping: {
      stateToRoute(uiState: UiState) {
        const indexUiState = uiState[mainIndex]
        return {
          ...(indexUiState.sortBy && {
            tab: indexUiState.sortBy
              .replaceAll(isoCode, '')
              .replaceAll(envPrefix, '')
              .replaceAll('_', '')
              .toLowerCase(),
          }),
          ...(indexUiState?.query && { query: indexUiState.query }),
          ...(indexUiState?.page && { page: indexUiState?.page }),
        }
      },
      routeToState(routeState: any) {
        return {
          [mainIndex]: {
            ...(routeState.query && { query: routeState.query }),
            ...(routeState.page && { page: routeState.page as number }),
            ...(routeState.tab && { sortBy: `${envPrefix}_${routeState.tab.toUpperCase()}_${isoCode}` }),
          },
        }
      },
    },
  }

  return (
    <InstantSearch searchClient={queriedSearchClient} indexName={mainIndex} routing={routing}>
      <Configure hitsPerPage={5} snippetEllipsisText="..." />
      {indices.map((index) => (
        <Index indexName={index.value} key={index.label} indexId={index.value} />
      ))}

      <SearchContextProvider>
        <SearchBox />
        <SearchResults resultsRef={resultsRef} items={indices} />
        <PaginationContextProvider defaultRef={resultsRef}>
          <StyledPagination padding={padding} hitsPerPage={5} inverted />
        </PaginationContextProvider>
      </SearchContextProvider>
    </InstantSearch>
  )
}

export default Search
