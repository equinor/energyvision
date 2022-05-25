import { HTMLAttributes } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  height: 400px;
  grid-area: image;

  @media (min-width: 800px) {
    height: auto;
    max-height: 800px;
  }
`

export const Image = ({ children, ...rest }: HTMLAttributes<HTMLDivElement> & HTMLAttributes<HTMLImageElement>) => (
  <Container {...rest}>{children}</Container>
)
