'use client'
import { useTranslations } from 'next-intl'
import { type UsePaginationProps, usePagination } from 'react-instantsearch'

type TotalResultsStatProps = {
  hitsPerPage: number
} & UsePaginationProps

const TotalResultsStat = ({
  totalPages,
  hitsPerPage,
}: TotalResultsStatProps) => {
  const { nbHits, currentRefinement } = usePagination({ totalPages })
  const t = useTranslations()
  if (nbHits === 0) return null
  const currentLowestNumber = currentRefinement * hitsPerPage + 1
  const potentialHighestNumber = currentRefinement * hitsPerPage + 5
  const currentHighestNumber = Math.min(potentialHighestNumber, nbHits)

  return (
    <div className='my-3 mt-5 dark:text-white-100'>
      {t('search_showing_results_number', {
        nbHits: nbHits,
        currentlyShowing: `${currentLowestNumber} - ${currentHighestNumber}`,
      })}
    </div>
  )
}

export default TotalResultsStat
