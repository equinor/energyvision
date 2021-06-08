import { List } from '@components'

type ListProps = {
  type: string
  children: JSX.Element[]
  [x: string]: unknown
}

export const ListRenderer = ({ type, children }: ListProps) => {
  const bullet = type === 'bullet'
  if (bullet) {
    return <List>{children}</List>
  }
  return <List variant="numbered">{children}</List>
}
