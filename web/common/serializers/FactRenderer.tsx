import BlockContent from '@sanity/block-content-to-react'
import { Fact } from '@components'

const { Title } = Fact

export const FactRenderer = (child: { node: any }) => {
  const { node } = child
  const { title, content } = node
  return (
    <aside>
      <Fact>
        <Title></Title>
        <h4>{title}</h4>
        <BlockContent blocks={content} />
      </Fact>
    </aside>
  )
}
