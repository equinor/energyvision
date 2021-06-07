import styled from 'styled-components'
import type { ImageWithAlt } from '../../../types/types'
import Quote from '../../../tempcomponents/shared/Quote'

const Container = styled.div`
  padding: 0 var(--layout-paddingHorizontal-small) 0 var(--layout-paddingHorizontal-medium);
  max-width: var(--maxViewportWidth);
  margin: var(--space-xxLarge) auto;
  clear: both;
`

type QuoteRendererNode = {
  _key: string
  _type: string
  quote: string
  author: string
  authorTitle: string
  image: ImageWithAlt
}

export const QuoteRenderer = (child: { node: QuoteRendererNode }): JSX.Element => {
  const { node } = child
  return (
    <Container>
      <Quote data={{ type: node._type, id: node._key, ...node }} />
    </Container>
  )
}
