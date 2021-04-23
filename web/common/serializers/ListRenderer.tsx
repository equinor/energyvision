import { List } from '@components'

export const ListRenderer = (child: { type: any; children: any }) => {
  const { type, children } = child
  const bullet = type === 'bullet'
  if (bullet) {
    return <List>{children}</List>
  }
  return <List variant="numbered">{children}</List>
}
