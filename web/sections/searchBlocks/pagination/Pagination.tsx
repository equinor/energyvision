'use client'
import { Icon } from '@equinor/eds-core-react'
import {
  chevron_left,
  chevron_right,
  first_page,
  last_page,
} from '@equinor/eds-icons'
import { useTranslations } from 'next-intl'
import { useContext, useEffect, useRef } from 'react'
import { type UsePaginationProps, usePagination } from 'react-instantsearch'
import { twMerge } from 'tailwind-merge'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'
import { isModifierClick, PaginationItem } from './PaginationItem'

// Based on: https://github.com/algolia/react-instantsearch/blob/master/examples/hooks/components/Pagination.tsx
export type PaginationProps = {
  hitsPerPage?: number
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & UsePaginationProps

export const Pagination = ({
  className = '',
  totalPages,
  padding,
  hitsPerPage = 5,
  ...rest
}: PaginationProps) => {
  const {
    refine,
    //createURL,
    pages,
    currentRefinement,
    isFirstPage,
    isLastPage,
    nbPages,
    nbHits,
  } = usePagination({
    totalPages,
    padding,
  })
  const intl = useTranslations()
  //@ts-ignore:todo
  const { resultsRef } = useContext(PaginationContext)
  const prevRefinement = useRef<number>(currentRefinement)
  const prefersReducedMotion = usePrefersReducedMotion()

  const handleClick = (event: any, value: number) => {
    if (isModifierClick(event)) {
      return
    }
    event.preventDefault()
    refine(value)
  }

  useEffect(() => {
    if (
      !prefersReducedMotion &&
      resultsRef?.current &&
      currentRefinement !== prevRefinement.current
    ) {
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
    <ul className={twMerge(`my-2 flex flex-wrap gap-2`, className)} {...rest}>
      <PaginationItem
        ariaLabel={intl('search_pagination_first_page')}
        isCurrent={false}
        onClick={e => handleClick(e, 0)}
        isDisabled={isFirstPage}
      >
        <Icon data={first_page} />
      </PaginationItem>
      <PaginationItem
        ariaLabel={intl('previous')}
        onClick={e => handleClick(e, currentRefinement - 1)}
        isCurrent={false}
        isDisabled={isFirstPage}
      >
        <Icon data={chevron_left} />
      </PaginationItem>

      {pages.map(page => (
        <PaginationItem
          key={page}
          ariaLabel={`${intl('page')} ${page + 1}`}
          onClick={e => handleClick(e, page)}
          isCurrent={page === currentRefinement}
          isDisabled={false}
        >
          {page + 1}
        </PaginationItem>
      ))}

      <PaginationItem
        ariaLabel={intl('next')}
        isCurrent={false}
        isDisabled={isLastPage}
        onClick={e => handleClick(e, currentRefinement + 1)}
      >
        <Icon data={chevron_right} />
      </PaginationItem>

      <PaginationItem
        ariaLabel={intl('search_pagination_last_page')}
        isCurrent={false}
        isDisabled={isLastPage}
        onClick={e => handleClick(e, nbPages - 1)}
      >
        <Icon data={last_page} size={16} className={`size-6`} />
      </PaginationItem>
    </ul>
  )
}
