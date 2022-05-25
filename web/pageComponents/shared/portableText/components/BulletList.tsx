import { List } from '@components'
import type { PortableTextBlock } from '@portabletext/types'

export const BulletList: React.FC<React.PropsWithChildren<PortableTextBlock>> = (value: PortableTextBlock) => {
  const { children } = value

  return (
    <List>
      <>{children}</>
    </List>
  )
}
