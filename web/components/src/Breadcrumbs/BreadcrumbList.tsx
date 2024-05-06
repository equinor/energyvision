import { forwardRef, HTMLAttributes } from 'react'
import { List as EdsList } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { twMerge } from 'tailwind-merge'

const List = styled(EdsList)`
  list-style: none;
  font-size: var(--typeScale-05);
  line-height: var(--lineHeight-3);
  font-weight: var(--fontWeight-medium);
`

export type BreadcrumbsProps = HTMLAttributes<HTMLOListElement>

export const BreadcrumbsList = forwardRef<HTMLOListElement, BreadcrumbsProps>(function Breadcrumbs(
  { children, className = '', ...rest },
  forwardedRef,
) {
  return (
    <List ref={forwardedRef} variant="numbered" {...rest} className={twMerge('p-0', className)}>
      {children}
    </List>
  )
})
