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
  grid-template-columns: calc(5 * var(--space-medium)) var(--space-medium) 1fr; // TODO: Inconsistent spacing
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
        ? `calc(11 * var(--space-medium)) var(--space-medium) 1fr`
        : hasImage
        ? `1fr var(--space-medium) calc(11 * var(--space-medium))`
        : `1fr var(--space-4xLarge) calc(5 * var(--space-medium))`};
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
          'quote quote quote'
          'author author author'
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
