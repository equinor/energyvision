import Head from 'next/head'
import Link from 'next/link'
import { Layout, Card } from '@components'
import { newsQuery } from '../../lib/queries'
import { getClient } from '../../lib/sanity.server'
import styled from 'styled-components'
import BlockContent from '@sanity/block-content-to-react'

const { Title, Header, Action, Arrow, Media, CardLink, Text } = Card

const ImagePlaceholder = styled.div`
  background-color: hsl(0, 0%, 86%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  /* TODO: Fix border radius on image */
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`

const RatioBox = styled.div`
  position: relative;
  height: 0;
  display: block;
  width: 100%;
  padding-bottom: 56.25%;
`

const TempWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-row-gap: 4rem;
  grid-column-gap: 2rem;
`

type Block = {
  _type: string
  children: []
}

type NewsSchema = {
  slug: string
  title: string
  id: string
  // How should we do this????
  ingress: Block[]
}

type NewsProps = {
  allNews: NewsSchema[]
  preview?: boolean
}

export default function News({ allNews, preview }: NewsProps): JSX.Element {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          {/* TODO: Something more advanced */}
          <title>News</title>
        </Head>
        {allNews.length > 0 && (
          <TempWrapper>
            {allNews.map((newsItem: NewsSchema) => {
              const { slug, title, id, ingress } = newsItem
              return (
                <Link href={`/news/${slug}`} key={id}>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <CardLink>
                    <Card>
                      <Media>
                        <RatioBox>
                          <ImagePlaceholder />
                        </RatioBox>
                      </Media>
                      <Header>
                        <Title>{title}</Title>
                      </Header>
                      <Text>
                        <BlockContent blocks={ingress}></BlockContent>
                      </Text>
                      <Action>
                        <Arrow />
                      </Action>
                    </Card>
                  </CardLink>
                </Link>
              )
            })}
          </TempWrapper>
        )}
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  // const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery))
  const allNews = await getClient(preview).fetch(newsQuery)
  return {
    // props: { allNews, preview },
    props: { allNews },
  }
}
