import BlockContent from '@sanity/block-content-to-react'
import { Text } from '@components'

export const IngressBlockRenderer = (props: { children: any; node: any }) => {
  const { children, node } = props
  const { style = 'normal' } = node

  if (style === 'normal') {
    return <Text size="md"> {children}</Text>
  }

  // Fall back to default handling
  // eslint-disable-next-line
  // @ts-ignore: Ask Sanity about progress for supporting types in block-content
  return BlockContent.defaultSerializers.types.block(props)
}
