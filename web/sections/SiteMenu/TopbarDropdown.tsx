import { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type TopbarDropdownProps = {
  variant?: 'light' | 'dark'
  right?: string
  children: ReactNode
} & HTMLAttributes<HTMLDivElement>

export const TopbarDropdown = forwardRef<HTMLDivElement, TopbarDropdownProps>(function TopbarDropdown(
  { children, variant = 'light', className = '', ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={twMerge(
        `${variant === 'dark' ? 'dark bg-slate-blue-95' : 'bg-white-100'} fixed inset-0 overflow-auto`,
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
})
