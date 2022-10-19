import type { PortableTextBlock } from '@portabletext/types'

export const Strikethrough = (value: PortableTextBlock) => {
  const { children } = value
  return (
    <s>
      <>{children}</>
    </s>
  )
}
