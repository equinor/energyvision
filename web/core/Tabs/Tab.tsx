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
        border-b
        hover:underline
        hover:underline-offset-4
        border-slate-80
        dark:border-white-100
        hover:cursor-pointer
        data-active:font-medium
        data-active:border-l
        data-active:border-r
        data-active:border-b-0
        data-active:first:border-l-0
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
