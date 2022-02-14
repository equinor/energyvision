import { useHits } from 'react-instantsearch-hooks'

const Stats = () => {
  const { hits } = useHits()
  // @TODO: Figure out how to find the number of hits,
  // this number is maximum the number of hits per page from the <Configure />
  return <span>({hits.length || 0})</span>
}

export default Stats
