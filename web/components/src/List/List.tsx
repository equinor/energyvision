import { forwardRef, CSSProperties } from 'react'
import { List as EdsList, ListProps as EdsListProps } from '@equinor/eds-core-react'
import styled from 'styled-components'

export type ListProps = {
  unstyled?: boolean
} & EdsListProps

const StyledList = styled(EdsList)<ListProps>`
  font-size: var(--typeScale-1);
  line-height: var(--lineHeight-3);
  /* EDS list removes margin */
  margin: var(--space-medium) 0;
  ${({ unstyled }) =>
    unstyled && {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    }}
`

export const List = forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(function List(
  { unstyled = false, style, children, ...rest },
  ref,
) {
  return (
    <StyledList
      ref={ref}
      unstyled={unstyled}
      style={
        {
          ...style,
        } as CSSProperties
      }
      {...rest}
    >
      {children}
    </StyledList>
  )
})
