import * as React from 'react'
import { forwardRef, HTMLAttributes } from 'react'
import { Card } from '@equinor/eds-core-react'

const { Header: EdsHeader } = Card

export type HeaderProps = HTMLAttributes<HTMLDivElement>

export const Header = forwardRef<HTMLDivElement, HeaderProps>(function Media({ children, ...rest }, ref) {
  const props = {
    ...rest,
    ref,
  }

  return <EdsHeader {...props}>{children}</EdsHeader>
})
