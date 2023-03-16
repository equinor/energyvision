import { GetServerSideProps } from 'next'
import { InstantSearchSSRProvider } from 'react-instantsearch-hooks-web'
import { getServerState } from 'react-instantsearch-hooks-server'
import type { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl'
import Footer from '../../pageComponents/shared/Footer'
import Header from '../../pageComponents/shared/Header'
import { magazineIndexQuery } from '../../lib/queries/magazine'
import getIntl from '../../common/helpers/getIntl'
import { getNameFromLocale, getIsoFromLocale } from '../../lib/localization'
import { defaultLanguage } from '../../languages'
import MagazineIndexPage from '../../pageComponents/pageTemplates/MagazineIndexPage'
import { AlgoliaIndexPageType, MagazineIndexPageType } from '../../types'
import { getComponentsData } from '../../lib/fetchData'

export default function MagazineIndex({ serverState, isServerRendered = false, data, url }: AlgoliaIndexPageType) {
  const defaultLocale = defaultLanguage.locale
  const { pageData, slug, intl } = data
  const locale = intl?.locale || defaultLocale
  return (
    <InstantSearchSSRProvider {...serverState}>
      <IntlProvider
        locale={getIsoFromLocale(locale)}
        defaultLocale={getIsoFromLocale(defaultLocale)}
        messages={intl?.messages}
      >
        <MagazineIndexPage
          isServerRendered={isServerRendered}
          locale={locale}
          pageData={pageData as MagazineIndexPageType}
          slug={slug}
          url={url}
        />
      </IntlProvider>
    </InstantSearchSSRProvider>
  )
}

MagazineIndex.getLayout = (page: AppProps) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { props } = page
  const { data } = props

  // Too hardcoded?
  const slugs = [
    { slug: '/magazine', lang: 'en_GB' },
    { slug: '/magasin', lang: 'nb_NO' },
  ]
  const defaultLocale = defaultLanguage.locale
  const locale = data?.intl?.locale || defaultLocale

  return (
    <IntlProvider
      locale={getIsoFromLocale(locale)}
      defaultLocale={getIsoFromLocale(defaultLocale)}
      messages={data?.intl?.messages}
    >
      <>
        <Header slugs={slugs} menuData={data?.menuData} />
        {page}
        <Footer footerData={data?.footerData} />
      </>
    </IntlProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, preview = false, locale = 'en' }) => {
  // For the time being, let's just give 404 for satellites
  // We will also return 404 if the locale is not English.
  // This is a hack and and we should improve this at some point
  // See https://github.com/vercel/next.js/discussions/18485

  if (locale !== 'en') {
    return {
      notFound: true,
    }
  }

  const lang = getNameFromLocale(locale)
  const intl = await getIntl(locale, false)

  const queryParams = {
    lang,
  }

  const slug = req.url

  const { menuData, pageData, footerData } = await getComponentsData(
    {
      query: magazineIndexQuery,
      queryParams,
    },
    preview,
  )

  const url = new URL(req.headers.referer || `https://${req.headers.host}${req.url}`).toString()
  const serverState = await getServerState(
    <MagazineIndex
      isServerRendered
      data={{
        intl,
        pageData,
        slug,
      }}
      url={url}
    />,
  )

  return {
    props: {
      serverState,
      url,
      data: {
        menuData,
        footerData,
        intl,
        pageData,
        slug,
      },
    },
  }
}
