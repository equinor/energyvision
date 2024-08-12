import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type TeaserMediaProps = {
  /** If the image is of type SVG it can have a small size */
  size?: 'small' | 'full'
  /** Should the height be fixed for small screens */
  $fixedHeight?: boolean
  /** If the media is smaller than the container, it can be centered with the content  */
  $center?: boolean
} & HTMLAttributes<HTMLDivElement>

const StyledMedia = styled.div<TeaserMediaProps>`
  grid-area: image;
  position: relative;
  /* @TODO: Discuss this image height */
  width: ${(props) => (props.size === 'small' ? '55%' : '100%')};
  ${({ size }) =>
    size &&
    size === 'small' && {
      paddingTop: 'var(--space-xxLarge)',
    }}
  ${({ $fixedHeight }) =>
    $fixedHeight && {
      height: '400px',
    }}
  ${({ $center }) =>
    $center && {
      alignSelf: 'center',
      justifySelf: 'center',
      textAlign: 'center',
    }}
    @media (min-width: 750px) {
    height: auto;
    max-height: 800px;
    padding: 0;
  }
`

export const Media = forwardRef<HTMLDivElement, TeaserMediaProps>(function Media(
  { size = 'full', $fixedHeight = true, $center = false, children, ...rest },
  ref,
) {
  return (
    <StyledMedia size={size} $center={$center} $fixedHeight={$fixedHeight} ref={ref} {...rest}>
      {children}
    </StyledMedia>
  )
})
