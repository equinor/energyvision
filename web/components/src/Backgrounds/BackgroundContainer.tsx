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

export const getHexFromColorName = (color?: BackgroundColours) => {
  switch (color) {
    case 'Moss Green':
      return '#a8cfd1'
    case 'Moss Green Light':
      return '#f2f7f8'
    case 'Spruce Wood':
      return '#ffede0'
    case 'Mist Blue':
      return '#d7ebf4'
    case 'Slate Blue':
      return '#182530'
    case 'White':
    default:
      return '#ffffff'
  }
}

export function getFontColorForBg(bgColor?: BackgroundColours): string {
  const hex = getHexFromColorName(bgColor)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [r, g, b] = hex
    .replace(/^#/, '')
    .match(/.{2}/g)!
    .map((h) => parseInt(h, 16) / 255)
  const luminance = [0.2126, 0.7152, 0.0722].reduce(
    (acc, v, i) =>
      acc + v * ([r, g, b][i] <= 0.03928 ? [r, g, b][i] / 12.92 : Math.pow(([r, g, b][i] + 0.055) / 1.055, 2.4)),
    0,
  )
  return luminance > 0.5 ? 'var(--default-text)' : 'var(--inverted-text)'
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
