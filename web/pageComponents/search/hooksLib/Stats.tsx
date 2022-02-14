import { useHits } from 'react-instantsearch-hooks'

const Stats = () => {
  const { results } = useHits()
  const noQuery = !results || results.query === ''
  if (noQuery) return null
  return <span>({results?.nbHits})</span>
}

export default Stats
