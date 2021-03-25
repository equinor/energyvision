import { forwardRef, CSSProperties } from 'react'
import { List as EdsList, ListProps as EdsListProps } from '@equinor/eds-core-react'
import styled from 'styled-components'

const StyledList = styled(EdsList)`
  font-size: var(--typeScale-1);
  line-height: var(--lineHeight-3);
`

export type ListProps = EdsListProps

export const List = forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(function List(
  { style, children, ...rest },
  ref,
) {
  return (
    <StyledList
      ref={ref}
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
