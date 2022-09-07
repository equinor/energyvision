import { InstantSearch, Configure } from 'react-instantsearch-hooks-web'
import { searchClient } from '../../lib/algolia'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { Flags } from '../../common/helpers/datasetHelpers'

import { SearchBox } from './SearchBoxV2'
import { getIsoFromLocale } from '../../lib/localization'
import * as React from 'react'
import { useReducer } from 'react'

const SearchResults = dynamic(() => import('./SearchResultsV2'))
export type DispatchContextInterface = {
  query: any
  dispatch: React.Dispatch<React.SetStateAction<any>>
}
export const QueryDispatch = React.createContext<DispatchContextInterface | null>(null)

const Search = () => {
  const router = useRouter()

  const [query, dispatch] = useReducer((queryParams: any, action: any) => {
    const urlParts = router.asPath.split('?')[0]
    const query = action.state.query
    const tab = action.state.tab
    if (!query && tab) {
      router.replace(
        {
          pathname: urlParts,
          query: {
            ...router.query,
            tab: tab,
          },
        },
        {
          pathname: urlParts,
          query: {
            ...router.query,
            tab: tab,
          },
        },
        {
          shallow: true,
        },
      )
    }
    if (query && !tab)
      router.replace(
        {
          pathname: urlParts,
          query: {
            ...router.query,
            query: action.state.query,
          },
        },
        {
          pathname: urlParts,
          query: {
            ...router.query,
            query: action.state.query,
          },
        },
        {
          shallow: true,
        },
      )
    return queryParams
  }, router.query)

  // @TODO: Don't hard code it like this
  if (searchClient.appId === '') {
    console.warn('Missing app ID in Algolia search client')
    return null
  }

  const envPrefix = Flags.IS_GLOBAL_PROD ? 'prod' : 'dev'
  const isoCode = getIsoFromLocale(router.locale)

  // Don't know if this is 100% correct
  //const url = router.asPath

  // The main index will be "all" at some point
  const mainIndex = `${envPrefix}_TOPICS_${isoCode}`
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={mainIndex}
      /*  routing={{
        // @TODO If this is enabled, the app will freeze with browser back
        router: history({
          getLocation() {
            if (typeof window === 'undefined') {
              return new URL(url!) as unknown as Location
            }

            return window.location
          },
        }),

        stateMapping: {
          // eslint-disable-next-line
          // @ts-ignore: @TODO: The types are not correct
          stateToRoute(uiState) {
            const indexUiState = uiState[mainIndex]
            return {
              query: indexUiState.query,
              tab: activeTabIndex,
            }
          },
          // eslint-disable-next-line
          // @ts-ignore: @TODO: The types are not correct
          routeToState(routeState) {
            return {
              [mainIndex]: {
                query: routeState.query,
                tab: activeTabIndex,
              },
            }
          },
        },
      }} */
    >
      <Configure hitsPerPage={5} snippetEllipsisText="..." />
      <QueryDispatch.Provider value={{ query, dispatch }}>
        <SearchBox />
        <SearchResults />
      </QueryDispatch.Provider>
    </InstantSearch>
  )
}

export default Search
