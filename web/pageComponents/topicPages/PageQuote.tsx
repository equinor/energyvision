import Quote from '../shared/Quote'
import type { QuoteData } from '../../types/types'
import styled from 'styled-components'
import { BackgroundContainer } from '@components'

const Container = styled.div`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large) var(--space-3xLarge)
    var(--layout-paddingHorizontal-medium);
  max-width: var(--maxViewportWidth);
  margin: auto;
`
const PageQuote = ({ data, anchor }: { data: QuoteData; anchor?: string }) => {
  const { designOptions } = data
  const { background } = designOptions
  return (
    <BackgroundContainer background={background} id={anchor}>
      <Container>
        <Quote data={data} />
      </Container>
    </BackgroundContainer>
  )
}

export default PageQuote
