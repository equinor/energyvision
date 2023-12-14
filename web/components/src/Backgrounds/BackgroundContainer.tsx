import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import styled from 'styled-components'
import { getContainerColor, isInvertedStyle } from '../../utils/backgroundColours'
import type { BackgroundColours } from '../../../types/types'

export type BackgroundContainerProps = {
  background?: BackgroundColours
  disableContainerWrapper?: boolean
} & HTMLAttributes<HTMLDivElement>

type ColourContainerProps = {
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

export const BackgroundContainer = forwardRef<HTMLDivElement, BackgroundContainerProps>(function BackgroundContainer(
  { background = 'White', disableContainerWrapper = false, style, children, ...rest },
  ref,
) {
  // @TODO: Find a better way with task #334
  const styleVariant = getContainerColor(background)
  const isInverted = isInvertedStyle(styleVariant)

  return (
    <ColourContainer
      isInverted={isInverted}
      colourWrapper={disableContainerWrapper ? '' : `background${styleVariant}`}
      style={{ ...style, '--background-color': `var(${styleVariant})` } as CSSProperties}
      ref={ref}
      {...rest}
    >
      {children}
    </ColourContainer>
  )
})
