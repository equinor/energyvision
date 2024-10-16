import envisTwMerge from '../../twMerge'
import { useIntl } from 'react-intl'
import { MediaButton } from '@core/MediaButton/MediaButton'
import { useContext } from 'react'
import { usePrefersReducedMotion } from '../../common/hooks/usePrefersReducedMotion'
import { PaginationContext } from '../../common/contexts/PaginationContext'

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
    <ul className={envisTwMerge(`max-w-viewport flex flex-wrap gap-2 my-2`, className)} {...rest}>
      <div className="flex gap-3 items-center">
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
      </div>
    </ul>
  )
}
