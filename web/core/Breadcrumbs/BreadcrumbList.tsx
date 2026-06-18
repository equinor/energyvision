import { forwardRef, type HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export type BreadcrumbsProps = HTMLAttributes<HTMLOListElement>

export const BreadcrumbsList = forwardRef<HTMLOListElement, BreadcrumbsProps>(
  function Breadcrumbs({ children, className = '' }, ref) {
    return (
      <ol ref={ref} className={twMerge('list-none p-0 text-sm', className)}>
        {children}
      </ol>
    )
  },
)
