import { forwardRef } from 'react'
import { TabPanels as CTabPanels, TabPanelsProps as CTabPanelsProps } from '@chakra-ui/react'

export type TabPanelsProps = CTabPanelsProps

export const TabPanels = forwardRef<HTMLDivElement, TabPanelsProps>(function TabPanels({ children, ...rest }, ref) {
  return (
    <CTabPanels ref={ref} {...rest}>
      {children}
    </CTabPanels>
  )
})
