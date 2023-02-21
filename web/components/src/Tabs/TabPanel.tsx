import { forwardRef } from 'react'
import { TabPanel as CTabPanel, TabPanelProps as CTabPanelProps } from '@chakra-ui/react'

export type TabPanelProps = CTabPanelProps

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(function TabPanel({ children, ...rest }, ref) {
  return (
    <CTabPanel ref={ref} {...rest}>
      {children}
    </CTabPanel>
  )
})
