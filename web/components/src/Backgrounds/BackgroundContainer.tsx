import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import styled from 'styled-components'
import { getColorOnContainer, getContainerColor, isInvertedStyle } from '../../utils/backgroundColours'
import type { BackgroundColours } from '../../../types/types'
import { normalStyle, invertedStyle } from '../../../styles/backgroundThemes'

export type BackgroundContainerProps = {
  background?: BackgroundColours
} & HTMLAttributes<HTMLDivElement>

type ColourContainerProps = {
  isInverted: boolean
} & HTMLAttributes<HTMLDivElement>

const ColourContainer = styled.div<ColourContainerProps>`
  background-color: var(--background-color);
  color: var(--color-on-background) !important;
  ${({ isInverted }) => (isInverted ? invertedStyle : normalStyle)}
`

export const BackgroundContainer = forwardRef<HTMLDivElement, BackgroundContainerProps>(function BackgroundContainer(
  { background = 'White', style, children, className, ...rest },
  ref,
) {
  // @TODO: Find a better way with task #334
  const styleVariant = getContainerColor(background)
  const textColor = getColorOnContainer(background)
  const isInverted = isInvertedStyle(styleVariant)

  return (
    <ColourContainer
      className={className + ` background${styleVariant}`}
      isInverted={isInverted}
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
