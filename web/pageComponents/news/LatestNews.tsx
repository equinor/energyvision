import { Heading } from '@components'
import styled from 'styled-components'
import Head from 'next/head'
import NewsCard from '../cards/NewsCard'
import type { CardData } from '../../types/types'

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

type LatestNewsProp = {
  data: CardData[]
}

const LatestNews = ({ data }: LatestNewsProp) => {
  return (
    <>
      <Head>
        {/* eslint-disable jsx-a11y/html-has-lang */}
        <html data-template="news" />
      </Head>
      <Heading size="xl" level="h2" center>
        {/* @TODO: Localization, where does this text come from */}
        Latest news
      </Heading>
      <Wrapper>
        {data.map((newsItem: CardData) => {
          return <NewsCard data={newsItem} key={newsItem.id} />
        })}
      </Wrapper>
    </>
  )
}

export default LatestNews
