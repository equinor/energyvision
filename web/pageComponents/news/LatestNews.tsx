import { Heading } from '@components'
import styled from 'styled-components'
import NewsCard from '../cards/NewsCard'
import type { CardData } from '../../types/types'
import { FormattedMessage } from 'react-intl'
import { HorizontalScroll, HorizontalScrollItem } from '../shared/Carousel'
import useWindowSize from '../../lib/hooks/useWindowSize'
import { Flags } from '../../common/helpers/datasetHelpers'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(calc(15 * var(--space-medium)), 1fr));
  grid-row-gap: calc(4 * var(--space-medium));
  grid-column-gap: var(--space-xLarge);
  /** @TODO: Clamp? */
  @media (min-width: 1300px) {
    grid-column-gap: calc(4 * var(--space-medium)); // TODO: 64 Missing from spacings, try 56 (--space-3xLarge)
  }
  @media (min-width: 1900px) {
    grid-column-gap: var(--space-4xLarge);
  }
`

const DevWrapper = styled.div`
  --card-maxWidth: 400px;

  display: flex;
  gap: var(--space-large);
  justify-content: center;
  align-content: center;
`

const StyledHeading = styled(Heading)`
  margin: var(--space-xLarge);
`

const StyledNewsCard = styled(NewsCard)`
  min-width: var(--card-minWidth);
  max-width: var(--card-maxWidth);
  flex-basis: 0;
  flex-grow: 1;
`

type LatestNewsProp = {
  data: CardData[]
}

const LatestNews = ({ data }: LatestNewsProp) => {
  const { width } = useWindowSize()
  const renderScroll = Boolean(width && width <= 800)

  if (Flags.IS_DEV) {
    return (
      <>
        <StyledHeading size="xl" level="h2" center>
          <FormattedMessage id="latest_news" defaultMessage="Latest News" />
        </StyledHeading>

        {renderScroll ? (
          <HorizontalScroll type="card">
            {data.map((newsItem: CardData) => (
              <HorizontalScrollItem key={newsItem.id}>
                <StyledNewsCard data={newsItem} key={newsItem.id} />
              </HorizontalScrollItem>
            ))}
          </HorizontalScroll>
        ) : (
          <DevWrapper>
            {data.map((newsItem: CardData) => {
              return <StyledNewsCard data={newsItem} key={newsItem.id} />
            })}
          </DevWrapper>
        )}
      </>
    )
  }

  return (
    <>
      <StyledHeading size="xl" level="h2" center>
        <FormattedMessage id="latest_news" defaultMessage="Latest News" />
      </StyledHeading>

      <Wrapper>
        {data.map((newsItem: CardData) => {
          return <NewsCard data={newsItem} key={newsItem.id} />
        })}
      </Wrapper>
    </>
  )
}

export default LatestNews
