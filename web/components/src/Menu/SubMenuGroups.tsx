import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type SubMenuGroupsProps = HTMLAttributes<HTMLDivElement>

const StyledSubMenuGroups = styled.div`
  padding-bottom: var(--spacing-large);
`

export const SubMenuGroups = forwardRef<HTMLDivElement, SubMenuGroupsProps>(function SubMenuGroups(
  { children, ...rest },
  ref,
) {
  return (
    <StyledSubMenuGroups ref={ref} {...rest}>
      {children}
    </StyledSubMenuGroups>
  )
})
