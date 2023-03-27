import { Dispatch, SetStateAction, useEffect } from 'react'
import { useHits } from 'react-instantsearch-hooks-web'
import styled from 'styled-components'

const HitsContainer = styled.span`
  margin-left: var(--space-4);
`
type NumberOfHitsProps = {
  setTabResults: Dispatch<SetStateAction<Record<string, boolean>>>
  category: string
}
const Stats = ({ setTabResults, category }: NumberOfHitsProps) => {
  const { results } = useHits()

  useEffect(() => {
    setTabResults((prev) => ({
      ...prev,
      [category]: results ? results.nbHits > 0 : false,
    }))
  }, [setTabResults, category, results])

  const noQuery = !results || results.query === ''
  if (noQuery) return null
  return <HitsContainer>({results?.nbHits})</HitsContainer>
}

export default Stats
