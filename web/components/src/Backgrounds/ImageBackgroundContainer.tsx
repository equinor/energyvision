import styled, { css } from 'styled-components'
import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import { useSanityLoader } from '../../../lib/hooks/useSanityLoader'
import { ImageBackground } from '../../../types/types'
import { normal, inverted } from '../../../styles/themes'
import AnimationWrapper from './AnimationWrapper'

type ImageBackgroundContainerProps = ImageBackground & HTMLAttributes<HTMLDivElement>

type ImageContainerProps = {
  imageUrl?: string
  isInverted: boolean
  contentAlignment: 'left' | 'right' | 'center'
} & HTMLAttributes<HTMLDivElement>

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
  ${(props) =>
    props.contentAlignment !== 'center' &&
    css`
      display: flex;
      @media (min-width: 1200px) {
        ${props.contentAlignment === 'right' ? 'justify-content:end;' : 'justify-content:start;'};
      }
    `}
`

const DEFAULT_MAX_WIDTH = 1920

export const ImageBackgroundContainer = forwardRef<HTMLDivElement, ImageBackgroundContainerProps>(
  function ImageBackgroundContainer(
    { image, useAnimation, contentAlignment, style, children, className, ...rest },
    ref,
  ) {
    const props = useSanityLoader(image, DEFAULT_MAX_WIDTH, undefined)
    const src = props.src
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
        contentAlignment={contentAlignment}
      >
        {/*         <AnimationWrapper useAnimation={useAnimation === true} contentAlignment={contentAlignment}> */}
        <div
          className={`
          dark
          pt-[50dvh]
          pb-[50dvh]
          animate-fade-in-out 
        [animation-timeline:view()] 
        [animation-range:_cover_30%_cover_100%]`}
        >
          {children}
        </div>
        {/*         </AnimationWrapper> */}
      </ImageContainer>
    )
  },
)
