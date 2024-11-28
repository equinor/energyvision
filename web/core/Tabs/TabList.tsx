import { forwardRef } from 'react'
import * as RadixTabs from '@radix-ui/react-tabs'
import envisTwMerge from '../../twMerge'

export type TabListProps = {
  /* Provides a label that describes the purpose of the set of tabs. */
  'aria-label': string
} & RadixTabs.TabsListProps

export const TabList = forwardRef<HTMLDivElement, TabListProps>(function TabList(
  { 'aria-label': ariaLabel, children, className = '', ...rest },
  ref,
) {
  return (
    <RadixTabs.List ref={ref} className={envisTwMerge(`flex flex-wrap`, className)} aria-label={ariaLabel} {...rest}>
      {children}
    </RadixTabs.List>
  )
})
