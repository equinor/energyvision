import { GetServerSideProps } from 'next'
import Error from 'next/error'
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

export default function NewsRoom({ serverState, isServerRendered = false, /* url, */ data, errorCode }: NewsRoomProps) {
  if (errorCode && errorCode === 404) {
    return <Error statusCode={404} />
  }

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
          <NewsRoomPage isServerRendered={isServerRendered} />
        </IntlProvider>
      </InstantSearchSSRProvider>
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

export const getServerSideProps: GetServerSideProps = async ({ /* req, */ locale = 'en' }) => {
  // For the time being, let's just give 404 for satellites
  // This will not use the styled 404 page, but whatever
  if (!isGlobal) {
    return {
      props: { errorCode: 404 },
    }
  }
  //const url = new URL(req.headers.referer || `https://${req.headers.host}${req.url}`).toString()
  const serverState = await getServerState(<NewsRoom isServerRendered /* url={url} */ />)
  const lang = getNameFromLocale(locale)

  const menuQuery = isGlobal ? globalMenuQuery : simpleMenuQuery
  const menuData = await getClient(false).fetch(menuQuery, { lang: lang })
  const footerData = await getClient(false).fetch(footerQuery, { lang: lang })
  const intl = await getIntl(locale, false)

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
