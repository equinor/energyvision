import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

const List = styled.ol`
  list-style: none;
  padding: 0;

  li {
    position: relative;
    display: inline-block;
    margin-right: var(--space-small);
    padding-right: var(--space-small);
    text-transform: capitalize;

    &:after {
      position: absolute;
      right: 0;
      content: '>';
    }

    &:last-child {
      color: var(--slate-blue-80);
    }
  }
`

export type BreadcrumbsProps = HTMLAttributes<HTMLOListElement>

export const Breadcrumbs = forwardRef<HTMLOListElement, BreadcrumbsProps>(function Breadcrumbs({ children, ...rest }) {
  return <List {...rest}>{children}</List>
})
