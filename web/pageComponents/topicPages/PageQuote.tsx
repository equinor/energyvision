import Quote from '../shared/Quote'
import type { QuoteData } from '../../types/types'
import styled from 'styled-components'

const Container = styled.div`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: auto;
`
/* @TODO: See #634 This should use a background container */

const PageQuote = ({ data }: { data: QuoteData }) => (
  <div className="background-none">
    <Container>
      <Quote data={data} />
    </Container>
  </div>
)

export default PageQuote
