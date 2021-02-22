import * as React from 'react'
import { forwardRef, HTMLAttributes } from 'react'
import { Card } from '@equinor/eds-core-react'

const { HeaderTitle: EdsHeaderTitle } = Card

export type CardTitleProps = HTMLAttributes<HTMLDivElement>

export const Title = forwardRef<HTMLDivElement, CardTitleProps>(function CardMedia({ children, ...rest }, ref) {
  return (
    <EdsHeaderTitle ref={ref} {...rest}>
      {children}
    </EdsHeaderTitle>
  )
})
