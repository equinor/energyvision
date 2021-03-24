import BlockContent from '@sanity/block-content-to-react'
import { Typography } from '@equinor/eds-core-react'

export const BlockRenderer = (props: { children: any; node: any }) => {
  const { children, node } = props
  const { style = 'normal' } = node

  if (style === 'normal') {
    return <Typography variant="ingress"> {children}</Typography>
  }

  // Fall back to default handling
  // eslint-disable-next-line
  // @ts-ignore: Ask Sanity about progress for supporting types in block-content
  return BlockContent.defaultSerializers.types.block(props)
}
