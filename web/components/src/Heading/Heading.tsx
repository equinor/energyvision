import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import { Typography } from '@equinor/eds-core-react'
import styled from 'styled-components'

type StyledHeadingProps = {
  $center: boolean
} & HTMLAttributes<HTMLHeadingElement>

const StyledHeading = styled(Typography)<StyledHeadingProps>`
  font-size: var(--size);
  line-height: var(--line-height);
  font-weight: var(--font-weight);

  text-transform: var(--text-transform);
  ${({ $center }) =>
    $center && {
      textAlign: 'center',
    }}
  color: var(--color-on-background);
`

export type HeadingProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  regular?: boolean
  center?: boolean
  uppercase?: boolean
} & HTMLAttributes<HTMLHeadingElement>

/* Should be easy enough to change later on */
const sizes = {
  xs: 'var(--typeScale-0)',
  sm: 'var(--typeScale-1)',
  md: 'var(--typeScale-2)',
  lg: 'var(--typeScale-3)',
  xl: 'var(--typeScale-4)',
  '2xl': 'var(--typeScale-4_5)',
  '3xl': 'var(--typeScale-5)',
  '4xl': 'var(--typeScale-6)',
  '5xl': 'var(--typeScale-7)',
}

const lineHeights = {
  xs: 'var(--lineHeight-2)',
  sm: 'var(--lineHeight-1)',
  md: 'var(--lineHeight-1)',
  lg: 'var(--lineHeight-1)',
  xl: 'var(--lineHeight-1)',
  '2xl': 'var(--lineHeight-2_5)',
  '3xl': 'var(--lineHeight-2)',
  '4xl': 'var(--lineHeight-2)',
  '5xl': 'var(--lineHeight-2)',
}

const fontWeights = {
  xs: 'var(--fontWeight-regular)',
  sm: 'var(--fontWeight-regular)',
  md: 'var(--fontWeight-regular)',
  lg: 'var(--fontWeight-regular)',
  xl: 'var(--fontWeight-regular)',
  '2xl': 'var(--fontWeight-regular)',
  '3xl': 'var(--fontWeight-regular)',
  '4xl': 'var(--fontWeight-regular)',
  '5xl': 'var(--fontWeight-regular)',
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  {
    size = 'lg',
    level = 'h3',
    regular = false,
    center = false,
    uppercase = false,
    style,
    children,
    className = '',
    ...rest
  },
  ref,
) {
  return (
    <StyledHeading
      id={level === 'h1' ? 'mainTitle' : undefined}
      variant={level}
      ref={ref}
      $center={center}
      style={
        {
          '--size': sizes[size],
          '--line-height': lineHeights[size],
          '--text-transform': uppercase ? 'uppercase' : 'none',
          '--font-weight': regular ? 'var(--fontWeight-regular)' : fontWeights[size],
          ...style,
        } as CSSProperties
      }
      className={className}
      {...rest}
    >
      {children}
    </StyledHeading>
  )
})
