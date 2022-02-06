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
    return process.env.NEXT_PUBLIC_VNYS_717_IMPROVED_TYPOGRAPHY === 'true' ? (
      <Heading level="h3" size="sm" style={{ fontWeight: '600', lineHeight: 'var(--lineHeight-3)' }}>
        {children}
      </Heading>
    ) : (
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
