import { usePagination } from 'react-instantsearch-hooks-web'
import { Button } from '@components'
import styled from 'styled-components'

// Based on: https://github.com/algolia/react-instantsearch/blob/master/examples/hooks/components/Pagination.tsx

const StyledListItem = styled.li`
  display: inline-block;
`

const PaginationLink = styled(Button)<{ isCurrent?: boolean; inverted?: boolean }>`
  width: 44px;
  height: 44px;
  color: ${(props) => (props.inverted ? 'var(--moss-green-80)' : 'var(--slate-blue-95)')};
  ${({ isCurrent, inverted }) =>
    isCurrent && {
      background: inverted ? 'var(--moss-green-80)' : 'var(--moss-green-70)',
      color: inverted ? 'var(--black-100)' : 'var(--default-text)',
    }}

  :hover {
    color: ${(props) => (props.inverted ? 'var(--black-100)' : '')};

    :disabled {
      color: ${(props) => (props.inverted ? 'var(--slate-blue-90)' : 'var(--grey-30)')};
    }
  }

  :disabled {
    cursor: auto;
    color: ${(props) => (props.inverted ? 'var(--slate-blue-90)' : 'var(--grey-30)')};
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
    inverted?: boolean
  }

export const PaginationItem = ({
  isDisabled,
  value,
  isCurrent,
  ariaLabel,
  refine,
  inverted,
  children,
}: PaginationItemProps) => {
  if (isDisabled || isCurrent) {
    return (
      <StyledListItem>
        <PaginationLink
          disabled={isDisabled}
          isCurrent={isCurrent}
          inverted={inverted}
          variant="ghost_icon"
          aria-label={ariaLabel}
        >
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
        inverted={inverted}
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
