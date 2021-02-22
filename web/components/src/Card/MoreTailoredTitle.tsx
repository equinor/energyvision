import * as React from 'react'
import { forwardRef, HTMLAttributes } from 'react'
import { Card, Typography } from '@equinor/eds-core-react'

const { HeaderTitle: EdsHeaderTitle } = Card

export type TitleProps = {
  /* Header level */
  level?: 'h2' | 'h3' | 'h4' | 'h5'
  eyebrow?: string
} & HTMLAttributes<HTMLHeadingElement>

export const TailoredTitle = forwardRef<HTMLDivElement, TitleProps>(function CardMedia(
  { level = 'h3', eyebrow, children, ...rest },
  ref,
) {
  return (
    <EdsHeaderTitle ref={ref} {...rest}>
      {eyebrow && (
        <Typography variant="overline" as="span">
          {eyebrow}
        </Typography>
      )}
      <Typography variant={level}>{children}</Typography>
    </EdsHeaderTitle>
  )
})
