import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export type BreadcrumbsProps = HTMLAttributes<HTMLOListElement>

export const BreadcrumbsList = forwardRef<HTMLOListElement, BreadcrumbsProps>(function Breadcrumbs(
  { children, className = '' }, 
  ref 
) {
  return (
    <ol ref={ref} className={twMerge('p-0 list-none text-sm leading-8', className)}>
      {children}
    </ol>
  )
})