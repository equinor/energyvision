import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type SubMenuGroupsProps = HTMLAttributes<HTMLDivElement>

const StyledSubMenuGroups = styled.div`
  padding-bottom: var(--spacing-large);
  @media (min-width: 1300px) {
    display: grid;
    grid-template-rows: repeat(2, min-content);
    grid-row-gap: var(--space-small);
    grid-column-gap: var(--space-xLarge);
    grid-auto-flow: column;

    [data-dynamic-typography-version='v1'] & {
      grid-template-columns: repeat(auto-fill, minmax(8em, 11rem));
    }

    [data-dynamic-typography-version='v2'] & {
      grid-template-columns: repeat(auto-fill, minmax(8em, calc(11 * var(--space-medium))));
    }
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
