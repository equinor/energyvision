const defaults = { nonTextBehavior: 'remove' }

const blocksToText = (blocks: any[], opts = {}): string => {
  const options = Object.assign({}, defaults, opts)
  if (!blocks) return ''
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`
      }

      return block.children.map((child: { text: any }) => child.text).join('')
    })
    .join('\n\n')
}

export default blocksToText
