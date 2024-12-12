import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export type BreadcrumbsListItemProps = HTMLAttributes<HTMLLIElement> & {
  active?: boolean
}

export const BreadcrumbsListItem = forwardRef<HTMLLIElement, BreadcrumbsListItemProps>(
  ({ children, active, ...rest }, ref) => {
    return (
      <li
        ref={ref}
        {...rest}
        className={twMerge(
          'inline-block pr-2 text-grey-90 after:content-[">"] after:pl-2 last:after:content-[""]',
          active ? 'font-medium text-slate-blue-90' : 'font-bold'
        )}
      >
        {children}
      </li>
    )
  }
)