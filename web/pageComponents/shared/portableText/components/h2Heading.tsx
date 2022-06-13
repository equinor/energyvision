import { Heading } from '@components'
import type { PortableTextBlock } from '@portabletext/types'

export const h2Heading = (value: PortableTextBlock) => {
  const { children } = value

  return (
    <Heading level="h2" size="lg">
      <>{children}</>
    </Heading>
  )
}
