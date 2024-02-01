import { forwardRef, HTMLAttributes } from 'react'
import type { BackgroundColours, ImageBackground } from '../../../types/types'
import { ColouredContainer } from './ColouredContainer'
import { ImageBackgroundContainer } from './ImageBackgroundContainer'

export type BackgroundContainerProps = {
  background?: {
    backgroundColor?: BackgroundColours
    imageBackground?: ImageBackground
  }
} & HTMLAttributes<HTMLDivElement>

export const BackgroundContainer = forwardRef<HTMLDivElement, BackgroundContainerProps>(function BackgroundContainer(
  { background, style, children, className, ...rest },
  ref,
) {
  const Container = ({ children }: { children: React.ReactNode }) => {
    return background?.imageBackground ? (
      <ImageBackgroundContainer
        ref={ref}
        {...rest}
        imageBackground={background?.imageBackground}
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
