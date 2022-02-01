import styled from 'styled-components'
import type { QuoteData } from '../../../types/types'
import Quote from '../../../pageComponents/shared/Quote'
import { BackgroundContainer } from '@components'

const Container = styled.div`
  padding: var(--space-medium) var(--layout-paddingHorizontal-small) var(--space-medium)
    var(--layout-paddingHorizontal-medium);
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
  const { designOptions } = data
  const { background } = designOptions

  return (
    <BackgroundContainer background={background}>
      <Container>
        <Quote data={data} />
      </Container>
    </BackgroundContainer>
  )
}
