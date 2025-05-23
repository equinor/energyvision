import { Button } from '@core/Button'
// Based on: https://github.com/algolia/react-instantsearch/blob/master/examples/hooks/components/Pagination.tsx

type PaginationItemProps = React.ComponentProps<'button'> & {
  isDisabled: boolean
  isCurrent: boolean
  ariaLabel?: string
}

export function isModifierClick(event: React.MouseEvent) {
  const isMiddleClick = event.button === 1
  return Boolean(isMiddleClick || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
}

export const PaginationItem = ({ isDisabled, isCurrent, ariaLabel, onClick, children }: PaginationItemProps) => {
  const itemClassNames = `
  flex
  justify-center
  items-center
  size-12 
  text-slate-80
  rounded-full
  p-0
  lg:p-0
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
      <Button variant="ghost" aria-label={ariaLabel} className={itemClassNames} onClick={onClick}>
        {children}
      </Button>
    </li>
  )
}
