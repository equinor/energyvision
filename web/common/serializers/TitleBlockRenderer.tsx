/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import BlockContent from '@sanity/block-content-to-react'
import type { BlockNode } from '@sanity/block-content-to-react'
import { Heading, HeadingProps } from '@components'

type TitleBlockProps = {
  children: string[]
  node: BlockNode
} & HeadingProps

export const TitleBlockRenderer = (props: TitleBlockProps) => {
  const { children, node, size = 'xl', level = 'h2', ...rest } = props

  return (
    <Heading size={size} level={level} {...rest}>
      {children}
    </Heading>
  )

  // Fall back to default handling
  // eslint-disable-next-line
  // @ts-ignore: Ask Sanity about progress for supporting types in block-content
  return BlockContent.defaultSerializers.types.block(props)
}
