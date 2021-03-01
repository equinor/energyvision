import * as React from 'react'
import { forwardRef, HTMLAttributes } from 'react'
import { Card, Typography } from '@equinor/eds-core-react'
import styled from 'styled-components'

const { HeaderTitle: EdsHeaderTitle } = Card

const StyledTitle = styled(EdsHeaderTitle)`
  padding: 0 1rem;
`

export type TitleProps = {
  /* Header level */
  level?: 'h2' | 'h3' | 'h4' | 'h5'
  eyebrow?: string
} & HTMLAttributes<HTMLHeadingElement>

export const Title = forwardRef<HTMLDivElement, TitleProps>(function CardMedia(
  { level = 'h3', eyebrow, children, ...rest },
  ref,
) {
  return (
    <StyledTitle ref={ref} {...rest}>
      {eyebrow && (
        <Typography variant="overline" as="span">
          {eyebrow}
        </Typography>
      )}
      <Typography variant={level}>{children}</Typography>
    </StyledTitle>
  )
})
