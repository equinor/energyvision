import { Heading } from '@components'
import styled from 'styled-components'
import NewsCard from './NewsCard'
import type { NewsCardData } from '../../types/types'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-row-gap: 4rem;
  grid-column-gap: 2rem;
`

type LatestNewsProp = {
  data: NewsCardData[]
}

const LatestNews = ({ data }: LatestNewsProp) => {
  return (
    <>
      <Heading size="xl" level="h2" center>
        {/* @TODO: Localization, where does this text come from */}
        Latest news
      </Heading>
      <Wrapper>
        {data.map((newsItem: NewsCardData) => {
          return <NewsCard data={newsItem} key={newsItem.id} />
        })}
      </Wrapper>
    </>
  )
}

export default LatestNews
