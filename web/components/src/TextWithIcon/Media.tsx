import { HTMLAttributes } from 'react'
import styled from 'styled-components'

type MediaProps = HTMLAttributes<HTMLDivElement>

const Img = styled.div`
  align-self: center;
  grid-area: media;
  margin-bottom: var(--space-medium);
`

export const Media = ({ children, ...rest }: MediaProps) => {
  return <Img {...rest}>{children}</Img>
}
