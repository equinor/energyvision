import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import styled from 'styled-components'
import type { StyleVariants } from './backgroundColours'
import { getStyleVariant } from './backgroundColours'

type BackgroundColours = 'White' | 'Moss Green' | 'Lichen Green' | 'Spruce Wood' | 'Mist Blue' | 'Slate Blue'

export type BackgroundContainerProps = {
  background?: BackgroundColours
} & HTMLAttributes<HTMLDivElement>

type ColourContainerProps = {
  styleVariant?: StyleVariants
  isInverted: boolean
}

const ColourContainer = styled.div.attrs<ColourContainerProps>(
  ({ isInverted }) =>
    isInverted && {
      className: 'inverted-background',
    },
)<ColourContainerProps>`
  background-color: var(--background-color);
`

export const BackgroundContainer = forwardRef<HTMLDivElement, BackgroundContainerProps>(function BackgroundContainer(
  { background = 'White', style, children, ...rest },
  ref,
) {
  // @TODO: Find a better way with task #334
  const styleVariant = getStyleVariant(background)
  const isInverted = styleVariant === 'five'

  // @TODO: Can we map colours in a better way? Duplicate code atm
  const backgrounds: { [name: string]: string } = {
    none: 'var(--ui-background-default)',
    one: 'var(--moss-green-80)',
    two: 'var(--lichen-green-100)',
    three: 'var(--spruce-wood-90)',
    four: 'var(--mist-blue-100)',
    five: 'var(--slate-blue-100)',
  }

  return (
    <ColourContainer
      isInverted={isInverted}
      style={{ ...style, '--background-color': backgrounds[styleVariant] } as CSSProperties}
      ref={ref}
      {...rest}
    >
      {children}
    </ColourContainer>
  )
})
