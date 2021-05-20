import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type TeaserMediaProps = {
  size?: 'small' | 'full'
} & HTMLAttributes<HTMLDivElement>

const StyledMedia = styled.div<TeaserMediaProps>`
  grid-area: image;
  position: relative;
  /* @TODO: Discuss this image height */
  height: 400px;
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
  { size = 'full', children, ...rest },
  ref,
) {
  return (
    <StyledMedia size={size} ref={ref} {...rest}>
      {children}
    </StyledMedia>
  )
})
