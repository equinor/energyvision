import { forwardRef, HTMLAttributes } from 'react'
import type { BackgroundColours, ImageBackground, BackgroundOption } from '../../../types/types'
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
  const Container = ({ children }: { children: React.ReactNode }) => {
    return background?.backgroundOption?.useSpecialBackground ? (
      <ImageBackgroundContainer
        ref={ref}
        {...rest}
        imageBackground={background?.backgroundOption?.background}
        style={style}
        className={className}
      >
        {children}
      </ImageBackgroundContainer>
    ) : (
      <ColouredContainer
        ref={ref}
        {...rest}
        background={background?.backgroundColor}
        style={style}
        className={className}
      >
        {children}
      </ColouredContainer>
    )
  }

  return <Container>{children}</Container>
})
