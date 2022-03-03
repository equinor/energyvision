import BlockContent from '@sanity/block-content-to-react'
import { Text, Heading } from '@components'
import { PortableTextBlock } from '../../types/types'

export const BlockRenderer = (props: { children: string[]; node: PortableTextBlock }) => {
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
      <Heading level="h3" size="sm" style={{ fontWeight: '600', lineHeight: 'var(--lineHeight-3)' }}>
        {children}
      </Heading>
    )
  }
  if (style === 'smallText') {
    return <Text size="small">{children}</Text>
  }

  if (style === 'normal') {
    return <Text> {children}</Text>
  }

  // Fall back to default handling
  // eslint-disable-next-line
  // @ts-ignore: Ask Sanity about progress for supporting types in block-content
  return BlockContent.defaultSerializers.types.block(props)
}
