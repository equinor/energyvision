import { forwardRef, HTMLAttributes } from 'react'
import { List as EdsList } from '@equinor/eds-core-react'
import styled from 'styled-components'

const List = styled(EdsList)`
  list-style: none;
  padding: 0;
  font-size: var(--typeScale-05);
  line-height: var(--lineHeight-3);
  font-weight: var(--fontWeight-medium);
`

export type BreadcrumbsProps = HTMLAttributes<HTMLOListElement>

export const BreadcrumbsList = forwardRef<HTMLOListElement, BreadcrumbsProps>(function Breadcrumbs({
  children,
  ...rest
}) {
  return (
    <List variant="numbered" {...rest}>
      {children}
    </List>
  )
})
