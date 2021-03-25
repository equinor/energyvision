import { List } from '@components'

export const ListRenderer = (child: { type: any; children: any }) => {
  const { type, children } = child
  const bullet = type === 'bullet'
  if (bullet) {
    // @TODO: Should probably just be doing this if we are inside a fact component?
    // @TODO: And don't remove padding on smaller devices
    return <List style={{ padding: 0 }}>{children}</List>
  }
  return <List variant="numbered">{children}</List>
}
