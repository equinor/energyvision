'use client'
import envisTwMerge from '../../twMerge'
import { MediaButton } from '@/core/MediaButton/MediaButton'
import { useContext } from 'react'
import { PaginationContext } from '../../lib/contexts/PaginationContext'
import { usePrefersReducedMotion } from '../../lib/hooks/usePrefersReducedMotion'
import { useTranslations } from 'next-intl'

export type SimplePaginationProps = {
  className?: string
  onNextPage: () => void
  onPreviousPage: () => void
  isFirstPage: boolean
  isLastPage: boolean
}

export const SimplePagination = ({
  className = '',
  onNextPage,
  onPreviousPage,
  isFirstPage = false,
  isLastPage = false,
  ...rest
}: SimplePaginationProps) => {
  const intl = useTranslations()
  const { resultsRef } = useContext(PaginationContext)
  const prefersReducedMotion = usePrefersReducedMotion()

  const handleNextPagination = () => {
    if (!prefersReducedMotion && resultsRef?.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    onNextPage()
  }
  const handlePrevPagination = () => {
    if (!prefersReducedMotion && resultsRef?.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    onPreviousPage()
  }

  return (
    <ul className={envisTwMerge(`my-2 flex flex-wrap items-center gap-3`, className)} {...rest}>
      <li>
        <MediaButton
          title={intl('previous')}
          mode="previous"
          disabled={isFirstPage}
          onClick={handlePrevPagination}
          className=""
        />
      </li>
      <li>
        <MediaButton
          title={intl('next')}
          mode="next"
          disabled={isLastPage}
          onClick={handleNextPagination}
          className=""
        />
      </li>
    </ul>
  )
}
