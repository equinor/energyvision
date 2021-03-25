import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import { Typography, TypographyProps } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { style } from '@equinor/eds-icons'

const StyledHeading = styled(Typography)<TypographyProps>`
  font-size: var(--size);
  line-height: var(--line-height);
  font-weight: var(--font-weight);
`

export type HeadingProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  regular?: boolean
} & HTMLAttributes<HTMLHeadingElement>

/* Should be easy enough to change later on */
const sizes = {
  xs: 'var(--typeScale-0)',
  sm: 'var(--typeScale-1)',
  md: 'var(--typeScale-2)',
  lg: 'var(--typeScale-3)',
  xl: 'var(--typeScale-4)',
  '2xl': 'var(--typeScale-5)',
}

const lineHeights = {
  xs: 'var(--lineHeight-2)',
  sm: 'var(--lineHeight-1)',
  md: 'var(--lineHeight-1)',
  lg: 'var(--lineHeight-1)',
  xl: 'var(--lineHeight-1)',
  '2xl': 'var(--lineHeight-2)',
}

const fontWeights = {
  xs: 'var(--fontWeight-regular)',
  sm: 'var(--fontWeight-regular)',
  md: 'var(--fontWeight-regular)',
  lg: 'var(--fontWeight-medium)',
  xl: 'var(--fontWeight-medium)',
  '2xl': 'var(--fontWeight-bold)',
}

export const Heading = forwardRef<HTMLDivElement, HeadingProps>(function Heading(
  { size = 'lg', level = 'h3', regular = false, children, ...rest },
  ref,
) {
  return (
    <StyledHeading
      variant={level}
      ref={ref}
      style={
        {
          ...style,
          '--size': sizes[size],
          '--line-height': lineHeights[size],
          '--font-weight': size === '2xl' && regular ? 'var(--fontWeight-regular)' : fontWeights[size],
        } as CSSProperties
      }
      {...rest}
    >
      {children}
    </StyledHeading>
  )
})
