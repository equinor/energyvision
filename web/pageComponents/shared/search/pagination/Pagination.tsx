import { Icon } from '@equinor/eds-core-react'
import { chevron_left, chevron_right, first_page, last_page } from '@equinor/eds-icons'
import { useContext, useEffect, useRef } from 'react'
import { usePagination, UsePaginationProps } from 'react-instantsearch'
import styled from 'styled-components'
import { usePrefersReducedMotion } from '../../../../common/hooks/usePrefersReducedMotion'
import { PaginationContext } from './PaginationContext'
import { PaginationItem } from './PaginationItem'

// Based on: https://github.com/algolia/react-instantsearch/blob/master/examples/hooks/components/Pagination.tsx

const PaginationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-gap: 8px;
  grid-auto-columns: min-content;
  grid-auto-flow: column;
`

export type PaginationProps = {
  hitsPerPage?: number
  inverted?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & UsePaginationProps

export const Pagination = ({ totalPages, padding, hitsPerPage = 5, inverted = false, ...rest }: PaginationProps) => {
  const { refine, createURL, pages, currentRefinement, isFirstPage, isLastPage, nbPages, nbHits } = usePagination({
    totalPages,
    padding,
  })

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
    <PaginationList {...rest}>
      <PaginationItem
        ariaLabel="First page"
        value={0}
        isCurrent={false}
        isDisabled={isFirstPage}
        createURL={createURL}
        refine={refine}
        inverted={inverted}
      >
        <Icon data={first_page} />
      </PaginationItem>
      <PaginationItem
        ariaLabel="Previous"
        value={currentRefinement - 1}
        isCurrent={false}
        isDisabled={isFirstPage}
        createURL={createURL}
        refine={refine}
        inverted={inverted}
      >
        <Icon data={chevron_left} />
      </PaginationItem>

      {pages.map((page) => (
        <PaginationItem
          key={page}
          ariaLabel={`Page ${page + 1}`}
          value={page}
          isCurrent={page === currentRefinement}
          isDisabled={false}
          createURL={createURL}
          refine={refine}
          inverted={inverted}
        >
          {page + 1}
        </PaginationItem>
      ))}

      <PaginationItem
        ariaLabel="Next"
        value={currentRefinement + 1}
        isCurrent={false}
        isDisabled={isLastPage}
        createURL={createURL}
        refine={refine}
        inverted={inverted}
      >
        <Icon data={chevron_right} />
      </PaginationItem>

      <PaginationItem
        ariaLabel="Last page"
        value={nbPages - 1}
        isCurrent={false}
        isDisabled={isLastPage}
        createURL={createURL}
        refine={refine}
        inverted={inverted}
      >
        <Icon data={last_page} />
      </PaginationItem>
    </PaginationList>
  )
}
