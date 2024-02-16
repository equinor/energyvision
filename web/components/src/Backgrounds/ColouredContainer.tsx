import styled from 'styled-components'
import { normal, inverted } from '../../../styles/themes'
import { getColorOnContainer, getContainerColor, isInvertedStyle } from '../../utils/backgroundColours'
import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import { BackgroundColours } from '../../../types/types'

type ColouredContainerProps = {
  background?: BackgroundColours
} & HTMLAttributes<HTMLDivElement>
type ColourContainerProps = {
  isInverted: boolean
} & HTMLAttributes<HTMLDivElement>

const ColourContainer = styled.div<ColourContainerProps>`
  container: size;
  background-color: var(--background-color);
  color: var(--color-on-background);
  ${({ isInverted }) => (isInverted ? inverted : normal)}
`

export const ColouredContainer = forwardRef<HTMLDivElement, ColouredContainerProps>(function BackgroundContainer(
  { background = 'White', style, children, className, ...rest },
  ref,
) {
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
