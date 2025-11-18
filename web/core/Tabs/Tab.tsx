import { forwardRef } from 'react'
import * as RadixTabs from '@radix-ui/react-tabs'
import { twMerge } from 'tailwind-merge'

export type TabProps = RadixTabs.TabsTriggerProps

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab({ children, className = '', ...rest }, ref) {
  return (
    <RadixTabs.Trigger
      ref={ref}
      className={twMerge(
        `focus-visible:envis-outline dark:focus-visible:envis-outline-invert w-full border-b border-grey-50 bg-transparent px-1 pt-4 pb-2 text-base whitespace-normal text-slate-80 decoration-1 underline-offset-2 hover:cursor-pointer hover:underline focus:outline-hidden lg:px-4 dark:text-white-100 data-active:border-b-2 data-active:border-slate-80 data-active:font-semibold data-active:hover:no-underline data-active:dark:border-white-100`,
        className,
      )}
      {...rest}
    >
      {children}
    </RadixTabs.Trigger>
  )
})
