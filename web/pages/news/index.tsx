import Head from 'next/head'
import NextLink from 'next/link'
import type { AppProps } from 'next/app'
import { Layout, BackgroundContainer, Card, Link } from '@components'
import { allNewsQuery } from '../../lib/queries/news'
import { getClient } from '../../lib/sanity.server'
import styled from 'styled-components'
import type { NewsSchema } from '../../types/types'
import NewsCard from '../../tempcomponents/news/NewsCard'
import { Menu } from '../../tempcomponents/shared/Menu'

const { Title, Header, Action } = Card

const TempWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-row-gap: 4rem;
  grid-column-gap: 2rem;
`

const Container = styled.div`
  padding: var(--space-large);
`

type AllNewsProps = {
  allNews: NewsSchema[]
  preview?: boolean
}

export default function AllNews({ allNews, preview }: AllNewsProps): JSX.Element {
  return (
    <>
      <Head>
        {/* TODO: Something more advanced */}
        <title>News</title>
      </Head>

      <Container>
        <h1>News</h1>
        <BackgroundContainer background="Moss Green">
          <Card type="promo" textOnly>
            <Header>
              <Title>Are you looking for yesterday&apos;s news? We&apos;ve got you covered by the archive.</Title>
            </Header>

            <Action>
              <NextLink passHref href="/en/news/archive">
                <Link variant="buttonLink" aria-label="Go to archived news">
                  Take me there!
                </Link>
              </NextLink>
            </Action>
          </Card>
        </BackgroundContainer>
        {allNews.length > 0 && (
          <TempWrapper style={{ marginTop: 'var(--space-medium' }}>
            {allNews.map((newsItem: NewsSchema) => {
              return <NewsCard data={newsItem} key={newsItem.id} />
            })}
          </TempWrapper>
        )}
      </Container>
    </>
  )
}

// eslint-disable-next-line react/display-name
AllNews.getLayout = (page: AppProps) => {
  // This is just an ordinary function

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { props } = page

  const { preview } = props

  return (
    <Layout preview={preview}>
      <Menu
        /*  @TODO: Fetch in a proper way */
        slugs={{
          en_GB: '/en/news',
          nb_NO: '/no/nyheter',
        }}
      />
      {page}
    </Layout>
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
