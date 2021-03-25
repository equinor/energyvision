import { List as ListWrapper, ListProps } from './List'
import { Item, ItemProps } from './Item'

type ListCompundProps = typeof ListWrapper & {
  Item: typeof Item
}

const List = ListWrapper as ListCompundProps

List.Item = Item

export { List }
export type { ListProps, ItemProps }
