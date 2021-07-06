import Quote from '../shared/Quote'
import type { QuoteData } from '../../types/types'
import styled from 'styled-components'

const Container = styled.div`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: auto;
`

const PageQuote = ({ data }: { data: QuoteData }) => (
  <Container>
    <Quote data={data} />
  </Container>
)

export default PageQuote
