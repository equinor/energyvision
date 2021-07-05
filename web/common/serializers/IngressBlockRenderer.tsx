import BlockContent from '@sanity/block-content-to-react'
import type { BlockNode } from '@sanity/block-content-to-react'
import { Text } from '@components'

type IngressProps = {
  children: string[]
  node: BlockNode
  centered?: boolean
}

export const IngressBlockRenderer = (props: IngressProps) => {
  const { children, node, centered = false } = props
  const { style = 'normal' } = node
  if (style === 'normal') {
    return (
      <Text size="md" centered={centered}>
        {children}
      </Text>
    )
  }

  // Fall back to default handling
  // eslint-disable-next-line
  // @ts-ignore: Ask Sanity about progress for supporting types in block-content
  return BlockContent.defaultSerializers.types.block(props)
}
