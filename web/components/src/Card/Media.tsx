import * as React from 'react'
import { forwardRef, HTMLAttributes } from 'react'
import { Card } from '@equinor/eds-core-react'

const { CardMedia } = Card

export type MediaProps = HTMLAttributes<HTMLDivElement>

export const Media = forwardRef<HTMLDivElement, MediaProps>(function Media({ children, ...rest }, ref) {
  const props = {
    ...rest,
    ref,
  }

  return <CardMedia {...props}>{children}</CardMedia>
})
