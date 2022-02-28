import { useHits } from 'react-instantsearch-hooks'
import styled from 'styled-components'

const HitsContainer = styled.span`
  margin-left: var(--space-4);
`

const Stats = () => {
  const { results } = useHits()
  const noQuery = !results || results.query === ''
  if (noQuery) return null
  return <HitsContainer>({results?.nbHits})</HitsContainer>
}

export default Stats
