import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { normal, inverted } from '../../../styles/themes'
import type { BackgroundColours, BackgroundTypes, ImageBackground } from '../../../types/index'
import { ColouredContainer } from './ColouredContainer'
import { ImageBackgroundContainer } from './ImageBackgroundContainer'
import { ColorKeyTokens } from '../../../styles/colorKeyToUtilityMap'

const StyledImageBackground = styled(ImageBackgroundContainer)<{ $isInverted: boolean }>`
  ${({ $isInverted }) => ($isInverted ? inverted : normal)}
`

export type BackgroundContainerProps = {
  background?: {
    type?: BackgroundTypes
    backgroundColor?: BackgroundColours
    backgroundImage?: ImageBackground
    backgroundUtility?: keyof ColorKeyTokens
    dark?: boolean
  }
  /** Render fragment if true and background color
   * is white and no id/anchor is set on it
   * @default false
   */
  renderFragmentWhenPossible?: boolean
  /** Extended tailwind styling */
  twClassName?: string
} & HTMLAttributes<HTMLDivElement>

export const BackgroundContainer = forwardRef<HTMLDivElement, BackgroundContainerProps>(function BackgroundContainer(
  { background, style, children, className, twClassName = '', id, renderFragmentWhenPossible = false, ...rest },
  ref,
) {
  const { backgroundImage, type, ...restBackground } = background || {}

  return (
    <>
      {type === 'backgroundImage' && backgroundImage && (
        <StyledImageBackground
          $isInverted={backgroundImage?.useLight ? false : true}
          ref={ref}
          id={id}
          {...backgroundImage}
          {...rest}
        >
          {children}
        </StyledImageBackground>
      )}
      {(type === 'backgroundColor' || !type) && (
        <>
          {renderFragmentWhenPossible &&
          (restBackground?.backgroundColor === 'White' || restBackground?.backgroundUtility === 'white-100') &&
          className === '' &&
          !id ? (
            <>{children}</>
          ) : (
            <ColouredContainer
              ref={ref}
              id={id}
              {...restBackground}
              style={style}
              className={`${className} ${twClassName}`}
              {...rest}
            >
              {children}
            </ColouredContainer>
          )}
        </>
      )}
    </>
  )
})
