import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import { Typography, TypographyProps } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { StyledFigCaption } from '../FigureCaption'

type StyledTextProps = {
  centered?: boolean
  inverted?: boolean
}

const StyledText = styled(Typography)<StyledTextProps>`
  font-size: var(--size);
  line-height: var(--lineHeight-3);
  /* @TODO: Let's consider to move all the margin woo to the article layout
  We should. Not move, but scope. For both news and topic pages. But this will
  require a lot of retest, since in some of the uses cases we will need to reintroduce the margin */
  margin-bottom: var(--space-medium);
  & + & {
    margin: var(--space-medium) 0;
  }

  /* If the text block is within a figcaption, we don't want the bottom margin */
  ${StyledFigCaption} &:last-child {
    margin-bottom: 0;
  }

  ${({ centered }) =>
    centered && {
      textAlign: 'center',
    }}

  ${({ inverted }) =>
    inverted && {
      color: 'var(--inverted-text)',
    }}

  /* If the text is used inside a inverted component, the text colour must also be inverted */
  .inverted-background & {
    color: var(--inverted-text);
  }
`

export type TextProps = {
  size?: 'regular' | 'md' | 'small' | 'lg'
  bold?: boolean
  italic?: boolean
  centered?: boolean
  inverted?: boolean
} & HTMLAttributes<HTMLHeadingElement> &
  TypographyProps

/* Should be easy enough to change later on */
const sizes = {
  lg: 'var(--typeScale-4_5)',
  regular: 'var(--typeScale-1)',
  md: 'var(--typeScale-2)',
  small: 'var(--typeScale-0)',
}

export const Text = forwardRef<HTMLDivElement, TextProps>(function Text(
  { size = 'regular', style, children, inverted = false, ...rest },
  ref,
) {
  if (size === 'lg') console.log(ref)

  return (
    <StyledText
      ref={ref}
      inverted={inverted}
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
