import envisTwMerge from '../../twMerge'
import { useIntl } from 'react-intl'
import { MediaButton } from '@core/MediaButton/MediaButton'
import { useContext } from 'react'
import { PaginationContext } from '../../common/contexts/PaginationContext'
import { usePrefersReducedMotion } from '../../common/hooks/usePrefersReducedMotion'

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
  const intl = useIntl()
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
          title={intl.formatMessage({
            id: 'previous',
            defaultMessage: 'Previous',
          })}
          mode="previous"
          disabled={isFirstPage}
          onClick={handlePrevPagination}
          className=""
        />
      </li>
      <li>
        <MediaButton
          title={intl.formatMessage({
            id: 'next',
            defaultMessage: 'Next',
          })}
          mode="next"
          disabled={isLastPage}
          onClick={handleNextPagination}
          className=""
        />
      </li>
    </ul>
  )
}
