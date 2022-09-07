import { useHits } from 'react-instantsearch-hooks-web'
import styled from 'styled-components'

const HitsContainer = styled.span`
  margin-left: var(--space-4);
`

export type NumberOfHitsProps = {
  index: string
  onHitsChanged: any
}

const Stats = (props: NumberOfHitsProps) => {
  const { results } = useHits()
  const noQuery = !results || results.query === ''
  const { onHitsChanged, index } = props
  if (noQuery) return null
  onHitsChanged(results?.nbHits > 0, index)
  return <HitsContainer>({results?.nbHits})</HitsContainer>
}

export default Stats
