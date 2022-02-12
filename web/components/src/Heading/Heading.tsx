import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import { Typography } from '@equinor/eds-core-react'
import styled from 'styled-components'

type StyledHeadingProps = {
  center: boolean
  inverted: boolean
}

const StyledHeading = styled(Typography)<StyledHeadingProps>`
  font-size: var(--size);
  line-height: var(--line-height);
  font-weight: var(--font-weight);

  text-transform: var(--text-transform);
  ${({ center }) =>
    center && {
      textAlign: 'center',
    }}

  ${({ inverted }) =>
    inverted && {
      color: 'var(--inverted-text)',
    }}

  /* If the heading is used inside a inverted component, the text colour must also be inverted */
  .inverted-background & {
    color: var(--inverted-text);
  }
`

export type HeadingProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  regular?: boolean
  weight?: number
  center?: boolean
  inverted?: boolean
  uppercase?: boolean
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
  lg: 'var(--fontWeight-regular)',
  xl: 'var(--fontWeight-regular)',
  '2xl': 'var(--fontWeight-regular)',
}

export const Heading = forwardRef<HTMLDivElement, HeadingProps>(function Heading(
  {
    size = 'lg',
    level = 'h3',
    regular = false,
    center = false,
    inverted = false,
    uppercase = false,
    style,
    children,
    ...rest
  },
  ref,
) {
  return (
    <StyledHeading
      variant={level}
      ref={ref}
      center={center}
      inverted={inverted}
      style={
        {
          '--size': sizes[size],
          '--line-height': lineHeights[size],
          '--text-transform': uppercase ? 'uppercase' : 'none',
          '--font-weight': regular ? 'var(--fontWeight-regular)' : fontWeights[size],
          ...style,
        } as CSSProperties
      }
      {...rest}
    >
      {children}
    </StyledHeading>
  )
})
