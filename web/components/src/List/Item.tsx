import { forwardRef, CSSProperties } from 'react'
import { List as EdsList } from '@equinor/eds-core-react'
import styled from 'styled-components'

const { Item: EdsItem } = EdsList

const StyledListItem = styled(EdsItem)``

export type ItemProps = React.HTMLAttributes<HTMLLIElement>

export const Item = forwardRef<HTMLLIElement, ItemProps>(function Item({ style, children, ...rest }, ref) {
  return (
    <StyledListItem
      ref={ref}
      style={
        {
          ...style,
        } as CSSProperties
      }
      {...rest}
    >
      {children}
    </StyledListItem>
  )
})
