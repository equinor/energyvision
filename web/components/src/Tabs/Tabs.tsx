import { forwardRef } from 'react'

import { Tabs as RTabs, TabsProps as RTabsProps } from '@reach/tabs'

export type TabsProps = RTabsProps

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs({ children, ...rest }, ref) {
  return (
    <RTabs ref={ref} {...rest}>
      {children}
    </RTabs>
  )
})
