import { usePagination } from 'react-instantsearch'
import { Button } from '@components'
import styled from 'styled-components'

// Based on: https://github.com/algolia/react-instantsearch/blob/master/examples/hooks/components/Pagination.tsx

const StyledListItem = styled.li`
  display: inline-block;
`

const PaginationLink = styled(Button)<{ isCurrent?: boolean }>`
  width: 44px;
  height: 44px;
  color: var(--pagination-btn-text-color);
  ${({ isCurrent }) =>
    isCurrent && {
      background: 'var(--pagination-btn-background-active)',
      color: 'var(--pagination-btn-text-color-active)',
    }}

  :hover {
    color: var(--pagination-btn-text-color-active);
    :disabled {
      color: var(--pagination-btn-disabled);
    }
  }

  :disabled {
    cursor: auto;
    color: var(--pagination-btn-disabled);
  }
`

export function isModifierClick(event: React.MouseEvent) {
  const isMiddleClick = event.button === 1
  return Boolean(isMiddleClick || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
}

type PaginationItemProps = React.ComponentProps<'a'> &
  Pick<ReturnType<typeof usePagination>, 'refine' | 'createURL'> & {
    isDisabled: boolean
    value: number
    isCurrent: boolean
    ariaLabel?: string
  }

export const PaginationItem = ({ isDisabled, value, isCurrent, ariaLabel, refine, children }: PaginationItemProps) => {
  if (isDisabled || isCurrent) {
    return (
      <StyledListItem>
        <PaginationLink disabled={isDisabled} isCurrent={isCurrent} variant="ghost_icon" aria-label={ariaLabel}>
          {children}
        </PaginationLink>
      </StyledListItem>
    )
  }

  return (
    <StyledListItem>
      <PaginationLink
        disabled={isDisabled}
        variant="ghost_icon"
        aria-label={ariaLabel}
        onClick={(event) => {
          if (isModifierClick(event)) {
            return
          }

          event.preventDefault()
          refine(value)
        }}
      >
        {children}
      </PaginationLink>
    </StyledListItem>
  )
}
