import { forwardRef } from 'react'
import { TabPanels as RTabPanels, TabPanelsProps as RTabPanelsProps } from '@reach/tabs'

export type TabPanelsProps = RTabPanelsProps

export const TabPanels = forwardRef<HTMLDivElement, TabPanelsProps>(function TabPanels({ children, ...rest }, ref) {
  return (
    <RTabPanels ref={ref} {...rest}>
      {children}
    </RTabPanels>
  )
})
