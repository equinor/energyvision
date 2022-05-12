import type { PortableTextBlock } from '@portabletext/types'

export const Quote = (value: PortableTextBlock) => {
  const { children } = value

  return <div>{children}</div>
}
