import { PortableTextEntry } from '@sanity/block-content-to-react'

const removeEmptyBlocks = (blocks: PortableTextEntry[]): PortableTextEntry[] => {
  if (blocks && Array.isArray(blocks)) {
    return blocks.filter((block) => {
      const test = block.children
        ? (block.children as unknown as any).filter((child: any) => child.text.trim() !== '')
        : 0
      return test && test.length !== 0
    })
  }
  return blocks
}
export default removeEmptyBlocks
