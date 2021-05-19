import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type TeaserMediaProps = {
  size?: 'small' | 'full'
} & HTMLAttributes<HTMLDivElement>

const StyledMedia = styled.div<TeaserMediaProps>`
  ${({ size }) =>
    size === 'small' && {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
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
