import { useHits } from 'react-instantsearch-hooks'

const Stats = () => {
  const { results } = useHits()

  return <span>({results?.nbHits || 0})</span>
}

export default Stats
