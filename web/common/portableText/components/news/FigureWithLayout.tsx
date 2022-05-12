import type { PortableTextBlock } from '@portabletext/types'

export const FigureWithLayout = (value: PortableTextBlock) => {
  const { children } = value

  return <div>{children}</div>
}
