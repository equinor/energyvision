import * as React from 'react'
import { forwardRef, HTMLAttributes } from 'react'
import { Card } from '@equinor/eds-core-react'

const { Media: EdsMedia } = Card

export type MediaProps = HTMLAttributes<HTMLDivElement>

export const Media = forwardRef<HTMLDivElement, MediaProps>(function Media({ children, ...rest }, ref) {
  return (
    <EdsMedia ref={ref} {...rest}>
      {children}
    </EdsMedia>
  )
})
