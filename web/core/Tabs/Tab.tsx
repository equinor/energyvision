import { forwardRef } from 'react'
import * as RadixTabs from '@radix-ui/react-tabs'
import envisTwMerge from '../../twMerge'

export type TabProps = RadixTabs.TabsTriggerProps

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab({ children, className = '', ...rest }, ref) {
  return (
    <RadixTabs.Trigger
      ref={ref}
      className={envisTwMerge(
        `group/tabtrigger
        relative
        text-slate-80
        dark:text-white-100
        bg-transparent
        text-base
        whitespace-nowrap
        pt-4
        group-data-overflowing/tablist:pt-2
        group-data-overflowing/tablist:my-2
        border-b
        border-grey-50
        dark:border-white-100
        group-data-overflowing/tablist:border-transparent
        hover:underline
        data-active:hover:no-underline
        underline-offset-2
        decoration-1
        hover:cursor-pointer
        data-active:font-semibold
        data-active:border-slate-80
        data-active:dark:border-white-100
        group-data-overflowing/tablist:data-active:font-semibold
        group-data-overflowing/tablist:data-active:border-transparent
        focus:envis-outline
        dark:focus:envis-outline-invert
        flex
        flex-col
    `,
        className,
      )}
      {...rest}
    >
      <div className={`w-full pl-6 pr-8`}>{children}</div>
      <div
        className={`
          w-full 
          h-[1.5px] 
          transition-all
          bg-transparent 
          mt-2
          group-data-active/tabtrigger:inline-block
          group-data-active/tabtrigger:bg-slate-80
          group-data-active/tabtrigger:dark:bg-white-100 
          group-data-overflowing/tablist:hidden
          group-data-overflowing/tablist:group-data-active/tabtrigger:hidden
          rounded-3xl`}
      />
    </RadixTabs.Trigger>
  )
})
