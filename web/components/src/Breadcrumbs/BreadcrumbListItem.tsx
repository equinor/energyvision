import { forwardRef, HTMLAttributes } from 'react'
import { List as EdsList } from '@equinor/eds-core-react'
import styled from 'styled-components'

const { Item: EdsItem } = EdsList

export type BreadcrumbsListItemProps = HTMLAttributes<HTMLLIElement>

const StyledListItem = styled(EdsItem)`
  display: inline-block;
  padding-right: var(--space-small);
  font-weight: var(--fontWeight-bold);

  &:after {
    content: '>';
    padding-left: var(--space-small);
  }

  &:last-child {
    color: var(--slate-blue-90);
    font-weight: var(--fontWeight-medium);

    &:after {
      content: '';
    }
  }
`

export const BreadcrumbsListItem = forwardRef<HTMLLIElement, BreadcrumbsListItemProps>(function Breadcrumbs(
  { children, ...rest },
  forwardedRef,
) {
  return (
    <StyledListItem ref={forwardedRef} {...rest}>
      {children}
    </StyledListItem>
  )
})
