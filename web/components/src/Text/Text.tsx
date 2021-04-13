import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import { Typography } from '@equinor/eds-core-react'
import styled from 'styled-components'

const StyledText = styled(Typography)`
  font-size: var(--size);
  line-height: var(--lineHeight-3);
  & + & {
    margin: var(--spacing-medium) 0;
  }
`

export type TextProps = {
  size?: 'regular' | 'md'
  bold?: boolean
  italic?: boolean
} & HTMLAttributes<HTMLHeadingElement>

/* Should be easy enough to change later on */
const sizes = {
  regular: 'var(--typeScale-1)',
  md: 'var(--typeScale-2)',
}

export const Text = forwardRef<HTMLDivElement, TextProps>(function Text(
  { size = 'regular', style, children, ...rest },
  ref,
) {
  return (
    <StyledText
      ref={ref}
      style={
        {
          ...style,
          '--size': sizes[size],
        } as CSSProperties
      }
      {...rest}
    >
      {children}
    </StyledText>
  )
})
