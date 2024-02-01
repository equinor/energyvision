import styled from 'styled-components'
import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import { useSanityLoader } from '../../../lib/hooks/useSanityLoader'
import { ImageBackground } from '../../../types/types'
import { normal, inverted } from '../../../styles/themes'

type ImageBackgroundContainerProps = {
  imageBackground: ImageBackground
} & HTMLAttributes<HTMLDivElement>
type ImageContainerProps = {
  imageUrl?: string
  isInverted: boolean
} & HTMLAttributes<HTMLDivElement>

const ImageContainer = styled.div<ImageContainerProps>`
  position: relative;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${({ imageUrl }) => (imageUrl ? `url(${imageUrl})` : '')};
  ${({ isInverted }) => (isInverted ? inverted : normal)}
`

const DEFAULT_MAX_WIDTH = 1920

const AnimationWrapper = styled.div`
  /* Create View Timeline */
  //height: 100vh;
  view-timeline-name: --revealing-image;
  view-timeline-axis: block;

  /* Attach animation, linked to the  View Timeline */
  animation: linear fadeIn both;
  animation-timeline: --revealing-image;

  /* Tweak range when effect should run*/
  animation-range: entry 25% cover 50%;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`
export const ImageBackgroundContainer = forwardRef<HTMLDivElement, ImageBackgroundContainerProps>(
  function ImageBackgroundContainer({ imageBackground, style, children, className, ...rest }, ref) {
    const props = useSanityLoader(imageBackground.image, DEFAULT_MAX_WIDTH, undefined)
    const src = props?.src
    const ChildrenWrapper = imageBackground?.useAnimation
      ? ({ children }: { children: React.ReactNode }) => <AnimationWrapper>{children}</AnimationWrapper>
      : ({ children }: { children: React.ReactNode }) => <>{children}</>

    return (
      <ImageContainer
        style={
          {
            ...style,
            '--color-on-background': `var(${imageBackground?.useDarkTheme ? '--inverted-text' : '--default-text'})`,
          } as CSSProperties
        }
        isInverted={imageBackground.useDarkTheme === true}
        imageUrl={src}
        ref={ref}
        {...rest}
        className={className}
      >
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </ImageContainer>
    )
  },
)
