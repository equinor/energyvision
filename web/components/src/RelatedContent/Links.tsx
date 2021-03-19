import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

const StyledLinks = styled.div`
  display: grid;
`

export type LinksProps = HTMLAttributes<HTMLDivElement>

export const Links = forwardRef<HTMLDivElement, LinksProps>(function Links({ children, ...rest }, ref) {
  return (
    <StyledLinks ref={ref} {...rest}>
      {children}
    </StyledLinks>
  )
})
