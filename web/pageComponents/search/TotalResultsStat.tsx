import { usePagination, UsePaginationProps } from 'react-instantsearch'
import { FormattedMessage } from 'react-intl'

type TotalResultsStatProps = {
  hitsPerPage: number
} & UsePaginationProps

const TotalResultsStat = ({ totalPages, hitsPerPage }: TotalResultsStatProps) => {
  const { nbHits, currentRefinement } = usePagination({ totalPages })
  if (nbHits === 0) return null
  const currentLowestNumber = currentRefinement * hitsPerPage + 1
  const potentialHighestNumber = currentRefinement * hitsPerPage + 5
  const currentHighestNumber = Math.min(potentialHighestNumber, nbHits)

  const defaultMessage = '{currentlyShowing} of {nbHits} results'
  return (
    <div className="mt-5 text-slate-blue-70">
      <FormattedMessage
        id="search_showing_results_number"
        defaultMessage={defaultMessage}
        values={{
          nbHits: nbHits,
          currentlyShowing: `${currentLowestNumber} - ${currentHighestNumber}`,
        }}
      />
    </div>
  )
}

export default TotalResultsStat
