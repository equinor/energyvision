import { Icon } from '@equinor/eds-core-react'
import { chevron_left, chevron_right, first_page, last_page } from '@equinor/eds-icons'
import { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { usePrefersReducedMotion } from '../../../../common/hooks/usePrefersReducedMotion'
import { PaginationContext } from './PaginationContext'
import { PaginationItem } from './PaginationItem'

const PaginationList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-gap: 8px;
  grid-auto-columns: min-content;
  grid-auto-flow: column;
  justify-content: center;
`

type PaginationProps = {
  totalPages: number
  padding: number
  inverted?: boolean
  onPageChange: any
}

export const Pagination = ({ totalPages, padding, onPageChange, inverted = false }: PaginationProps) => {
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
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const isCurrentPage = (page: number) => page === currentPage

  return (
    <PaginationList>
      <PaginationItem
        ariaLabel="First page"
        value={0}
        isCurrent={false}
        isDisabled={currentPage === 0}
        onClick={() => goToPage(0)}
        inverted={inverted}
      >
        <Icon data={first_page} />
      </PaginationItem>

      <PaginationItem
        ariaLabel="Previous"
        value={currentPage - 1}
        isCurrent={false}
        isDisabled={currentPage === 0}
        onClick={goToPreviousPage}
        inverted={inverted}
      >
        <Icon data={chevron_left} />
      </PaginationItem>

      {pages
        .filter((page) => {
          const lowerBound = currentPage - padding
          const upperBound = currentPage + padding
          return page === 0 || page === totalPages - 1 || (page >= lowerBound && page <= upperBound)
        })
        .map((page) => (
          <PaginationItem
            key={page}
            ariaLabel={`Page ${page + 1}`}
            value={page}
            isCurrent={isCurrentPage(page)}
            isDisabled={false}
            onClick={() => goToPage(page)}
            inverted={inverted}
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
        inverted={inverted}
      >
        <Icon data={chevron_right} />
      </PaginationItem>

      <PaginationItem
        ariaLabel="Last page"
        value={totalPages - 1}
        isCurrent={false}
        isDisabled={currentPage === totalPages - 1}
        onClick={() => goToPage(totalPages - 1)}
        inverted={inverted}
      >
        <Icon data={last_page} />
      </PaginationItem>
    </PaginationList>
  )
}
