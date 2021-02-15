import * as React from 'react'
import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type TitleProps = {
  /** Header level */
  level?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
} & HTMLAttributes<HTMLDivElement>

const StyledTitle = styled.div`
  font-weight: bold;
`

export const Title = forwardRef<HTMLDivElement, TitleProps>(function CardMedia(
  { level = 'h3', children, ...rest },
  ref,
) {
  return (
    <StyledTitle as={level} ref={ref} {...rest}>
      {children}
    </StyledTitle>
  )
})
