import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

type MediaProps = HTMLAttributes<HTMLDivElement>

const Img = styled.div`
  width: 100%;
  align-self: center;
  grid-area: media;

  img {
    border-radius: 50%;
  }
`

export const Media = forwardRef<HTMLDivElement, MediaProps>(function Media({ children, ...rest }, ref) {
  return (
    <Img ref={ref} {...rest}>
      {children}
    </Img>
  )
})
