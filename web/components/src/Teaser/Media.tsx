import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type TeaserMediaProps = {
  /** Don't know how to solve this */
  size?: 'small' | 'full'
  /** Should the height be fixed for small screens */
  fixedHeight?: boolean
} & HTMLAttributes<HTMLDivElement>

const StyledMedia = styled.div<TeaserMediaProps>`
  grid-area: image;
  position: relative;
  /* @TODO: Discuss this image height */

  ${({ fixedHeight }) =>
    fixedHeight && {
      height: '400px',
    }}
  ${({ size }) =>
    size === 'small' && {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  @media (min-width: 750px) {
    height: auto;
    max-height: 800px;
  }
`

export const Media = forwardRef<HTMLDivElement, TeaserMediaProps>(function Media(
  { size = 'full', fixedHeight = true, children, ...rest },
  ref,
) {
  return (
    <StyledMedia size={size} fixedHeight={fixedHeight} ref={ref} {...rest}>
      {children}
    </StyledMedia>
  )
})
