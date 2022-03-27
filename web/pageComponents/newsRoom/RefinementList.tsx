import { useRefinementList, UseRefinementListProps } from 'react-instantsearch-hooks'
import { List, Checkbox } from '@components'

export type RefinementListProps = React.ComponentProps<'div'> & UseRefinementListProps

const { Item } = List

export function RefinementList(props: RefinementListProps) {
  const { items, refine } = useRefinementList(props)

  return (
    <div>
      <List unstyled>
        {items.map((item) => (
          <Item key={item.value}>
            <Checkbox
              value={item.value}
              label={`${item.label} (${item.count})`}
              checked={item.isRefined}
              onChange={() => refine(item.value)}
            ></Checkbox>
          </Item>
        ))}
      </List>
    </div>
  )
}
