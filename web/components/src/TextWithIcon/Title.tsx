import { HTMLAttributes } from 'react'
import { Heading } from '../Heading'
import styled from 'styled-components'

type TitleProps = HTMLAttributes<HTMLDivElement>

const StyledTitle = styled(Heading)`
  margin: 0;
  text-align: center;
`

export const Title = ({ children, ...rest }: TitleProps) => {
  return (
    <StyledTitle size="xl" regular {...rest}>
      {children}
    </StyledTitle>
  )
}
