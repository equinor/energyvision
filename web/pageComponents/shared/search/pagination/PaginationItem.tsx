import { Button } from '@core/Button'
import { usePagination } from 'react-instantsearch'
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
  const itemClassNames = `
  flex
  justify-center
  items-center
  size-12 
  text-slate-80
  rounded-full
  p-0
  ${isCurrent ? 'bg-moss-green-80 text-slate-80 dark:text-slate-80' : 'text-slate-80 dark:text-white-100'}
  disabled:cursor-pointer-none
  disabled:text-grey-30/50
  dark:hover:text-slate-80`

  if (isDisabled || isCurrent) {
    return (
      <li>
        <Button disabled={isDisabled} variant="ghost" className={itemClassNames} aria-label={ariaLabel}>
          {children}
        </Button>
      </li>
    )
  }

  return (
    <li>
      <Button
        variant="ghost"
        aria-label={ariaLabel}
        className={itemClassNames}
        onClick={(event) => {
          if (isModifierClick(event)) {
            return
          }

          event.preventDefault()
          refine(value)
        }}
      >
        {children}
      </Button>
    </li>
  )
}
