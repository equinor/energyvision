import { useRefinementList, UseRefinementListProps } from 'react-instantsearch-hooks'
import { List } from '@components'

export type RefinementListProps = React.ComponentProps<'div'> & UseRefinementListProps

const { Item } = List

export function RefinementList(props: RefinementListProps) {
  const { items, refine } = useRefinementList(props)

  return (
    <div>
      <List unstyled>
        {items.map((item) => (
          <Item key={item.value}>
            <label>
              <input type="checkbox" value={item.value} checked={item.isRefined} onChange={() => refine(item.value)} />
              <span>{item.label}</span>
              <span>{` (${item.count})`}</span>
            </label>
          </Item>
        ))}
      </List>
    </div>
  )
}
