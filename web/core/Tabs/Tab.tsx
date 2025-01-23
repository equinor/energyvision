import { forwardRef } from 'react'
import * as RadixTabs from '@radix-ui/react-tabs'
import envisTwMerge from '../../twMerge'

export type TabProps = RadixTabs.TabsTriggerProps

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab({ children, className = '', ...rest }, ref) {
  return (
    <RadixTabs.Trigger
      ref={ref}
      className={envisTwMerge(
        `text-slate-80
        dark:text-white-100
        bg-transparent
        py-2
        pl-3
        pr-8
        border-0
        hover:underline
        underline-offset-2
        decoration-1
        border-slate-80
        dark:border-white-100
        hover:cursor-pointer
        data-active:font-medium
        data-active:border-b-2
        focus:envis-outline
        dark:focus:envis-outline-invert
    `,
        className,
      )}
      {...rest}
    >
      {children}
    </RadixTabs.Trigger>
  )
})
