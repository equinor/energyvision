import { HTMLAttributes } from 'react'
import { Text as TextComponent } from '../Text'
import styled from 'styled-components'

type TextProps = HTMLAttributes<HTMLDivElement>

const StyledText = styled(TextComponent)`
  margin: 0;
  grid-area: text;
  text-align: center;
`

export const Text = ({ children, ...rest }: TextProps) => {
  return (
    <StyledText size="regular" {...rest}>
      {children}
    </StyledText>
  )
}
