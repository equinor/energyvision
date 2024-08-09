import { Icon } from '@equinor/eds-core-react'
import { chevron_left, chevron_right, first_page, last_page } from '@equinor/eds-icons'
import { useContext, useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../../../common/hooks/usePrefersReducedMotion'
import { PaginationContext } from './PaginationContext'
import { PaginationItem } from './PaginationItem'

type PaginationProps = {
  totalPages: number
  onPageChange: (val: number) => void
}

export const Pagination = ({ totalPages, onPageChange }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(0)
  const { resultsRef } = useContext(PaginationContext)
  const prevPage = useRef(currentPage)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (!prefersReducedMotion && resultsRef?.current && currentPage !== prevPage.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [currentPage, prefersReducedMotion, resultsRef])

  useEffect(() => {
    prevPage.current = currentPage
  }, [currentPage])

  if (totalPages <= 1) {
    return null
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    onPageChange(page)
  }

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
      onPageChange(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
      onPageChange(currentPage + 1)
    }
  }

  const isCurrentPage = (page: number) => page === currentPage

  return (
    <ul className="pt-4 grid gap-2 auto-cols-min grid-flow-col justify-center">
      <PaginationItem
        ariaLabel="First page"
        value={0}
        isCurrent={false}
        isDisabled={currentPage === 0}
        onClick={() => goToPage(0)}
      >
        <Icon data={first_page} />
      </PaginationItem>

      <PaginationItem
        ariaLabel="Previous"
        value={currentPage - 1}
        isCurrent={false}
        isDisabled={currentPage === 0}
        onClick={goToPreviousPage}
      >
        <Icon data={chevron_left} />
      </PaginationItem>

      {pages
        .filter((page) => {
          const lowerBound = Math.max(currentPage - 1, 0)
          const upperBound = Math.min(currentPage + 1, totalPages - 1)
          if (currentPage === totalPages - 1) return page >= lowerBound - 1 && page <= upperBound
          if (currentPage === 0) return page <= 2 || (page >= lowerBound && page <= upperBound)
          return page === lowerBound || page === currentPage || page === upperBound
        })
        .map((page) => (
          <PaginationItem
            key={page}
            ariaLabel={`Page ${page + 1}`}
            value={page}
            isCurrent={isCurrentPage(page)}
            isDisabled={false}
            onClick={() => goToPage(page)}
          >
            {page + 1}
          </PaginationItem>
        ))}

      <PaginationItem
        ariaLabel="Next"
        value={currentPage + 1}
        isCurrent={false}
        isDisabled={currentPage === totalPages - 1}
        onClick={goToNextPage}
      >
        <Icon data={chevron_right} />
      </PaginationItem>

      <PaginationItem
        ariaLabel="Last page"
        value={totalPages - 1}
        isCurrent={false}
        isDisabled={currentPage === totalPages - 1}
        onClick={() => goToPage(totalPages - 1)}
      >
        <Icon data={last_page} />
      </PaginationItem>
    </ul>
  )
}
