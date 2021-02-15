import * as React from 'react'
import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type ContentProps = HTMLAttributes<HTMLDivElement>

const StyledContent = styled.div``

export const Content = forwardRef<HTMLDivElement, ContentProps>(function CardMedia({ children, ...rest }, ref) {
  const props = {
    ...rest,
    ref,
  }

  return <StyledContent {...props}>{children}</StyledContent>
})
