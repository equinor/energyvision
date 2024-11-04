import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type ImagePosition = 'left' | 'right'
export type ImageSize = 'small' | 'full'

export type TeaserProps = {
  /** Should the image be positioned to the left or the right */
  imagePosition?: ImagePosition
} & HTMLAttributes<HTMLElement>

export const StyledTeaser = styled.article`
  overflow-y: hidden;
`

const TeaserWrapper = styled.div<{ $imagePosition?: ImagePosition }>`
  --max-content-width: 1440px;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content;
  grid-template-areas:
    'image'
    'content';
  max-width: var(--max-content-width);
  margin: 0 auto;
  /* Hardcoded value while waiting for the w3c proposal for environment() */
  @media (min-width: 750px) {
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: min-content;
    grid-template-areas: 'image content';
    ${({ $imagePosition }) =>
      $imagePosition === 'right' && {
        gridTemplateAreas: '"content image"',
      }}
  }
`

export const Teaser = forwardRef<HTMLDivElement, TeaserProps>(function Teaser(
  { imagePosition = 'left', children, ...rest },
  ref,
) {
  return (
    <StyledTeaser ref={ref} {...rest}>
      <TeaserWrapper $imagePosition={imagePosition}>{children}</TeaserWrapper>
    </StyledTeaser>
  )
})
