import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import { Typography, TypographyProps } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { StyledTeaser } from '../Teaser/Teaser'

const StyledText = styled(Typography)`
  font-size: var(--size);
  line-height: var(--lineHeight-3);
  /* @TODO: Let's consider to move all the margin woo to the article layout */
  margin-bottom: var(--spacing-medium);
  & + & {
    margin: var(--spacing-medium) 0;
  }

  /* If the text is used inside a inverted teaser component, the text colour must also be inverted */
  ${StyledTeaser}.inverted & {
    color: var(--inverted-text);
  }
`

export type TextProps = {
  size?: 'regular' | 'md'
  bold?: boolean
  italic?: boolean
} & HTMLAttributes<HTMLHeadingElement> &
  TypographyProps

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
