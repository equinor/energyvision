import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type CardActionProps = HTMLAttributes<HTMLDivElement>

const StyledAction = styled.div`
  padding: 0 1rem;
  flex-grow: 1;
  grid-auto-columns: auto;
  display: flex;
`

const Children = styled.div`
  align-self: flex-end;
`

export const Action = forwardRef<HTMLDivElement, CardActionProps>(function CardMedia({ children, ...rest }, ref) {
  return (
    <StyledAction ref={ref} {...rest}>
      <Children>{children}</Children>
    </StyledAction>
  )
})
