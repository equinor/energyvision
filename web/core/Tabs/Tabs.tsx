import { forwardRef } from 'react'
import * as RadixTabs from '@radix-ui/react-tabs'

export type TabsProps = RadixTabs.TabsProps

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs({ children, ...rest }, ref) {
  return (
    <RadixTabs.Root ref={ref} {...rest}>
      {children}
    </RadixTabs.Root>
  )
})
