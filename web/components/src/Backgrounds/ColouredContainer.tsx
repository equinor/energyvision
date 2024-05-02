import styled from 'styled-components'
import { normal, inverted } from '../../../styles/themes'
import { getContainerColor, isInvertedStyle } from '../../utils/backgroundColours'
import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import { BackgroundColours } from '../../../types/types'
import { ColorKeyTokens, colorKeyToUtilityMap } from '../../../styles/colorKeyToUtilityMap'
import { twMerge } from 'tailwind-merge'

type ColouredContainerProps = {
  backgroundColor?: BackgroundColours
  backgroundUtility?: keyof ColorKeyTokens
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
  { backgroundColor = 'White', backgroundUtility, dark, style, children, className = '', ...rest },
  ref,
) {
  const styleVariant = getContainerColor(backgroundColor)
  const isInverted = isInvertedStyle(styleVariant)
  // After a while with TW, this isDark should be removed and only use dark from designOptions for dark
  const isDark =
    dark || backgroundColor === 'Mid Blue' || backgroundColor === 'Slate Blue' || backgroundColor === 'Slate Blue 95'
  const textColor = isDark ? '--inverted-text' : '--default-text'

  return (
    <ColourContainer
      className={twMerge(
        `${className} background${styleVariant} ${isDark ? 'dark' : ''} ${
          backgroundUtility ? colorKeyToUtilityMap[backgroundUtility]?.background : ''
        }`,
      )}
      $isInverted={isInverted}
      $hasUtility={!!backgroundUtility}
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
