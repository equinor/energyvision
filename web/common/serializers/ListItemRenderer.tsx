import { List } from '@components'

const { Item } = List

export const ListItemRenderer = (child: { children: any }) => {
  const { children } = child
  return <Item>{children}</Item>
}
