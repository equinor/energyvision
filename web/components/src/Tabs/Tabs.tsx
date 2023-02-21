import { forwardRef } from 'react'
import { Tabs as CTabs, TabsProps as CTabsProps } from '@chakra-ui/react'

export type TabsProps = CTabsProps

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs({ children, ...rest }, ref) {
  return (
    <CTabs ref={ref} {...rest}>
      {children}
    </CTabs>
  )
})
