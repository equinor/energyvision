import * as fs from 'fs'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { SkipNavContent } from '@reach/skip-nav'
import { Heading, Link, List, Layout } from '@components'
import { menuQuery } from '../../../lib/queries/menu'
import { getClient } from '../../../lib/sanity.server'
import { mapLocaleToLang } from '../../../lib/localization'
import styled from 'styled-components'
import Header from '../../../pageComponents/shared/Header'
import type { MenuData } from '../../../types/types'

import { default as NextLink } from 'next/link'

const Container = styled.div`
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;
`

type AllArchivedNewsProps = {
  data: {
    newsList: any
    menuData: MenuData
  }
}

export default function AllArchivedNews({ data }: AllArchivedNewsProps) {
  const router = useRouter()
  const { locale } = router

  const { newsList } = data
  // @TODO: Norwegian version
  //   @TODO: Avoid duplicate description, write one for the archived pages

  return (
    <>
      <NextSeo
        title="Archived news"
        description="Keep updated on news from Equinor. Find all our general news, stock market announcements and notifiable tradings here in our news archive."
      ></NextSeo>
      <Head>
        <title>Archived news</title>
      </Head>
      <Container>
        <Heading level="h1" size="2xl" style={{ margin: '1rem 0' }}>
          {/* @TODO Language strings */}
          {locale === 'no' ? 'Arkiverte nyheter fra 2016 til 2018' : '2016 to 2018 archived news page list'}
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
    </>
  )
}

// eslint-disable-next-line react/display-name
AllArchivedNews.getLayout = (page: AppProps) => {
  /* The getLayout pattern is a way to preserve state in the layout
  across client side navigation. The downside is that since it's just an
  ordinary function, we can't use the preview subcscription hook out of the box.
  As a consequence, preview for the menu data is not available.

  If this is a problem, we need to see if we are able to find another solution  */

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { props } = page

  const { data } = props
  const slugs = {
    en_GB: '/en/news/archive',
    nb_NO: '/no/nyheter/arkiv',
  }
  return (
    <Layout>
      <Header slugs={slugs} data={data?.menuData} />

      <SkipNavContent />
      {page}
    </Layout>
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

export const getStaticProps: GetStaticProps = async ({ preview = false, locale = 'en' }) => {
  const newsPaths = fs
    .readFileSync(process.cwd() + `/lib/archive/news2016To2018.txt`)
    .toString()
    .replace(/\r/g, '')
    .split(/\n/)

  const newsList = newsPaths
    // @TODO: Revisit with i18n
    .filter((pagePath) => pagePath.startsWith(`/${locale}`))
    .map((pagePath) => sanitizeNewsURL(pagePath))
  const menuData = await getClient(preview).fetch(menuQuery, { lang: mapLocaleToLang(locale) })
  return {
    props: {
      data: { newsList, menuData },
    },
  }
}
