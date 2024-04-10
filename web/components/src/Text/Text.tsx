import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import { Typography, TypographyProps } from '@equinor/eds-core-react'
import styled from 'styled-components'

type StyledTextProps = {
  centered?: boolean
}

const StyledText = styled(Typography)<StyledTextProps>`
  font-size: var(--size);
  line-height: var(--lineHeight);
  /* @TODO: Let's consider to move all the margin woo to the article layout
  We should. Not move, but scope. For both news and topic pages. But this will
  require a lot of retest, since in some of the uses cases we will need to reintroduce the margin */
  margin-bottom: var(--space-medium);
  & + & {
    margin: var(--space-medium) 0;
  }

  /* If the text block is within a figcaption, we don't want the bottom margin */
  .figCaption > &:last-child {
    margin-bottom: 0;
  }

  ${({ centered }) =>
    centered && {
      textAlign: 'center',
    }}
  color: var(--color-on-background);
`

export type TextProps = {
  size?: 'regular' | 'md' | 'small' | 'lg'
  lineHeight?: '1' | '2' | '2_5' | '3'
  bold?: boolean
  italic?: boolean
  centered?: boolean
} & HTMLAttributes<HTMLHeadingElement> &
  TypographyProps

/* Should be easy enough to change later on */
const sizes = {
  lg: 'var(--typeScale-4_5)',
  regular: 'var(--typeScale-1)',
  md: 'var(--typeScale-2)',
  small: 'var(--typeScale-0)',
}

const lineHeights = {
  1: 'var(--lineHeight-1)',
  2: 'var(--lineHeight-2)',
  '2_5': 'var(--lineHeight-2_5)',
  3: 'var(--lineHeight-3)',
}

export const Text = forwardRef<HTMLDivElement, TextProps>(function Text(
  { size = 'regular', lineHeight = '3', style, children, ...rest },
  ref,
) {
  return (
    <StyledText
      ref={ref}
      style={
        {
          ...style,
          '--size': sizes[size],
          '--lineHeight': lineHeights[lineHeight],
        } as CSSProperties
      }
      {...rest}
    >
      {children}
    </StyledText>
  )
})
