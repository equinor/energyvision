import type { PortableTextBlock } from '@portabletext/types'

export const Sub = (value: PortableTextBlock) => {
  const { children } = value
  return <sub>{children}</sub>
}
