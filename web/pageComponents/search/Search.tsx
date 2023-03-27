import { InstantSearch, Configure } from 'react-instantsearch-hooks-web'
import { searchClient } from '../../lib/algolia'
import dynamic from 'next/dynamic'
import { Flags } from '../../common/helpers/datasetHelpers'
import { SearchBox } from './SearchBox'
import { getIsoFromLocale } from '../../lib/localization'
import { SearchContextProvider } from './SearchContext'
import { createInstantSearchRouterNext } from 'react-instantsearch-hooks-router-nextjs'
import singletonRouter from 'next/router'
import type { UiState } from 'instantsearch.js'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import styled from 'styled-components'
import { Pagination } from '../shared/search/pagination/Pagination'
import usePaginationPadding from '../../lib/hooks/usePaginationPadding'
import { PaginationContextProvider } from '../../pageComponents/shared/search/pagination/PaginationContext'

const SearchResults = dynamic(() => import('./SearchResults'))

const StyledPagination = styled(Pagination)`
  margin-top: var(--space-xLarge);
  justify-content: center;
`

const Search = () => {
  const router = useRouter()
  const padding = usePaginationPadding()
  const resultsRef = useRef<HTMLDivElement>(null)

  // @TODO: Don't hard code it like this
  if (searchClient.appId === '') {
    console.warn('Missing app ID in Algolia search client')
    return null
  }

  const envPrefix = Flags.IS_GLOBAL_PROD ? 'prod' : 'dev'
  const isoCode = getIsoFromLocale(router.locale)

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
    return `/search${queryString}`
  }

  // eslint-disable-next-line
  // @ts-ignore: @TODO: The types are not correct
  const parseURL = ({ qsModule, location }) => {
    const { query = '', page, tab = '' }: any = qsModule.parse(location.search.slice(1))
    return {
      query: query,
      page: page,
      tab: query ? tab : '',
    }
  }

  const routing = {
    router: createInstantSearchRouterNext({
      singletonRouter,
      routerOptions: {
        createURL: createURL,
        parseURL: parseURL,
      },
    }),
    stateMapping: {
      stateToRoute(uiState: UiState) {
        const indexUiState = uiState[mainIndex]
        return {
          tab: indexUiState.sortBy
            ? indexUiState.sortBy.replaceAll(isoCode, '').replaceAll(envPrefix, '').replaceAll('_', '').toLowerCase()
            : 'topics',
          query: indexUiState?.query,
          page: indexUiState?.page,
        }
      },
      routeToState(routeState: any) {
        return {
          [mainIndex]: {
            query: routeState.query,
            page: routeState.page,
            sortBy: `${envPrefix}_${(routeState.tab || 'topics').toUpperCase()}_${isoCode}`,
          },
        }
      },
    },
  }

  return (
    <InstantSearch searchClient={searchClient} indexName={mainIndex} routing={routing}>
      <Configure hitsPerPage={5} snippetEllipsisText="..." />
      <SearchContextProvider>
        <SearchBox />
        <SearchResults
          locale={router.locale}
          resultsRef={resultsRef}
          items={[
            { value: `${envPrefix}_TOPICS_${isoCode}`, label: 'Topics' },
            { value: `${envPrefix}_EVENTS_${isoCode}`, label: 'Events' },
            { value: `${envPrefix}_NEWS_${isoCode}`, label: 'News' },
            { value: `${envPrefix}_MAGAZINE_${isoCode}`, label: 'Magazine' },
          ]}
        />
      </SearchContextProvider>
      <PaginationContextProvider defaultRef={resultsRef}>
        <StyledPagination padding={padding} hitsPerPage={5} inverted />
      </PaginationContextProvider>
    </InstantSearch>
  )
}

export default Search
