import styled from 'styled-components'
import NewsCard from '../../news/NewsCard'
import TopicPageCard from '../../topicPages/TopicPageCard'
import { CardData } from '../../../types/types'

const Promoted = styled.div`
  margin-top: var(--space-medium);
  /*   We decided to hide the featured content on mobile
 */
  display: none;
  @media (min-width: 1300px) {
    display: block;
    width: 18rem;
    margin-top: 0;
    padding-left: var(--space-medium);
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
