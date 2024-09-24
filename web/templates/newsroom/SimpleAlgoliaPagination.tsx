import { useContext, useEffect, useRef } from 'react'
import { usePagination, UsePaginationProps } from 'react-instantsearch'
import { usePrefersReducedMotion } from '../../common/hooks/usePrefersReducedMotion'

import envisTwMerge from '../../twMerge'
import { useIntl } from 'react-intl'
import { MediaButton } from '@core/MediaButton/MediaButton'
import { isModifierClick } from '../../pageComponents/shared/search/pagination/PaginationItem'
import { PaginationContext } from 'common/contexts/PaginationContext'

// Based on: https://github.com/algolia/react-instantsearch/blob/master/examples/hooks/components/Pagination.tsx
export type SimpleAlgoliaPaginationProps = {
  hitsPerPage?: number
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & UsePaginationProps

export const SimpleAlgoliaPagination = ({
  className = '',
  totalPages,
  padding,
  hitsPerPage = 5,
  ...rest
}: SimpleAlgoliaPaginationProps) => {
  const { refine, currentRefinement, isFirstPage, isLastPage, nbHits } = usePagination({
    totalPages,
    padding,
  })
  const intl = useIntl()
  const { resultsRef } = useContext(PaginationContext)
  const prevRefinement = useRef<number>(currentRefinement)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (!prefersReducedMotion && resultsRef?.current && currentRefinement !== prevRefinement.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [currentRefinement, prefersReducedMotion, resultsRef])

  useEffect(() => {
    prevRefinement.current = currentRefinement
  }, [currentRefinement])

  if (!nbHits || nbHits === 0 || nbHits <= hitsPerPage) {
    return null
  }

  return (
    <ul className={envisTwMerge(`max-w-viewport flex flex-wrap gap-2 my-2`, className)} {...rest}>
      <li>
        <MediaButton
          title={intl.formatMessage({
            id: 'previous',
            defaultMessage: 'Previous',
          })}
          mode="previous"
          disabled={isFirstPage}
          onClick={(event) => {
            if (isModifierClick(event)) {
              return
            }

            event.preventDefault()
            refine(currentRefinement - 1)
          }}
          className=""
          //? createURL={createURL}
        />
      </li>
      <li>
        <MediaButton
          title={intl.formatMessage({
            id: 'next',
            defaultMessage: 'Next',
          })}
          mode="previous"
          disabled={isLastPage}
          onClick={(event) => {
            if (isModifierClick(event)) {
              return
            }

            event.preventDefault()
            refine(currentRefinement + 1)
          }}
          className=""
          //? createURL={createURL}
        />
      </li>
    </ul>
  )
}
