import { forwardRef } from 'react'
import * as RadixTabs from '@radix-ui/react-tabs'
import { twMerge } from 'tailwind-merge'

export type TabPanelProps = RadixTabs.TabsContentProps

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(function TabPanel(
  { className = '', children, ...rest },
  ref,
) {
  return (
    <RadixTabs.Content
      ref={ref}
      className={twMerge(
        `focus-visible:envis-outline dark:focus-visible:envis-outline-invert outline-offset-4`,
        className,
      )}
      {...rest}
    >
      {children}
    </RadixTabs.Content>
  )
})
