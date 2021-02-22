import * as React from 'react'
import { forwardRef, HTMLAttributes } from 'react'
import { Card } from '@equinor/eds-core-react'

const { Header: EdsHeader } = Card

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>

export const Header = forwardRef<HTMLDivElement, CardHeaderProps>(function Media({ children, ...rest }, ref) {
  return (
    <EdsHeader ref={ref} {...rest}>
      {children}
    </EdsHeader>
  )
})
