import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type SubMenuGroupsProps = HTMLAttributes<HTMLDivElement>

const StyledSubMenuGroups = styled.div`
  padding-bottom: var(--spacing-large);
  @media (min-width: 1300px) {
    /* display: flex;
    flex-wrap: wrap; */
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(8em, 11rem));
    grid-template-rows: repeat(2, min-content);
    grid-row-gap: var(--space-small);
    grid-column-gap: var(--space-xLarge);
    grid-auto-flow: column;
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
