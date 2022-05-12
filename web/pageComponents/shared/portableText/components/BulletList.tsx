import { List } from '@components'
import type { PortableTextBlock } from '@portabletext/types'

export const BulletList = (value: PortableTextBlock) => {
  const { children } = value

  return <List>{children}</List>
}
