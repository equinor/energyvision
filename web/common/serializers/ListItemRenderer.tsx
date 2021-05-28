import { List } from '@components'

const { Item } = List

type ListItemProps = {
  children: string[]
  [x: string]: unknown
}

export const ListItemRenderer = ({ children }: ListItemProps) => {
  return <Item>{children}</Item>
}
