import { forwardRef } from 'react'
import { TabPanel as RTabPanel, TabPanelProps as RTabPanelProps } from '@reach/tabs'

export type TabPanelProps = RTabPanelProps

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(function TabPanel({ children, ...rest }, ref) {
  return (
    <RTabPanel ref={ref} {...rest}>
      {children}
    </RTabPanel>
  )
})
