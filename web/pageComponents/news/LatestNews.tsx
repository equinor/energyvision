import { Heading } from '@components'
import styled from 'styled-components'
import NewsCard from '../cards/NewsCard'
import type { CardData } from '../../types/types'
import { FormattedMessage } from 'react-intl'
import { Carousel } from '../shared/Carousel'

const StyledHeading = styled(Heading)`
  margin: var(--space-xLarge);
`

const StyledNewsCard = styled(NewsCard)`
  width: 100%;
  --card-maxWidth: 400px;
  --card-minWidth: 280px;
  min-width: var(--card-minWidth);
  max-width: var(--card-maxWidth);
`

type LatestNewsProp = {
  data: CardData[]
}

const LatestNews = ({ data }: LatestNewsProp) => {
  return (
    <>
      <StyledHeading size="xl" level="h2" center>
        <FormattedMessage id="latest_news" defaultMessage="Latest News" />
      </StyledHeading>
      <Carousel horizontalPadding>
        {data.map((newsItem: CardData) => (
          <StyledNewsCard data={newsItem} key={newsItem.id} />
        ))}
      </Carousel>
    </>
  )
}

export default LatestNews
