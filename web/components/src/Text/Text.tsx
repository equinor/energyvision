import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import { Typography } from '@equinor/eds-core-react'
import styled from 'styled-components'

const StyledText = styled(Typography)``

export type TextProps = {
  size: 'normal' | 'lg'
} & HTMLAttributes<HTMLHeadingElement>

/* Should be easy enough to change later on */

export const Text = forwardRef<HTMLDivElement, TextProps>(function Text({ style, children, ...rest }, ref) {
  return (
    <StyledText
      ref={ref}
      style={
        {
          ...style,
        } as CSSProperties
      }
      {...rest}
    >
      {children}
    </StyledText>
  )
})
