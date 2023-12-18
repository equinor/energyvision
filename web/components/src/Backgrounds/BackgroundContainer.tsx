import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import styled from 'styled-components'
import { getColorOnContainer, getContainerColor, isInvertedStyle } from '../../utils/backgroundColours'
import type { BackgroundColours } from '../../../types/types'
import { normalStyle, invertedStyle } from '../../../styles/backgroundThemes'

export type BackgroundContainerProps = {
  background?: BackgroundColours
  disableContainerWrapper?: boolean
} & HTMLAttributes<HTMLDivElement>

type ColourContainerProps = {
  isInverted: boolean
  colourWrapper: string
}

const ColourContainer = styled.div.attrs<ColourContainerProps>(
  ({ colourWrapper }) =>
    colourWrapper && {
      className: colourWrapper,
    },
)<ColourContainerProps>`
  background-color: var(--background-color);
  color: var(--color-on-background) !important;
  ${({ isInverted }) => (isInverted ? invertedStyle : normalStyle)}
`

export const BackgroundContainer = forwardRef<HTMLDivElement, BackgroundContainerProps>(function BackgroundContainer(
  { background = 'White', disableContainerWrapper = false, style, children, ...rest },
  ref,
) {
  // @TODO: Find a better way with task #334
  const styleVariant = getContainerColor(background)
  const textColor = getColorOnContainer(background)
  const isInverted = isInvertedStyle(styleVariant)

  return (
    <ColourContainer
      className={`background${styleVariant}`}
      isInverted={isInverted}
      colourWrapper={disableContainerWrapper ? '' : `background${styleVariant}`}
      style={
        {
          ...style,
          '--background-color': `var(${styleVariant})`,
          '--color-on-background': `var(${textColor})`,
        } as CSSProperties
      }
      ref={ref}
      {...rest}
    >
      {children}
    </ColourContainer>
  )
})
