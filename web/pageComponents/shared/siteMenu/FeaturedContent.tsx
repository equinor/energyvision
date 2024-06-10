import styled from 'styled-components'
import NewsCard from '../../cards/NewsCard'
import TopicPageCard from '../../cards/TopicPageCard'
import FeaturedEventCard from '../../cards/FeaturedEventCard'
import type { FeaturedContentData } from '../../../types/index'

const Promoted = styled.div`
  margin-top: var(--space-medium);
  /*   We decided to hide the featured content on mobile
 */
  display: none;
  @media (min-width: 1300px) {
    display: block;
    width: calc(18 * var(--space-medium));
    margin-top: 0;
    padding-left: var(--space-medium);
    border-left: 1px solid var(--grey-30);
  }
`

type Props = {
  data: FeaturedContentData
}

const FeaturedContent = ({ data }: Props) => {
  if (!data.type) return null

  const isNews = (type: string): boolean => type === 'news' || type === 'localNews'
  const isEvent = (data: FeaturedContentData): boolean => data?.routeContentType === 'event'

  if (isNews(data.type)) {
    return (
      <Promoted>
        <NewsCard data={data} fitToContent />
      </Promoted>
    )
  }

  if (isEvent(data)) {
    return (
      <Promoted>
        <FeaturedEventCard data={data} />
      </Promoted>
    )
  }

  return (
    <Promoted>
      <TopicPageCard data={data} />
    </Promoted>
  )
}

export default FeaturedContent
