import { InstantSearch, Configure } from 'react-instantsearch-hooks'
import { searchClient } from '../../lib/algolia'
import { useRouter } from 'next/router'
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

  return (
    <InstantSearch searchClient={searchClient} indexName={mainIndex}>
      <Configure hitsPerPage={5} snippetEllipsisText="..." />

      <SearchBox />
      <SearchResults setIsOpen={setIsOpen} />
    </InstantSearch>
  )
}

export default Search
