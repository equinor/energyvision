import { Icon } from '@equinor/eds-core-react'
import { chevron_left, chevron_right, first_page, last_page } from '@equinor/eds-icons'
import { useContext, useEffect, useRef } from 'react'
import { usePagination, UsePaginationProps } from 'react-instantsearch'
import { usePrefersReducedMotion } from '../../../../common/hooks/usePrefersReducedMotion'
import { PaginationContext } from '../../../../common/contexts/PaginationContext'
import { PaginationItem } from './PaginationItem'
import envisTwMerge from '../../../../twMerge'
import { useIntl } from 'react-intl'

// Based on: https://github.com/algolia/react-instantsearch/blob/master/examples/hooks/components/Pagination.tsx
export type PaginationProps = {
  hitsPerPage?: number
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & UsePaginationProps

export const Pagination = ({ className = '', totalPages, padding, hitsPerPage = 5, ...rest }: PaginationProps) => {
  const { refine, createURL, pages, currentRefinement, isFirstPage, isLastPage, nbPages, nbHits } = usePagination({
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
      <PaginationItem
        ariaLabel={intl.formatMessage({
          id: 'search_pagination_first_page',
          defaultMessage: 'First page',
        })}
        value={0}
        isCurrent={false}
        isDisabled={isFirstPage}
        createURL={createURL}
        refine={refine}
      >
        <Icon data={first_page} />
      </PaginationItem>
      <PaginationItem
        ariaLabel={intl.formatMessage({
          id: 'previous',
          defaultMessage: 'Previous',
        })}
        value={currentRefinement - 1}
        isCurrent={false}
        isDisabled={isFirstPage}
        createURL={createURL}
        refine={refine}
      >
        <Icon data={chevron_left} />
      </PaginationItem>

      {pages.map((page) => (
        <PaginationItem
          key={page}
          ariaLabel={`${intl.formatMessage({
            id: 'page',
            defaultMessage: 'Page',
          })} ${page + 1}`}
          value={page}
          isCurrent={page === currentRefinement}
          isDisabled={false}
          createURL={createURL}
          refine={refine}
        >
          {page + 1}
        </PaginationItem>
      ))}

      <PaginationItem
        ariaLabel={intl.formatMessage({
          id: 'next',
          defaultMessage: 'Next',
        })}
        value={currentRefinement + 1}
        isCurrent={false}
        isDisabled={isLastPage}
        createURL={createURL}
        refine={refine}
      >
        <Icon data={chevron_right} />
      </PaginationItem>

      <PaginationItem
        ariaLabel={intl.formatMessage({
          id: 'search_pagination_last_page',
          defaultMessage: 'Last page',
        })}
        value={nbPages - 1}
        isCurrent={false}
        isDisabled={isLastPage}
        createURL={createURL}
        refine={refine}
      >
        <Icon data={last_page} size={16} className={`size-6`} />
      </PaginationItem>
    </ul>
  )
}
