import BlockContent from '@sanity/block-content-to-react'
import { Text, Heading } from '@components'

export const BlockRenderer = (props: { children: any; node: any }) => {
  const { children, node } = props
  const { style = 'normal' } = node

  if (style === 'h2') {
    return (
      <Heading level="h2" size="lg">
        {children}
      </Heading>
    )
  }
  if (style === 'h3') {
    return (
      <Heading level="h3" size="md">
        {children}
      </Heading>
    )
  }

  if (style === 'normal') {
    return <Text> {children}</Text>
  }

  // Fall back to default handling
  // eslint-disable-next-line
  // @ts-ignore: Ask Sanity about progress for supporting types in block-content
  return BlockContent.defaultSerializers.types.block(props)
}
