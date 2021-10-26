import BlockContent from '@sanity/block-content-to-react'
import type { BlockNode } from '@sanity/block-content-to-react'
import { Heading } from '@components'

type TitleBlockProps = {
  children: string[]
  node: BlockNode
}

export const TitleBlockRenderer = (props: TitleBlockProps) => {
  const { children } = props

  return (
    <Heading size="xl" level="h2">
      {children}
    </Heading>
  )

  // Fall back to default handling
  // eslint-disable-next-line
  // @ts-ignore: Ask Sanity about progress for supporting types in block-content
  return BlockContent.defaultSerializers.types.block(props)
}
