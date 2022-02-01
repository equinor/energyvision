import { connectStateResults } from 'react-instantsearch-dom'

const Stats = connectStateResults(({ searchResults }) => {
  if (searchResults === null || searchResults.nbHits === 0) {
    return (
      <div>
        <span>Event</span>
        <span>(0)</span>
      </div>
    )
  }
  // Empty list
  if (searchResults.query === '') {
    return null
  }

  return (
    <div>
      <span>Event</span>
      <span>({searchResults.nbHits})</span>
    </div>
  )
})

export default Stats
