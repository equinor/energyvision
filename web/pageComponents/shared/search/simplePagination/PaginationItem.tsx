import { Button } from '@components'
import styled from 'styled-components'

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

type PaginationItemProps = React.ComponentProps<'a'> & {
  isDisabled: boolean
  value: number
  isCurrent: boolean
  ariaLabel?: string
  onClick: (value: number) => void
}

export const PaginationItem = ({ isDisabled, value, isCurrent, ariaLabel, onClick, children }: PaginationItemProps) => {
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
          onClick(value)
        }}
      >
        {children}
      </PaginationLink>
    </StyledListItem>
  )
}
