import type { BlockNode } from '@sanity/block-content-to-react'

const defaults = { nonTextBehavior: 'remove' }

export const blocksToText = (blocks: BlockNode[], opts = {}): string => {
  if (!Array.isArray(blocks)) return blocks

  const options = Object.assign({}, defaults, opts)
  return blocks
    .map((block: BlockNode) => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`
      }

      return block.children.map((child: { text: string }) => child.text).join('')
    })
    .join('\n\n')
}
