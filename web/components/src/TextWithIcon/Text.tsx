import { HTMLAttributes } from 'react'
import styled from 'styled-components'

type TextProps = HTMLAttributes<HTMLDivElement>

const StyledText = styled.div`
  grid-area: text;
`

export const Text = ({ children, ...rest }: TextProps) => {
  return <StyledText {...rest}>{children}</StyledText>
}
