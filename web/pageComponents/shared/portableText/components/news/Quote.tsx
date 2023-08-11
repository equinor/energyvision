import styled from 'styled-components'
import QuoteComponent from '../../../Quote'

import type { PortableTextBlock } from '@portabletext/types'
import type { QuoteData } from '../../../../../types/types'

const Container = styled.div`
  padding: 0 var(--layout-paddingHorizontal-medium);
  margin: var(--space-3xLarge) auto;
  clear: both;
`

type QuoteRenderer = {
  _key: string
  _type: string
} & QuoteData

type BlockProps = {
  isInline: boolean
  value: QuoteRenderer
} & PortableTextBlock

export const Quote = (quote: BlockProps) => {
  const { value } = quote
  const data = {
    ...value,
    type: value._type,
    id: value._key,
  }

  return (
    <Container>
      <QuoteComponent data={data} />
    </Container>
  )
}
