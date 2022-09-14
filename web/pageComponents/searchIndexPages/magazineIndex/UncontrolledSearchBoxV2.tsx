/*
 The original uncontrolled version of the search box. Currently not in use
 */
import { SearchBoxContextProvider } from './SearchBoxContext'
import Box from '../../shared/Box'
import { SearchBoxAndAlgoliaSync } from './SearchBoxAndAlgoliaSync'

const UncontrolledSearchBox = () => {
  return (
    <SearchBoxContextProvider>
      <Box />
      <SearchBoxAndAlgoliaSync />
    </SearchBoxContextProvider>
  )
}

export default UncontrolledSearchBox
