import { forwardRef, HTMLAttributes } from 'react'
import type { BackgroundColours, BackgroundOption } from '../../../types/types'
import { ColouredContainer } from './ColouredContainer'
import { ImageBackgroundContainer } from './ImageBackgroundContainer'

export type BackgroundContainerProps = {
  background?: {
    backgroundColor?: BackgroundColours
    backgroundOption?: BackgroundOption
  }
} & HTMLAttributes<HTMLDivElement>

export const BackgroundContainer = forwardRef<HTMLDivElement, BackgroundContainerProps>(function BackgroundContainer(
  { background, style, children, className, ...rest },
  ref,
) {
  const useSpecialBackground = background?.backgroundOption?.useSpecialBackground || false
  const backgroundImage = background?.backgroundOption?.background
  const bgColor = background?.backgroundColor || 'White'

  return (
    <>
      {useSpecialBackground && backgroundImage ? (
        <ImageBackgroundContainer
          image={backgroundImage.image}
          useAnimation={backgroundImage.useAnimation}
          contentAlignment={backgroundImage.contentAlignment}
        >
          {children}
        </ImageBackgroundContainer>
      ) : (
        <ColouredContainer background={bgColor} style={style} className={className} {...rest}>
          {children}{' '}
        </ColouredContainer>
      )}
    </>
  )
})
