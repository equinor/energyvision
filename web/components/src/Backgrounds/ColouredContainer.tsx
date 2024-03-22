import styled from 'styled-components'
import { normal, inverted } from '../../../styles/themes'
import { getContainerColor, isInvertedStyle } from '../../utils/backgroundColours'
import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import { BackgroundColours } from '../../../types/types'
import { colorKeyToUtilityMap } from '../../../styles/colorKeyToUtilityMap'
import { twMerge } from 'tailwind-merge'

type ColouredContainerProps = {
  background?: BackgroundColours
  //phase in, comes with ColorSelector
  utility?: keyof typeof colorKeyToUtilityMap
  dark?: boolean
} & HTMLAttributes<HTMLDivElement>

type ColourContainerProps = {
  $isInverted: boolean
  $hasUtility: boolean
} & HTMLAttributes<HTMLDivElement>

const ColourContainer = styled.div<ColourContainerProps>`
  container: size;

  color: var(--color-on-background);
  ${({ $isInverted }) => ($isInverted ? inverted : normal)}
  ${({ $hasUtility }) => ($hasUtility ? '' : 'background-color: var(--background-color);')}
`

export const ColouredContainer = forwardRef<HTMLDivElement, ColouredContainerProps>(function BackgroundContainer(
  { background, utility, dark, style, children, className, ...rest },
  ref,
) {
  // After a while with TW, this isDark should be removed and only use dark from designOptions for dark
  const isDark = dark || background === 'Mid Blue' || background === 'Slate Blue' || background === 'Slate Blue 95'
  const textColor = isDark ? '--inverted-text' : '--default-text'
  const styleVariant = getContainerColor(background)
  const isInverted = isInvertedStyle(styleVariant)

  return (
    <ColourContainer
      className={twMerge(
        `${className ?? ''} background${styleVariant} ${isDark ? 'dark' : ''} ${
          utility ? colorKeyToUtilityMap[utility]?.background : ''
        }`,
      )}
      $isInverted={isInverted}
      $hasUtility={!!utility}
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
