import Quote from '../shared/Quote'
import type { QuoteData } from '../../types/types'
import styled from 'styled-components'
import { BackgroundContainer } from '@components'

const Container = styled.div`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: auto;
`

const PageQuote = ({ data }: { data: QuoteData }) => {
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

export default PageQuote
