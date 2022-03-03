import { usePagination, UsePaginationProps } from 'react-instantsearch-hooks'
import { PaginationItem } from './pagination/PaginationItem'
import { Icon } from '@equinor/eds-core-react'
import { chevron_left, chevron_right } from '@equinor/eds-icons'
import styled from 'styled-components'

const PaginationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-gap: 8px;
  grid-auto-columns: min-content;
  grid-auto-flow: column;
`

export type PaginationProps = React.ComponentProps<'div'> & UsePaginationProps

export const Pagination = ({ totalPages, padding, ...rest }: PaginationProps) => {
  const { refine, createURL, pages, currentRefinement, isFirstPage, isLastPage } = usePagination({
    totalPages,
    padding,
  })

  return (
    <div {...rest}>
      <PaginationList>
        <PaginationItem
          ariaLabel="Previous"
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
            ariaLabel={String(page)}
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
          ariaLabel="Next"
          value={currentRefinement + 1}
          isCurrent={false}
          isDisabled={isLastPage}
          createURL={createURL}
          refine={refine}
        >
          <Icon data={chevron_right} />
        </PaginationItem>
      </PaginationList>
    </div>
  )
}
