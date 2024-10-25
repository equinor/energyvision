import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { List } from '@core/List'

export type BreadcrumbsProps = HTMLAttributes<HTMLOListElement>

export const BreadcrumbsList = forwardRef<HTMLDivElement, BreadcrumbsProps>(function Breadcrumbs(
  { children, className = '' }, 
  ref 
) {
  return (
    <List ref={ref} className={twMerge('p-0 list-none text-sm leading-8', className)}>
      {children}
    </List>
  )
})