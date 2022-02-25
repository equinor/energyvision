import { usePagination, UsePaginationProps } from 'react-instantsearch-hooks'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

const Container = styled.div`
  margin-top: var(--space-medium);
  color: var(--slate-blue-70);
`

type TotalResultsStatProps = {
  hitsPerPage: number
} & UsePaginationProps

const TotalResultsStat = ({ totalPages, hitsPerPage }: TotalResultsStatProps) => {
  const { nbHits, currentRefinement } = usePagination({ totalPages })
  const currentLowestNumber = currentRefinement * hitsPerPage + 1
  const potentialHighestNumber = currentRefinement * hitsPerPage + 5
  const currentHighestNumber = Math.min(potentialHighestNumber, nbHits)

  const defaultMessage = '{currentlyShowing} of {nbHits} results'
  return (
    <Container>
      <FormattedMessage
        id="search_showing_results_number"
        defaultMessage={defaultMessage}
        values={{
          nbHits: nbHits,
          currentlyShowing: `${currentLowestNumber} - ${currentHighestNumber}`,
        }}
      />
    </Container>
  )
}

export default TotalResultsStat
