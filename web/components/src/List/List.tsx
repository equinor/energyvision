import { forwardRef, CSSProperties } from 'react'
import { List as EdsList, ListProps as EdsListProps } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { Flags } from '../../../common/helpers/datasetHelpers'

export type ListProps = {
  unstyled?: boolean
  centered?: boolean
  splitList?: boolean
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

  ${({ centered }) =>
    centered && {
      display: 'grid',
      placeContent: 'center',
    }}

  @media (min-width: 800px) {
    ${({ splitList }) =>
      splitList && {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridColumnGap: `var(--space-xLarge)`,
      }}
  }
`

export const List = forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(function List(
  { unstyled = false, centered = false, splitList = false, style, children, ...rest },
  ref,
) {
  return (
    <StyledList
      ref={ref}
      unstyled={unstyled}
      centered={centered}
      splitList={splitList}
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
