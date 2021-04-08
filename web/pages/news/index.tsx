import Head from 'next/head'
import { Layout } from '@components'
import { allNewsQuery } from '../../lib/queries'
import { getClient } from '../../lib/sanity.server'
import styled from 'styled-components'
import type { NewsSchema } from '../../types/types'
import NewsCard from '../../tempcomponents/news/NewsCard'

const TempWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-row-gap: 4rem;
  grid-column-gap: 2rem;
`

type AllNewsProps = {
  allNews: NewsSchema[]
  preview?: boolean
}

export default function AllNews({ allNews, preview }: AllNewsProps): JSX.Element {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          {/* TODO: Something more advanced */}
          <title>News</title>
        </Head>
        <h1>News</h1>
        {allNews.length > 0 && (
          <TempWrapper>
            {allNews.map((newsItem: NewsSchema) => {
              return <NewsCard data={newsItem} key={newsItem.id} />
            })}
          </TempWrapper>
        )}
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  // const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery))
  const allNews = await getClient(preview).fetch(allNewsQuery)
  return {
    // props: { allNews, preview },
    props: { allNews },
    revalidate: 1,
  }
}
