import SimpleBlockContent from '../SimpleBlockContent'
import { Fact, Heading } from '@components'
import { ListRenderer, ListItemRenderer } from './'
import styled from 'styled-components'

const Wrapper = styled.aside`
  margin: var(--space-4xLarge) 0;
`

export const FactRenderer = (child: { node: any }) => {
  const { node } = child
  const {
    title,
    content,
    backgroundColour,
  }: { title: string; content: []; backgroundColour: { colours: { title: string; value: string } } } = node
  const bgTitle = backgroundColour?.colours ? backgroundColour.colours?.title : 'none'
  if (!content || content.length === 0) {
    console.warn('Missing content in a fact box')
    return null
  }
  // @TODO: Color mapping must be more generic than this!!!
  // Find a better way to do this.
  // Create a proper type for colors
  type colors = 'none' | 'cold' | 'warm'

  let backgroundColor: colors = 'none'
  if (bgTitle === 'Default') {
    backgroundColor = 'none'
  } else if (bgTitle === 'Cold') {
    backgroundColor = 'cold'
  } else if (bgTitle === 'Warm') {
    backgroundColor = 'warm'
  }
  const serializers = {
    list: ListRenderer,
    listItem: ListItemRenderer,
  }

  return (
    <Wrapper>
      {/* //@TODO: Bullet proof, what do we need here actually 
        Will need media queries here as well
      */}
      <Fact background={backgroundColor} style={{ margin: '0 calc(var(--spacer-vertical-xxxLarge)*-1)' }}>
        <Heading size="md" level="h3" center>
          {title}
        </Heading>
        <Fact.Text style={{ margin: '0 calc(var(--spacer-vertical-xxxLarge) - var(--spacer-horizontal-medium))' }}>
          {/*  eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore: How should we type */}
          <SimpleBlockContent blocks={content} serializers={serializers} />
        </Fact.Text>
      </Fact>
    </Wrapper>
  )
}
