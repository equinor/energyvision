import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import styled from 'styled-components'

export type TeaserProps = {
  /** Define some good names for this */
  styleVariant?: 'none' | 'one' | 'two' | 'three' | 'four' | 'five'
} & HTMLAttributes<HTMLElement>

type StyledTeaserProps = {
  isInverted: boolean
}

export const StyledTeaser = styled.article.attrs<StyledTeaserProps>(
  ({ isInverted }) =>
    isInverted && {
      className: 'inverted',
    },
)<StyledTeaserProps>`
  background-color: var(--background-color);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content;
  max-height: 800px;
  grid-template-areas:
    'image'
    'content';

  /* Hardcoded value while waiting for the w3c proposal for environment() */
  @media (min-width: 750px) {
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: min-content;
  }
`
// @TODO: Color naming
const backgrounds: { [name: string]: string } = {
  none: 'var(--ui-background-default)',
  one: 'var(--moss-green-80)',
  two: 'var(--lichen-green-100)',
  three: 'var(--spruce-wood-90)',
  four: 'var(--mist-blue-100)',
  five: 'var(--slate-blue-100)',
}

export const Teaser = forwardRef<HTMLDivElement, TeaserProps>(function Teaser(
  { styleVariant = 'none', style, children, ...rest },
  ref,
) {
  const isInverted = styleVariant === 'five'
  return (
    <StyledTeaser
      ref={ref}
      isInverted={isInverted}
      style={{ ...style, '--background-color': backgrounds[styleVariant] } as CSSProperties}
      {...rest}
    >
      {children}
    </StyledTeaser>
  )
})
