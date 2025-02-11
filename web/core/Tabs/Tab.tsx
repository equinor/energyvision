import { forwardRef } from 'react'
import * as RadixTabs from '@radix-ui/react-tabs'
import envisTwMerge from '../../twMerge'

export type TabProps = {
  contentClassName?: string
  borderBottomClassName?: string
} & RadixTabs.TabsTriggerProps

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { children, className = '', borderBottomClassName = '', contentClassName = '', ...rest },
  ref,
) {
  return (
    <RadixTabs.Trigger
      ref={ref}
      className={envisTwMerge(
        `group
        min-w-[50px]
        h-full
        text-slate-80
        dark:text-white-100
        bg-transparent
        hover:underline
        data-active:hover:no-underline
        underline-offset-2
        decoration-1
        hover:cursor-pointer
        data-active:font-medium
        focus:outline-none
        focus-visible:envis-outline
        dark:focus:envis-outline-invert
    `,
        className,
      )}
      {...rest}
    >
      <div className={envisTwMerge(`py-2 px-6 h-full flex items-center`, contentClassName)}>{children}</div>
      {/* Border underline to get rounded*/}
      <div
        className={envisTwMerge(
          `transition-all bg-transparent group-data-active:bg-slate-80 dark:group-data-active:bg-slate-80  w-full h-[3px] rounded-3xl`,
          borderBottomClassName,
        )}
      ></div>
    </RadixTabs.Trigger>
  )
})
