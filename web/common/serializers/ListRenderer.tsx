import { List } from '@components'

export const ListRenderer = (props: any) => {
  const { type } = props
  const bullet = type === 'bullet'
  if (bullet) {
    // @TODO: Should probably just be doing this if we are inside a fact component?
    // @TODO: And don't remove padding on smaller devices
    return <List style={{ padding: 0 }}>{props.children}</List>
  }
  return <List variant="numbered">{props.children}</List>
}
