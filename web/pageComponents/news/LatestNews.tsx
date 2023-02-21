import { Heading } from '@components'
import styled from 'styled-components'
import NewsCard from '../cards/NewsCard'
import type { CardData } from '../../types/types'
import { FormattedMessage } from 'react-intl'
import { HorizontalScroll, HorizontalScrollItem } from '../shared/HorizontalScroll'
import useWindowSize from '../../lib/hooks/useWindowSize'

const Wrapper = styled.div`
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
        <Wrapper>
          {data.map((newsItem: CardData) => {
            return <StyledNewsCard data={newsItem} key={newsItem.id} />
          })}
        </Wrapper>
      )}
    </>
  )
}

export default LatestNews
