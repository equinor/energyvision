import { forwardRef, HTMLAttributes } from 'react'

export type BreadcrumbsListItemProps = HTMLAttributes<HTMLLIElement>

export const BreadcrumbsListItem = forwardRef<HTMLLIElement, BreadcrumbsListItemProps>(function Breadcrumbs(
  { children, ...rest },
  ref,
) {
  return (
    <li
      ref={ref}
      {...rest}
      className="inline-block pr-2 font-bold text-grey-90 after:content-['>'] after:pl-2 last:font-medium last:text-slate-blue-90 last:after:content-[''] first-letter:capitalize"
    >
      {children}
    </li>
  )
})