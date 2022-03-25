import { GetServerSideProps } from 'next'
import { InstantSearchSSRProvider } from 'react-instantsearch-hooks'
import { getServerState } from 'react-instantsearch-hooks-server'
import type { AppProps } from 'next/app'
//import { history } from 'instantsearch.js/es/lib/routers/index.js'
import { IntlProvider } from 'react-intl'
import { getClient } from '../../lib/sanity.server'
import Footer from '../../pageComponents/shared/Footer'
import Header from '../../pageComponents/shared/Header'
import getPageSlugs from '../../common/helpers/getPageSlugs'
import { menuQuery as globalMenuQuery } from '../../lib/queries/menu'
import { footerQuery } from '../../lib/queries/footer'
import { simpleMenuQuery } from '../../lib/queries/simpleMenu'
import getIntl from '../../common/helpers/getIntl'
import { getNameFromLocale, getIsoFromLocale } from '../../lib/localization'
import { defaultLanguage } from '../../languages'
import { isGlobal } from '../../common/helpers/datasetHelpers'
import NewsRoomPage from '../../pageComponents/pageTemplates/NewsRoomPage'
import { NewsRoomProps } from '../../types'

export default function NewsRoom({ serverState, isServerRendered = false, /* url, */ data }: NewsRoomProps) {
  const defaultLocale = defaultLanguage.locale
  const locale = data?.intl?.locale || defaultLocale

  return (
    <>
      <InstantSearchSSRProvider {...serverState}>
        <IntlProvider
          locale={getIsoFromLocale(locale)}
          defaultLocale={getIsoFromLocale(defaultLocale)}
          messages={data?.intl?.messages}
        >
          <NewsRoomPage isServerRendered={isServerRendered} locale={locale} />
        </IntlProvider>
      </InstantSearchSSRProvider>
    </>
  )
}

NewsRoom.getLayout = (page: AppProps) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { props } = page
  const { data } = props
  const slugs = getPageSlugs(data)
  const defaultLocale = defaultLanguage.locale
  const locale = data?.intl?.locale || defaultLocale

  return (
    <>
      {/* The intl provider doesn't seem to be necessary here, but I don't quite understand why so 
      keeping it just to be sure:/ */}
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

export const getServerSideProps: GetServerSideProps = async ({ /* req, */ locale = 'en' }) => {
  // For the time being, let's just give 404 for satellites
  // We will also return 404 if the locale is not English.
  // This is a hack and and we should improve this at some point
  // See https://github.com/vercel/next.js/discussions/18485
  if (!isGlobal || locale !== 'en') {
    return {
      notFound: true,
    }
  }

  const lang = getNameFromLocale(locale)

  const menuQuery = isGlobal ? globalMenuQuery : simpleMenuQuery
  const menuData = await getClient(false).fetch(menuQuery, { lang: lang })
  const footerData = await getClient(false).fetch(footerQuery, { lang: lang })
  const intl = await getIntl(locale, false)
  //const url = new URL(req.headers.referer || `https://${req.headers.host}${req.url}`).toString()
  const serverState = await getServerState(
    <NewsRoom
      isServerRendered
      data={{
        intl,
      }} /* url={url} */
    />,
  )

  return {
    props: {
      serverState,
      // url,
      data: {
        menuData,
        footerData,
        intl,
      },
    },
  }
}
