import { GetServerSideProps } from 'next'
import Error from 'next/error'
import { default as NextLink } from 'next/link'
import { InstantSearch, InstantSearchServerState, InstantSearchSSRProvider } from 'react-instantsearch-hooks'
import { getServerState } from 'react-instantsearch-hooks-server'
import type { AppProps } from 'next/app'
import { history } from 'instantsearch.js/es/lib/routers/index.js'
import { searchClientServer } from '../../lib/algolia'
import { IntlProvider } from 'react-intl'
import { Hits } from '../../pageComponents/news/newsRoom/Hits'
import { RefinementList } from '../../pageComponents/news/newsRoom/RefinementList'
import styled from 'styled-components'
import { getClient } from '../../lib/sanity.server'
import Footer from '../../pageComponents/shared/Footer'
import Header from '../../pageComponents/shared/Header'
import getPageSlugs from '../../common/helpers/getPageSlugs'
import { Text, Heading, FormattedDate } from '@components'
import UncontrolledSearchBox from '../../pageComponents/search/UncontrolledSearchBox'
import { isGlobal } from '../../common/helpers/datasetHelpers'
import { menuQuery as globalMenuQuery } from '../../lib/queries/menu'
import { footerQuery } from '../../lib/queries/footer'
import { simpleMenuQuery } from '../../lib/queries/simpleMenu'
import getIntl from '../../common/helpers/getIntl'
import { getNameFromLocale, getIsoFromLocale } from '../../lib/localization'
import { defaultLanguage } from '../../languages'
import type { MenuData, FooterColumns, IntlData } from '../../types/types'

type NewsRoomProps = {
  serverState?: InstantSearchServerState
  url: string
  data?: {
    menuData: MenuData
    footerData: { footerColumns: FooterColumns[] }
    intl: IntlData
  }
  errorCode?: number
}

const Wrapper = styled.div`
  grid-template-areas:
    'intro intro'
    'news  news';
  grid-template-rows: auto auto;

  display: grid;
`
const Intro = styled.div`
  grid-area: intro;
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-medium) var(--space-xLarge)
    var(--layout-paddingHorizontal-medium);
`

const News = styled.div`
  grid-area: news;
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-small) var(--space-xLarge)
    var(--layout-paddingHorizontal-small);
`

const NewsRoomContent = styled.div`
  display: grid;
  grid-template-areas:
    'filter'
    'list';
  @media (min-width: 800px) {
    grid-template-columns: 70% 30%;
    grid-template-areas: 'list filter';
  }
`
const Filters = styled.div`
  grid-area: filter;
`

const NewsList = styled.div`
  grid-area: list;
`

const StyledHitLink = styled.a`
  padding: var(--space-medium) 0;
  display: block;
  color: var(--default-text);
  cursor: pointer;
  outline: none;
  text-decoration: none;
`

const Refinement = styled.div`
  padding: var(--space-medium) 0;
`

// @TODO Types
function Hit({ hit }: any) {
  return (
    <NextLink href={hit.slug} passHref>
      <StyledHitLink>
        <article>
          {hit.publishDateTime && <FormattedDate datetime={hit.publishDateTime} uppercase />}
          <Heading level="h2" size="lg">
            {hit.pageTitle}
          </Heading>
          {/*  <Text>{hit.text}</Text> */}
        </article>
      </StyledHitLink>
    </NextLink>
  )
}

export default function NewsRoom({ serverState, url, data, errorCode }: NewsRoomProps) {
  if (errorCode && errorCode === 404) {
    return <Error statusCode={404} />
  }
  const defaultLocale = defaultLanguage.locale
  const locale = data?.intl?.locale || defaultLocale

  return (
    <>
      <IntlProvider
        locale={getIsoFromLocale(locale)}
        defaultLocale={getIsoFromLocale(defaultLocale)}
        messages={data?.intl?.messages}
      >
        <InstantSearchSSRProvider {...serverState}>
          <Wrapper>
            <Intro>
              <Heading size="2xl" level="h1">
                Newsroom
              </Heading>
              <Text>
                We’re Equinor, a broad energy company with more than 20,000 colleagues committed to developing oil, gas,
                wind and solar energy in more than 30 countries worldwide. We’re dedicated to safety, equality and
                sustainability.
              </Text>
            </Intro>
            <News>
              <InstantSearch
                searchClient={searchClientServer}
                indexName="dev_NEWS_en-GB"
                routing={{
                  router: history({
                    getLocation() {
                      if (typeof window === 'undefined') {
                        return new URL(url!) as unknown as Location
                      }

                      return window.location
                    },
                  }),
                }}
                /*   routing={{
                  router: history({
                    getLocation: () =>
                      typeof window === 'undefined' ? url : window.location,
                  }),
                }} */
              >
                <NewsRoomContent>
                  <Filters>
                    <div style={{ padding: '1rem', backgroundColor: 'var(--slate-blue-95)' }}>
                      <UncontrolledSearchBox />
                    </div>
                    <Refinement>
                      <span>Year</span>
                      <RefinementList sortBy={['name:desc']} attribute="year" />
                    </Refinement>
                  </Filters>

                  <NewsList>
                    <Hits hitComponent={Hit} />
                  </NewsList>
                </NewsRoomContent>
              </InstantSearch>
            </News>
          </Wrapper>
        </InstantSearchSSRProvider>
      </IntlProvider>
    </>
  )
}

NewsRoom.getLayout = (page: AppProps) => {
  /* The getLayout pattern is a way to preserve state in the layout
  across client side navigation. The downside is that since it's just an
  ordinary function, we can't use the preview subcscription hook out of the box.
  As a consequence, preview for the menu data is not available.

  If this is a problem, we need to see if we are able to find another solution  */

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { props } = page
  const { data } = props
  const slugs = getPageSlugs(data)
  const defaultLocale = defaultLanguage.locale
  const locale = data?.intl?.locale || defaultLocale

  return (
    <>
      <IntlProvider
        locale={getIsoFromLocale(locale)}
        defaultLocale={getIsoFromLocale(defaultLocale)}
        messages={data?.intl?.messages}
      >
        <Header slugs={slugs} menuData={data?.menuData} />
        {page}
        <Footer footerData={data?.footerData} />
      </IntlProvider>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, locale = 'en' }) => {
  // For the time being, let's just give 404 for satellites
  // This will not use the styled 404 page, but whatever
  if (!isGlobal) {
    return {
      props: { errorCode: 404 },
    }
  }
  const url = new URL(req.headers.referer || `https://${req.headers.host}${req.url}`).toString()
  const serverState = await getServerState(<NewsRoom url={url} />)
  console.log('server', serverState, url)
  const lang = getNameFromLocale(locale)

  const menuQuery = isGlobal ? globalMenuQuery : simpleMenuQuery
  const menuData = await getClient(false).fetch(menuQuery, { lang: lang })
  const footerData = await getClient(false).fetch(footerQuery, { lang: lang })
  const intl = await getIntl(locale, false)

  return {
    props: {
      serverState,
      url,
      data: {
        menuData,
        footerData,
        intl,
      },
    },
  }
}
