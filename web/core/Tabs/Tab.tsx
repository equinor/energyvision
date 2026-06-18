import * as RadixTabs from '@radix-ui/react-tabs'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export type TabProps = RadixTabs.TabsTriggerProps

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { children, className = '', ...rest },
  ref,
) {
  return (
    <RadixTabs.Trigger
      ref={ref}
      className={twMerge(
        `focus-visible:envis-outline dark:focus-visible:envis-outline-invert w-full whitespace-normal border-grey-50 border-b bg-transparent px-4 pt-4 pb-2 text-base text-slate-80 decoration-1 underline-offset-2 hover:cursor-pointer hover:underline focus:outline-hidden data-active:border-slate-80 data-active:border-b-2 data-active:font-semibold data-active:hover:no-underline lg:px-6 dark:text-white-100 data-active:dark:border-white-100`,
        className,
      )}
      {...rest}
    >
      {children}
    </RadixTabs.Trigger>
  )
})
