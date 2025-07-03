'use client'
import envisTwMerge from '../../twMerge'
import { MediaButton } from '@/core/MediaButton/MediaButton'
import { useContext } from 'react'
import { PaginationContext } from '../../common/contexts/PaginationContext'
import { usePrefersReducedMotion } from '../../common/hooks/usePrefersReducedMotion'
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
    <ul className={envisTwMerge(`max-w-viewport flex-wrap my-2 flex gap-3 items-center`, className)} {...rest}>
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
