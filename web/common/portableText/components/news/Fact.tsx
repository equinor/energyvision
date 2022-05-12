import type { PortableTextBlock } from '@portabletext/types'

export const Fact = (value: PortableTextBlock) => {
  const { children } = value

  return <div>{children}</div>
}
