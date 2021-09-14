import styled from 'styled-components'
import type { QuoteData } from '../../../types/types'
import Quote from '../../../pageComponents/shared/Quote'

const Container = styled.div`
  padding: 0 var(--layout-paddingHorizontal-small) 0 var(--layout-paddingHorizontal-medium);
  max-width: var(--maxViewportWidth);
  margin: var(--space-xxLarge) auto;
  clear: both;
`

type QuoteRendererNode = {
  _key: string
  _type: string
} & QuoteData

export const QuoteRenderer = (child: { node: QuoteRendererNode }): JSX.Element => {
  const { node } = child

  const data = {
    ...node,
    type: node._type,
    id: node._key,
  }

  return (
    <Container>
      <Quote data={data} />
    </Container>
  )
}
