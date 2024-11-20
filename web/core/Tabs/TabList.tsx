import { forwardRef } from 'react'
import * as RadixTabs from '@radix-ui/react-tabs'
import envisTwMerge from '../../twMerge'

export type TabListProps = RadixTabs.TabsListProps

export const TabList = forwardRef<HTMLDivElement, TabListProps>(function TabList(
  { children, className = '', ...rest },
  ref,
) {
  return (
    <RadixTabs.List ref={ref} className={envisTwMerge(`flex flex-wrap`, className)} {...rest}>
      {children}
    </RadixTabs.List>
  )
})
