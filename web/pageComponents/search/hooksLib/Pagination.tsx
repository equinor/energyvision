import { usePagination, UsePaginationProps } from 'react-instantsearch-hooks'
import { Pagination as EdsPagination } from '@equinor/eds-core-react'

type PaginationProps = {
  numberPerPage: number
} & UsePaginationProps

export const Pagination = ({ numberPerPage, totalPages, padding, ...rest }: PaginationProps) => {
  const { refine, nbHits } = usePagination({ totalPages, padding })

  if (nbHits <= numberPerPage) return null

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

        // EDS page index starts at 1, Algolia page index starts at 0
        // Added conditional in case this gets changed in EDS without us knowing
        refine(page > 0 ? page - 1 : page)
      }}
      {...rest}
    />
  )
}
