import { useHits } from 'react-instantsearch-hooks'

const Stats = () => {
  const { hits } = useHits()

  return <span>({hits.length || 0})</span>
}

export default Stats
