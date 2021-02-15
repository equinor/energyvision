import * as React from 'react'
import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type TitleProps = HTMLAttributes<HTMLDivElement>

const StyledTitle = styled.div`
  font-weight: bold;
`

export const Title = forwardRef<HTMLDivElement, TitleProps>(function CardMedia({ children, ...rest }, ref) {
  const props = {
    ...rest,
    ref,
  }

  return <StyledTitle {...props}>{children}</StyledTitle>
})
