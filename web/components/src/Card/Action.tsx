import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type CardActionProps = HTMLAttributes<HTMLDivElement>

const StyledAction = styled.div`
  align-self: end;
  padding: 0 1rem;
  grid-auto-columns: auto;
`

export const Action = forwardRef<HTMLDivElement, CardActionProps>(function CardMedia({ children, ...rest }, ref) {
  return (
    <StyledAction ref={ref} {...rest}>
      {children}
    </StyledAction>
  )
})
