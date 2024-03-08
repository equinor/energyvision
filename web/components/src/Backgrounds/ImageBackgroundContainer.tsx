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
  useAnimation: boolean
} & HTMLAttributes<HTMLDivElement>

const ImageContainer = styled.div<ImageContainerProps>`
  container: inline-size;
  position: relative;
  min-height: 100vh;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${({ imageUrl, useAnimation }) =>
    imageUrl
      ? `${useAnimation == true ? '' : ' linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),'} url(${imageUrl})`
      : ''};
  ${({ isInverted }) => (isInverted ? inverted : normal)}
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
        useAnimation={useAnimation === true}
      >
        <AnimationWrapper useAnimation={useAnimation === true} contentAlignment={contentAlignment}>
          {children}
        </AnimationWrapper>
      </ImageContainer>
    )
  },
)
