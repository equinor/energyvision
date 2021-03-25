import BlockContent from '@sanity/block-content-to-react'
import { Fact } from '@components'

export const FactRenderer = (child: { node: any }) => {
  const { node } = child
  const { title, content } = node
  return (
    <aside>
      <Fact>
        <h4>{title}</h4>
        <BlockContent blocks={content} />
      </Fact>
    </aside>
  )
}
