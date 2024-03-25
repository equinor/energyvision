import { forwardRef, HTMLAttributes } from 'react'
import type { BackgroundColours, BackgroundTypes, ImageBackground } from '../../../types/types'
import { ColouredContainer } from './ColouredContainer'
import { ImageBackgroundContainer } from './ImageBackgroundContainer'
import { ColorKeyTokens } from '../../../styles/colorKeyToUtilityMap'

export type BackgroundContainerProps = {
  background?: {
    type?: BackgroundTypes
    backgroundColor?: BackgroundColours
    backgroundImage?: ImageBackground
    backgroundUtility?: keyof ColorKeyTokens
    dark: boolean
  }
  /** Extended tailwind styling */
  twClassName?: string
} & HTMLAttributes<HTMLDivElement>

export const BackgroundContainer = forwardRef<HTMLDivElement, BackgroundContainerProps>(function BackgroundContainer(
  { background, style, children, className, twClassName = '', ...rest },
  ref,
) {
  const { backgroundImage, type, ...restBackground } = background || {}
  return (
    <>
      {type === 'backgroundImage' && backgroundImage ? (
        <ImageBackgroundContainer ref={ref} {...backgroundImage}>
          {children}
        </ImageBackgroundContainer>
      ) : (
        <ColouredContainer
          ref={ref}
          {...restBackground}
          style={style}
          className={`${className} ${twClassName}`}
          {...rest}
        >
          {children}
        </ColouredContainer>
      )}
    </>
  )
})
