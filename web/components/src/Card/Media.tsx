import * as React from 'react'
import { forwardRef, HTMLAttributes } from 'react'
import { Card } from '@equinor/eds-core-react'

const { Media: EdsMedia } = Card

export type CardMediaProps = HTMLAttributes<HTMLDivElement>

export const Media = forwardRef<HTMLDivElement, CardMediaProps>(function Media({ children, ...rest }, ref) {
  return (
    <EdsMedia ref={ref} {...rest}>
      {children}
    </EdsMedia>
  )
})
