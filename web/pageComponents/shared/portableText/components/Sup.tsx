import type { PortableTextBlock } from '@portabletext/types'

export const Sup = (value: PortableTextBlock) => {
  const { children } = value
  return (
    <sup>
      <>{children}</>
    </sup>
  )
}
