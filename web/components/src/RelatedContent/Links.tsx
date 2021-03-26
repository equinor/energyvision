import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { List } from '../List'

export const StyledLinks = styled(List)`
  display: grid;
  column-gap: var(--spacer-vertical-large);
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`

export type LinksProps = HTMLAttributes<HTMLUListElement | HTMLOListElement>

export const Links = forwardRef<HTMLUListElement | HTMLOListElement, LinksProps>(function Links(
  { children, ...rest },
  ref,
) {
  return (
    <StyledLinks unstyled ref={ref} {...rest}>
      {children}
    </StyledLinks>
  )
})
