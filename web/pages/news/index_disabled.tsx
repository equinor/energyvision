import Head from 'next/head'
import NextLink from 'next/link'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { BackgroundContainer, Card, Link } from '@components'
import { Layout } from '../../pageComponents/shared/Layout'
import styled from 'styled-components'
import { allNewsQuery } from '../../lib/queries/news'
import { menuQuery } from '../../lib/queries/menu'
import { footerQuery } from '../../lib/queries/footer'
import { getClient } from '../../lib/sanity.server'
import type { NewsSchema, MenuData } from '../../types/types'
import NewsCard from '../../pageComponents/news/NewsCard'
import PageHeader from '../../pageComponents/shared/Header'
import { mapLocaleToLang } from '../../lib/localization'
import { SkipNavContent } from '@reach/skip-nav'

const { Title, Header, Action } = Card

const TempWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-row-gap: 4rem;
  grid-column-gap: 2rem;
`

const Container = styled.main`
  padding: var(--space-large);
`

type AllNewsProps = {
  data: {
    allNews: NewsSchema[]
    menuData: MenuData
  }
  preview?: boolean
}

export default function AllNews({ data }: AllNewsProps): JSX.Element {
  const router = useRouter()
  const { locale } = router

  const { allNews } = data
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
              <NextLink passHref href={`/${locale}/news/archive`}>
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
  const { data, preview } = props

  return (
    <Layout footerData={data?.footerData} preview={preview}>
      <PageHeader
        /*  @TODO: Fetch in a proper way */
        slugs={{
          en_GB: '/en/news',
          nb_NO: '/no/nyheter',
        }}
        data={data?.menuData}
      />

      <SkipNavContent />
      {page}
    </Layout>
  )
}

export async function getStaticProps({ preview = false, locale = 'en' }) {
  // const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery))
  const allNews = await getClient(preview).fetch(allNewsQuery, { lang: mapLocaleToLang(locale) })
  const menuData = await getClient(preview).fetch(menuQuery, { lang: mapLocaleToLang(locale) })
  const footerData = await getClient(preview).fetch(footerQuery, { lang: mapLocaleToLang(locale) })
  return {
    props: {
      preview,
      data: { allNews, menuData, footerData },
    },
    revalidate: 1,
  }
}
