import { SearchBox as InstantSearchBox } from 'react-instantsearch-dom'

const SearchBox = () => {
  return (
    <InstantSearchBox
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={false}
      translations={{ placeholder: '' }}
    />
  )
}

export default SearchBox
