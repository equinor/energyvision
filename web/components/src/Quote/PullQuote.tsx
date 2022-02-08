import { forwardRef, HTMLAttributes, isValidElement, Children } from 'react'
import { Media } from './Media'
import styled from 'styled-components'

type ImagePosition = 'left' | 'right'

export type PullQuoteProps = {
  imagePosition?: ImagePosition
} & HTMLAttributes<HTMLDivElement>

type ContainerProps = {
  hasImage: boolean
  imagePosition: ImagePosition
}

const Container = styled.figure<ContainerProps>`
  display: grid;
  row-gap: var(--space-medium);
  margin: 0;
  position: relative;
  grid-template-rows: min-content min-content;
  grid-template-columns: 5rem var(--space-medium) 1fr;
  grid-template-areas: ${({ hasImage }) =>
    hasImage
      ? `
      'media spacing author'
      'quote quote quote'
    `
      : `
      'quote quote quote'
      'author author author'
    `};

  @media (min-width: 800px) {
    grid-template-columns: ${({ imagePosition, hasImage }) =>
      hasImage && imagePosition === 'left'
        ? `11rem var(--space-medium) 1fr`
        : hasImage
        ? `1fr var(--space-medium) 11rem`
        : `1fr 6rem 12rem`};
    grid-template-areas: ${({ imagePosition, hasImage }) =>
      hasImage && imagePosition === 'left'
        ? `
        'media spacing quote'
        'media spacing author'
        `
        : hasImage
        ? `
        'quote spacing media'
        'author spacing media'
        `
        : `
          'quote quote .'
          '. author author'
        `};
  }
`

export const PullQuote = forwardRef<HTMLDivElement, PullQuoteProps>(function PullQuote(
  { imagePosition = 'right', children },
  ref,
) {
  const hasImage = Children.toArray(children).some((child) => isValidElement(child) && child.type === Media)
  return (
    <Container imagePosition={imagePosition} hasImage={hasImage} ref={ref}>
      {children}
    </Container>
  )
})
