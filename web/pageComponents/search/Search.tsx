import { InstantSearch, Configure } from 'react-instantsearch-hooks-web'
import { searchClient } from '../../lib/algolia'
import { useRouter } from 'next/router'
//import { history } from 'instantsearch.js/es/lib/routers/index.js'
import dynamic from 'next/dynamic'
import { Flags } from '../../common/helpers/datasetHelpers'

import { SearchBox } from './SearchBox'
import { SearchBox as SearchBoxV3 } from './SearchBoxV3'
//import SearchResults from './SearchResults'
import { getIsoFromLocale } from '../../lib/localization'
import { SearchContextProvider } from './SearchContext'

const SearchResults = dynamic(() => import('./SearchResults'))
const SearchResultsV3 = dynamic(() => import('./SearchResultsV3'))
const Search = () => {
  const router = useRouter()

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
      {Flags.IS_DEV ? (
        <SearchContextProvider>
          <SearchBoxV3 />
          <SearchResultsV3 />
        </SearchContextProvider>
      ) : (
        <>
          <SearchBox />
          <SearchResults />
        </>
      )}
    </InstantSearch>
  )
}

export default Search
