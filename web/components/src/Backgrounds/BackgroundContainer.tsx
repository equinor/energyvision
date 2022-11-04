import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import styled from 'styled-components'
import type { StyleVariants } from './backgroundColours'
import { getStyleVariant } from './backgroundColours'
import type { BackgroundColours } from '../../../types/types'

export type BackgroundContainerProps = {
  background?: BackgroundColours
  disableContainerWrapper?: boolean
} & HTMLAttributes<HTMLDivElement>

type ColourContainerProps = {
  styleVariant?: StyleVariants
  isInverted: boolean
  colourWrapper: string
}

const ColourContainer = styled.div.attrs<ColourContainerProps>(({ isInverted, colourWrapper }) =>
  isInverted
    ? {
        className: `inverted-background ${colourWrapper}`,
      }
    : {
        className: colourWrapper,
      },
)<ColourContainerProps>`
  background-color: var(--background-color);
`

// @TODO: Can we map colours in a better way? Duplicate code atm
const backgrounds: { [name: string]: string } = {
  none: 'var(--ui-background-default)',
  one: 'var(--moss-green-70)',
  two: 'var(--moss-green-50)',
  three: 'var(--spruce-wood-90)',
  four: 'var(--mist-blue-100)',
  five: 'var(--slate-blue-100)',
}

export const getBackgroundByColorName = (name: BackgroundColours) => {
  const styleVariant = getStyleVariant(name)
  return backgrounds[styleVariant]
}

export const BackgroundContainer = forwardRef<HTMLDivElement, BackgroundContainerProps>(function BackgroundContainer(
  { background = 'White', disableContainerWrapper = false, style, children, ...rest },
  ref,
) {
  // @TODO: Find a better way with task #334
  const styleVariant = getStyleVariant(background)
  const isInverted = styleVariant === 'five'

  return (
    <ColourContainer
      isInverted={isInverted}
      colourWrapper={disableContainerWrapper ? '' : `background-${styleVariant}`}
      style={{ ...style, '--background-color': backgrounds[styleVariant] } as CSSProperties}
      ref={ref}
      {...rest}
    >
      {children}
    </ColourContainer>
  )
})
