import type { PortableTextBlock } from '@portabletext/types'

export const PaddedText = (value: PortableTextBlock) => {
  const { children } = value

  return <div>{children}</div>
}
