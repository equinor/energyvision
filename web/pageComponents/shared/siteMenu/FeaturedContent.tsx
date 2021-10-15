import styled from 'styled-components'
import NewsCard from '../../news/NewsCard'
import TopicPageCard from '../../topicPages/TopicPageCard'
import { CardData } from '../../../types/types'

const Promoted = styled.div`
  @media (min-width: 1300px) {
    width: 18rem;
    padding-left: var(--space-medium);
    margin-top: 35px;
    border-left: 1px solid var(--grey-30);
  }
`

type Props = {
  data: CardData
}

const FeaturedContent = ({ data }: Props) => {
  return (
    <Promoted>
      {data.type && data.type === 'news' ? <NewsCard data={data} fitToContent /> : <TopicPageCard data={data} />}
    </Promoted>
  )
}

export default FeaturedContent
