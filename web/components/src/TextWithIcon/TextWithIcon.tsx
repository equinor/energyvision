import { HTMLAttributes } from 'react'
import styled from 'styled-components'

type TextWithIconProps = HTMLAttributes<HTMLDivElement>

const Container = styled.div`
  text-align: center;
`

export const TextWithIcon = ({ children, ...rest }: TextWithIconProps) => {
  return <Container {...rest}>{children}</Container>
}
