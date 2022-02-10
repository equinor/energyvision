import { forwardRef } from 'react'
import { TabList as RTabList, TabListProps as RTabListProps } from '@reach/tabs'

export type TabListProps = RTabListProps

export const TabList = forwardRef<HTMLDivElement, TabListProps>(function TabList({ children, ...rest }, ref) {
  return (
    <RTabList ref={ref} {...rest}>
      {children}
    </RTabList>
  )
})
