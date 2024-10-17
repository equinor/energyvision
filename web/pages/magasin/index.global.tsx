import { GetServerSideProps } from 'next'
import type { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl'
import Footer from '../../pageComponents/shared/Footer'
import Header from '../../pageComponents/shared/Header'
import { allMagazineDocuments, getMagazineArticlesByTag, magazineIndexQuery } from '../../lib/queries/magazine'
import getIntl from '../../common/helpers/getIntl'
import { getNameFromLocale, getIsoFromLocale } from '../../lib/localization'
import { defaultLanguage } from '../../languages'
import { AlgoliaIndexPageType, MagazineIndexPageType } from '../../types'
import { getComponentsData, getData, MagazineQueryParams } from '../../lib/fetchData'
import MagazineRoom from '../../templates/magazine/Magazineroom'

export default function MagazineIndexNorwegian({ data }: AlgoliaIndexPageType) {
  const defaultLocale = defaultLanguage.locale
  const { pageData, slug, intl } = data
  const locale = intl?.locale || defaultLocale

  return (
    <IntlProvider
      locale={getIsoFromLocale(locale)}
      defaultLocale={getIsoFromLocale(defaultLocale)}
      messages={intl?.messages}
    >
      <MagazineRoom pageData={pageData as MagazineIndexPageType} slug={slug} />
    </IntlProvider>
  )
}

MagazineIndexNorwegian.getLayout = (page: AppProps) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { props } = page
  const { data } = props

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
      {/*
       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore */}
      <>
        <Header slugs={slugs} menuData={data?.menuData} />
        {page}
        <Footer footerData={data?.footerData} />
      </>
    </IntlProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, preview = false, locale = 'no', query }) => {
  // For the time being, let's just give 404 for satellites
  // We will also return 404 if the locale is not Norwegian.
  // This is a hack and and we should improve this at some point
  // See https://github.com/vercel/next.js/discussions/18485

  if (locale !== 'no') {
    return {
      notFound: true,
    }
  }

  const lang = getNameFromLocale(locale)
  const intl = await getIntl(locale, false)

  let queryParams: MagazineQueryParams = {
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

  let magazineList = []
  if (query?.tag) {
    queryParams = {
      ...queryParams,
      tag: query.tag as string,
    }
    const magazineGroq = getMagazineArticlesByTag(false, false)
    const { data } = await getData({
      query: magazineGroq,
      queryParams,
    })

    magazineList = data
  } else {
    const { data } = await getData({
      query: allMagazineDocuments,
      queryParams,
    })
    magazineList = data
  }

  return {
    props: {
      data: {
        menuData,
        footerData,
        intl,
        pageData: {
          ...pageData,
          magazineArticles: magazineList,
          query,
        },
        slug,
      },
    },
  }
}
