import { forwardRef, HTMLAttributes } from 'react'
import type { BackgroundColours, BackgroundTypes, ImageBackground } from '../../../types/types'
import { ColouredContainer } from './ColouredContainer'
import { ImageBackgroundContainer } from './ImageBackgroundContainer'
import { twMerge } from 'tailwind-merge'
import { ColorKeyTokens } from '../../../styles/colorKeyToUtilityMap'

export type BackgroundContainerProps = {
  isInverted?: boolean
  backgroundType?: BackgroundTypes
  imageBackground?: ImageBackground
  //phase in, comes with ColorSelector
  utility?: keyof ColorKeyTokens
  dark?: boolean
  /** Extended tailwind styling */
  twClassName?: string
  //phase out
  background?: BackgroundColours
} & HTMLAttributes<HTMLDivElement>

export const BackgroundContainer = forwardRef<HTMLDivElement, BackgroundContainerProps>(function BackgroundContainer(
  { backgroundType = 'color-regular', imageBackground, children, className, ...rest },
  ref,
) {
  return (
    <>
      {(backgroundType === 'image-scroll-animation' || backgroundType === 'image-regular') && imageBackground && (
        <ImageBackgroundContainer
          ref={ref}
          {...imageBackground}
          className={twMerge('dark', className)}
          useScrollAnimation={backgroundType === 'image-scroll-animation' ? true : false}
        >
          {children}
        </ImageBackgroundContainer>
      )}
      {(backgroundType === 'color-regular' || !backgroundType) && (
        <ColouredContainer className={className} {...rest}>
          {children}
        </ColouredContainer>
      )}
    </>
  )
})
