import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type SubMenuGroupsProps = HTMLAttributes<HTMLDivElement>

const StyledSubMenuGroups = styled.div`
  @media (min-width: 1300px) {
    display: flex;
    flex-wrap: wrap;
  }
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
