import { forwardRef } from 'react'
import * as RadixTabs from '@radix-ui/react-tabs'
import envisTwMerge from '../../twMerge'

export type TabProps = RadixTabs.TabsTriggerProps

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab({ children, className = '', ...rest }, ref) {
  return (
    <RadixTabs.Trigger
      ref={ref}
      className={envisTwMerge(
        `w-full
        text-slate-80
        dark:text-white-100
        bg-transparent
        whitespace-normal
        text-base
        pt-4
        pb-2
        px-1
        lg:px-4
        border-b
        data-active:border-b-2
        border-grey-50
        data-active:border-slate-80
        data-active:dark:border-white-100
        hover:underline
        data-active:hover:no-underline
        underline-offset-2
        decoration-1
        hover:cursor-pointer
        data-active:font-semibold
        focus:outline-hidden
        focus-visible:envis-outline
        dark:focus-visible:envis-outline-invert
    `,
        className,
      )}
      {...rest}
    >
      {children}
    </RadixTabs.Trigger>
  )
})
