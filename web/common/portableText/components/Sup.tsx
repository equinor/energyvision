import type { PortableTextBlock } from '@portabletext/types'

export const Sup = (value: PortableTextBlock) => {
  try {
    const { children } = value
    return <sup>{children}</sup>
  } catch (e) {
    console.error('Could not render sup', e)
    return null
  }
}
