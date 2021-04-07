import Head from 'next/head'
import Link from 'next/link'
import { Layout, Card, FormattedDate } from '@components'
import { allNewsQuery } from '../../lib/queries'
import { getClient } from '../../lib/sanity.server'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import styled from 'styled-components'
import Img from 'next/image'
import { imageProps } from '../../common/helpers'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'

const { Title, Header, Action, Arrow, Media, CardLink, Text, Eyebrow } = Card

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
  publishDateTime: string
  heroImage: { _type: string; alt: string; image: SanityImageObject; caption?: string; attribution?: string }
  // How should we do this????
  ingress: Block[]
}

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
              const { slug, title, id, ingress, publishDateTime, heroImage } = newsItem
              return (
                <Link href={`/news/${slug}`} key={id} passHref shallow>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <CardLink>
                    <Card>
                      <Media>
                        <Img {...imageProps(heroImage.image, 400, 0.56)} alt={heroImage.alt} />
                      </Media>
                      <Header>
                        <Eyebrow>
                          <FormattedDate datetime={publishDateTime} />
                        </Eyebrow>
                        <Title>{title}</Title>
                      </Header>
                      <Text>
                        <SimpleBlockContent blocks={ingress}></SimpleBlockContent>
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
  const allNews = await getClient(preview).fetch(allNewsQuery)
  return {
    // props: { allNews, preview },
    props: { allNews },
    revalidate: 1,
  }
}
