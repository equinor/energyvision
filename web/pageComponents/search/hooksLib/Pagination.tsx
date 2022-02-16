import { usePagination, UsePaginationProps } from 'react-instantsearch-hooks'
import { Pagination as EdsPagination } from '@equinor/eds-core-react'

type PaginationProps = {
  numberPerPage: number
} & UsePaginationProps

export const Pagination = ({ numberPerPage, totalPages, padding, ...rest }: PaginationProps) => {
  const { refine, nbHits } = usePagination({ totalPages, padding })

  return (
    <EdsPagination
      totalItems={nbHits}
      itemsPerPage={numberPerPage}
      onChange={(
        event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element> | null,
        page: number,
      ): void => {
        if (event) {
          event.preventDefault()
        }

        refine(page)
      }}
      withItemIndicator
      {...rest}
    />
  )
}
