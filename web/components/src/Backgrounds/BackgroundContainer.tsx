import { forwardRef, HTMLAttributes } from 'react'
import type { BackgroundColours, ImageBackground } from '../../../types/types'
import { ColouredContainer } from './ColouredContainer'
import { ImageBackgroundContainer } from './ImageBackgroundContainer'
import { twMerge } from 'tailwind-merge'
import { colorKeyToUtilityMap } from '../../../styles/colorKeyToUtilityMap'

type BackgroundContainerProps = {
  isInverted?: boolean
  backgroundColor?: BackgroundColours
  imageBackground?: ImageBackground
  useScrollAnimation?: boolean
  utility: keyof typeof colorKeyToUtilityMap
  dark: boolean
  /** Extended tailwind styling */
  twClassName?: string
} & HTMLAttributes<HTMLDivElement>

export const BackgroundContainer = forwardRef<HTMLDivElement, BackgroundContainerProps>(function BackgroundContainer(
  {
    backgroundColor,
    useScrollAnimation = false,
    imageBackground,
    style,
    dark,
    utility,
    children,
    className,
    twClassName = '',
    ...rest
  },
  ref,
) {
  // After a while with TW, this isDark should be removed and only use dark from designOptions for dark
  const isDark = dark || backgroundColor === 'Mid Blue' || backgroundColor === 'Slate Blue' || useScrollAnimation
  const bgColor = backgroundColor || 'White'

  return (
    <>
      {useScrollAnimation && imageBackground ? (
        <div
          ref={ref}
          style={style}
          className={twMerge(`${className} ${twClassName} ${isDark ? 'dark' : ''}`)}
          {...rest}
        >
          <ImageBackgroundContainer
            image={imageBackground.image}
            useAnimation={imageBackground.useAnimation}
            contentAlignment={imageBackground.contentAlignment}
          >
            {children}
          </ImageBackgroundContainer>
        </div>
      ) : (
        <ColouredContainer
          background={bgColor}
          style={style}
          className={twMerge(`${className} ${twClassName} ${isDark ? 'dark' : ''}`)}
          {...rest}
        >
          {children}
        </ColouredContainer>
      )}
    </>
  )
})
