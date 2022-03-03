import { InstantSearch, Configure } from 'react-instantsearch-hooks'
import { searchClient } from '../../lib/algolia'
import { useRouter } from 'next/router'
//import { history } from 'instantsearch.js/es/lib/routers/index.js'
import { isGlobalProduction } from '../../common/helpers/datasetHelpers'

import SearchBox from './SearchBox'
import SearchResults from './SearchResults'
import { getIsoFromLocale } from '../../lib/localization'

type SearchProps = {
  setIsOpen: (arg0: boolean) => void
}

const Search = ({ setIsOpen }: SearchProps) => {
  const router = useRouter()
  // @TODO: Don't hard code it like this
  if (searchClient.appId === '') {
    console.warn('You need to add an app id for Algolia search')
    return null
  }

  const envPrefix = isGlobalProduction ? 'prod' : 'dev'
  const isoCode = getIsoFromLocale(router.locale)

  // The main index will be "all" at some point
  const mainIndex = `${envPrefix}_TOPICS_${isoCode}`
  const url = router.asPath

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={mainIndex}
      /* routing={{
        router: history({
          getLocation() {
            if (typeof window === 'undefined') {
              return new URL(url!) as unknown as Location
            }

            return window.location
          },
        }),

        stateMapping: {
          stateToRoute(uiState) {
            const indexUiState = uiState[mainIndex]
            return {
              q: indexUiState.query,
            }
          },
          routeToState(routeState) {
            return {
              [mainIndex]: {
                query: routeState.q,
              },
            }
          },
        },
      }} */
    >
      <Configure hitsPerPage={5} snippetEllipsisText="..." />
      <SearchBox />
      <SearchResults setIsOpen={setIsOpen} />
    </InstantSearch>
  )
}

export default Search
