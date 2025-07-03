'use client'
import { useTranslations } from 'next-intl'
import { usePagination, UsePaginationProps } from 'react-instantsearch'

type TotalResultsStatProps = {
  hitsPerPage: number
} & UsePaginationProps

const TotalResultsStat = ({ totalPages, hitsPerPage }: TotalResultsStatProps) => {
  const { nbHits, currentRefinement } = usePagination({ totalPages })
  if (nbHits === 0) return null
  const currentLowestNumber = currentRefinement * hitsPerPage + 1
  const potentialHighestNumber = currentRefinement * hitsPerPage + 5
  const currentHighestNumber = Math.min(potentialHighestNumber, nbHits)

  const t = useTranslations()

  return (
    <div className="mt-5">
      {t('search_showing_results_number', {
        nbHits: nbHits,
        currentlyShowing: `${currentLowestNumber} - ${currentHighestNumber}`,
      })}
    </div>
  )
}

export default TotalResultsStat
