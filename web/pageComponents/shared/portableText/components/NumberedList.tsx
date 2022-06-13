import { List } from '@components'
import type { PortableTextBlock } from '@portabletext/types'

export const NumberedList = (value: PortableTextBlock) => {
  const { children } = value

  return (
    <List variant="numbered">
      <>{children}</>
    </List>
  )
}
