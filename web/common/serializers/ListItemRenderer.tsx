import { List } from '@components'

const { Item } = List

export const ListItemRenderer = (props: any) => {
  return <Item>{props.children}</Item>
}
