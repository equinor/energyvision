import { useRefinementList, UseRefinementListProps } from 'react-instantsearch-hooks'
import { List, Checkbox } from '@components'
import styled from 'styled-components'

export type RefinementListProps = React.ComponentProps<'div'> & UseRefinementListProps

const { Item } = List

const NoRelevant = styled.span`
  padding: var(--space-small) 0;
  display: inline-block;
`

const StyledItem = styled(Item)`
  padding-left: var(--space-small);
`
export function RefinementList(props: RefinementListProps) {
  const { items, refine } = useRefinementList(props)

  return (
    <div>
      {items.length > 0 ? (
        <List unstyled>
          {items.map((item) => (
            <StyledItem key={item.value}>
              <Checkbox
                value={item.value}
                label={`${item.label} (${item.count})`}
                checked={item.isRefined}
                onChange={() => refine(item.value)}
              ></Checkbox>
            </StyledItem>
          ))}
        </List>
      ) : (
        <NoRelevant>No content is satisfying this filter (or Norwegian = wip)</NoRelevant>
      )}
    </div>
  )
}
