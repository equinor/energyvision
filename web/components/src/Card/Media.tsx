import * as React from 'react'
import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type MediaProps = {} & HTMLAttributes<HTMLDivElement>

const StyledMedia = styled.div<MediaProps>``

export const Media = forwardRef<HTMLDivElement, MediaProps>(function CardMedia({ children, ...rest }, ref) {
  const props = {
    ...rest,
    ref,
  }

  return <StyledMedia {...props}>{children}</StyledMedia>
})
