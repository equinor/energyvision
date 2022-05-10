import { List } from '@components'
import type { PortableTextBlock } from '@portabletext/types'

export const NumberList = (value: PortableTextBlock) => {
  const { children } = value

  return <List variant="numbered">{children}</List>
}
