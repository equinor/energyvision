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
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(255, 255, 255, 1) 70%);
  section {
    width: 40vw;
    margin-right: 0;
    padding: var(--space-3xLarge) var(--space-3xLarge);
  }
  display: flex;
  view-timeline-name: --revealing-image;
  view-timeline-axis: block;

  /* Attach animation, linked to the  View Timeline */
  animation: linear fadeIn both;
  animation-timeline: --revealing-image;

  /* Tweak range when effect should run*/
  animation-range: cover 0% cover 100%;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
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
