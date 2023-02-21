import { forwardRef } from 'react'
import { TabList as CTabList, TabListProps as CTabListProps } from '@chakra-ui/react'

export type TabListProps = CTabListProps

export const TabList = forwardRef<HTMLDivElement, TabListProps>(function TabList({ children, ...rest }, ref) {
  return (
    <CTabList ref={ref} {...rest} style={{ border: 'none', flexWrap: 'wrap' }}>
      {children}
    </CTabList>
  )
})
