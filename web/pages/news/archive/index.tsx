import * as fs from 'fs'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import { Heading, Link, List, Layout } from '@components'
import { GetStaticProps /* GetStaticPaths */ } from 'next'
import styled from 'styled-components'

import { default as NextLink } from 'next/link'

const Container = styled.div`
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;
`

export default function AllArchivedNews({ newsList }: any) {
  return (
    <>
      {/* @TODO: Norwegian version */}
      {/*       @TODO: Avoid duplicate description, write one for the archived pages
 */}      <NextSeo
        title="Archived news"
        description="Keep updated on news from Equinor. Find all our general news, stock market announcements and notifiable tradings here in our news archive."


      ></NextSeo>
      <Layout>
        <Head>
          <title>Archived news</title>
        </Head>
        <Container>
          <Heading level="h1" size="2xl" style={{ margin: '1rem 0' }}>
            2016 to 2018 archived news page list
          </Heading>
          {newsList && (
            <List unstyled>
              {newsList.map((value: string) => {
                return (
                  <List.Item key={value}>
                    <NextLink href={value} passHref>
                      <Link>{value}</Link>
                    </NextLink>
                  </List.Item>
                )
              })}
            </List>
          )}
        </Container>
      </Layout>
    </>
  )
}

const sanitizeNewsURL = (pagePath: string): string => {
  const languageCode = pagePath.substr(0, 3)
  const restOfThePage = pagePath.substr(pagePath.lastIndexOf('/'))
  return languageCode + '/news/archive' + removeHTMLExtension(restOfThePage)
}

const removeHTMLExtension = (path: string): string => {
  return path.replace('.html', '')
}

export const getStaticProps: GetStaticProps = async () => {
  const newsPaths = fs
    .readFileSync(process.cwd() + `/pages/news/archive/resources/news2016To2018.txt`)
    .toString()
    .replace(/\r/g, '')
    .split(/\n/)

  const newsList = newsPaths
    // @TODO: Revisit with i18n
    .filter((pagePath) => pagePath.startsWith('/en'))
    .map((pagePath) => sanitizeNewsURL(pagePath))

  return {
    props: {
      newsList: newsList,
    },
  }
}

// @TODO: We don't need this until i18n
/* export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['/en/news/archive', '/no/news/archive'],
    fallback: true,
  }
} */
