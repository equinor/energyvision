import { InstantSearch, Configure, Index } from 'react-instantsearch-hooks-web'
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
import EmptyQueryBoundary from './EmptyQueryBoundary'
import { useIntl } from 'react-intl'

const SearchResults = dynamic(() => import('./SearchResults'))

const StyledPagination = styled(Pagination)`
  margin-top: var(--space-xLarge);
  justify-content: center;
`
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
    return `/search${queryString}`
  }

  // eslint-disable-next-line
  // @ts-ignore: @TODO: The types are not correct
  const parseURL = ({ qsModule, location }) => {
    const { query = '', page, tab = '' }: any = qsModule.parse(location.search.slice(1))
    return {
      query: query,
      page: page as number,
      tab: tab,
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
            : undefined,
          query: indexUiState?.query,
          page: indexUiState?.page,
        }
      },
      routeToState(routeState: any) {
        return {
          [mainIndex]: {
            query: routeState.query,
            page: routeState.page as number,
            sortBy: routeState.tab ? `${envPrefix}_${routeState.tab.toUpperCase()}_${isoCode}` : undefined,
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
        {indices.map((index) => (
          <Index indexName={index.value} indexId={index.value} key={index.label} />
        ))}
        <EmptyQueryBoundary fallback={null}>
          <SearchResults resultsRef={resultsRef} items={indices} />
          <PaginationContextProvider defaultRef={resultsRef}>
            <StyledPagination padding={padding} hitsPerPage={5} inverted />
          </PaginationContextProvider>
        </EmptyQueryBoundary>
      </SearchContextProvider>
    </InstantSearch>
  )
}

export default Search
