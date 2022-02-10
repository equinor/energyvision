import { forwardRef } from 'react'

import { Tab as RTab, TabProps as RTabProps } from '@reach/tabs'

export type TabProps = RTabProps

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab({ children, ...rest }, ref) {
  return (
    <RTab ref={ref} {...rest}>
      {children}
    </RTab>
  )
})
