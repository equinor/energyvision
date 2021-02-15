import * as React from 'react'
import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type EyebrowProps = {} & HTMLAttributes<HTMLDivElement>

const StyledEyebrow = styled.div`
  text-transform: uppercase;
`

export const Eyebrow = forwardRef<HTMLDivElement, EyebrowProps>(function CardMedia({ children, ...rest }, ref) {
  const props = {
    ...rest,
    ref,
  }

  return <StyledEyebrow {...props}>{children}</StyledEyebrow>
})
