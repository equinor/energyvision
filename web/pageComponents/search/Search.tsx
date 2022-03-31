import { InstantSearch, Configure } from 'react-instantsearch-hooks'
import { searchClient } from '../../lib/algolia'
import { useRouter } from 'next/router'
//import { history } from 'instantsearch.js/es/lib/routers/index.js'
import { isGlobalProduction } from '../../common/helpers/datasetHelpers'

import { SearchBox } from './SearchBox'
import SearchResults from './SearchResults'
import { getIsoFromLocale } from '../../lib/localization'

const Search = () => {
  const router = useRouter()

  // @TODO: Don't hard code it like this
  if (searchClient.appId === '') {
    console.warn('You need to add an app id for Algolia search')
    return null
  }

  const envPrefix = isGlobalProduction ? 'prod' : 'dev'
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
      <SearchBox />
      <SearchResults />
    </InstantSearch>
  )
}

export default Search
