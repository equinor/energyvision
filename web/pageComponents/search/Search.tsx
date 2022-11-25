import { InstantSearch, Configure } from 'react-instantsearch-hooks-web'
import { searchClient } from '../../lib/algolia'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { Flags } from '../../common/helpers/datasetHelpers'

import { SearchBox } from './SearchBox'
import { getIsoFromLocale } from '../../lib/localization'
import { SearchContextProvider } from './SearchContext'

const SearchResults = dynamic(() => import('./SearchResults'))

const Search = () => {
  const router = useRouter()

  // @TODO: Don't hard code it like this
  if (searchClient.appId === '') {
    console.warn('Missing app ID in Algolia search client')
    return null
  }

  const envPrefix = Flags.IS_GLOBAL_PROD ? 'prod' : 'dev'
  const isoCode = getIsoFromLocale(router.locale)

  // The main index will be "all" at some point
  const mainIndex = `${envPrefix}_TOPICS_${isoCode}`

  return (
    <InstantSearch searchClient={searchClient} indexName={mainIndex}>
      <Configure hitsPerPage={5} snippetEllipsisText="..." />
      <SearchContextProvider>
        <SearchBox />
        <SearchResults />
      </SearchContextProvider>
    </InstantSearch>
  )
}

export default Search
