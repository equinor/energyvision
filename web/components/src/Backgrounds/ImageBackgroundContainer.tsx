import styled from 'styled-components'
import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import { useSanityLoader } from '../../../lib/hooks/useSanityLoader'
import { ImageBackground } from '../../../types/types'
import { normal, inverted } from '../../../styles/themes'
import css from 'styled-jsx/css'

type ImageBackgroundContainerProps = {
  background?: BackgroundOptions
} & HTMLAttributes<HTMLDivElement>

type ImageContainerProps = {
  imageUrl?: string
  isInverted: boolean
} & HTMLAttributes<HTMLDivElement>

type ContentProps = {
  useAnimation?: boolean
  contentAlignment?: 'left' | 'center' | 'right'
}

const ImageContainer = styled.div<ImageContainerProps>`
  container: inline-size;
  position: relative;
  min-height: 100vh;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    ${({ imageUrl }) => (imageUrl ? `url(${imageUrl})` : '')};
  ${({ isInverted }) => (isInverted ? inverted : normal)}
`

const DEFAULT_MAX_WIDTH = 1920

const AnimationWrapper = styled.div<ContentProps>`
  /* Create View Timeline */
  ${(props) =>
    props.contentAlignment == 'right' &&
    css`
      @media (min-width: 1200px) {
        width: 40vw;
      }
      > section,
      > div {
        @media (min-width: 1200px) {
          margin-right: 0;
          width: 100% !important;
          padding: var(--space-3xLarge) var(--space-3xLarge);
        }
      }
    `}

  ${(props) =>
    props.useAnimation &&
    css`
      padding-top: 50vh;
      padding-bottom: 50vh;

      view-timeline-name: --revealing-image;
      view-timeline-axis: block;

      /* Attach animation, linked to the  View Timeline */
      animation: linear fadeIn both;
      animation-timeline: --revealing-image;

      /* Tweak range when effect should run*/
      animation-range: cover 30% cover 100%;

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
    `}
    

  
    ${(props) =>
    props.contentAlignment == 'left' &&
    css`
      @media (min-width: 1200px) {
        width: 40vw;
      }
      > section,
      > div {
        @media (min-width: 1200px) {
          width: 100%;
          margin-left: 0;
          padding: var(--space-3xLarge) var(--space-3xLarge);
        }
      }
    `}

  display: flex;
`
export const ImageBackgroundContainer = forwardRef<HTMLDivElement, ImageBackgroundContainerProps>(
  function ImageBackgroundContainer({ imageBackground, style, children, className, ...rest }, ref) {
    const props = useSanityLoader(imageBackground.image, DEFAULT_MAX_WIDTH, undefined)
    const src = props?.src

    console.log(imageBackground.contentAlignment)

    return (
      <ImageContainer
        style={
          {
            ...style,
            '--color-on-background': `var(--inverted-text)`,
          } as CSSProperties
        }
        isInverted
        imageUrl={src}
        ref={ref}
        {...rest}
        className={className}
      >
        <AnimationWrapper
          useAnimation={imageBackground?.useAnimation === true}
          contentAlignment={imageBackground.contentAlignment}
        >
          {children}
        </AnimationWrapper>
      </ImageContainer>
    )
  },
)
