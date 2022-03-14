import type { PortableTextBlock } from '@portabletext/types'

export const Sub = (value: PortableTextBlock) => {
  try {
    const { children } = value
    return <sub>{children}</sub>
  } catch (e) {
    console.error('Could not render sub', e)
    return null
  }
}
