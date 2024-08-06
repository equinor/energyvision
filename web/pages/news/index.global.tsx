import { getNewsroomComponentsData } from '../../lib/fetchData'
import { newsroomQuery } from '../../lib/queries/newsroom'
import { getIsoFromLocale, getNameFromLocale } from '../../lib/localization'
import getIntl from '../../common/helpers/getIntl'
import { defaultLanguage } from '../../languages'
import { IntlProvider } from 'react-intl'
import Header from '../../pageComponents/shared/Header'
import Footer from '../../pageComponents/shared/Footer'
import { FooterColumns, IntlData, MagazineIndexPageType, MenuData, NewsRoomPageType } from '../../types'
import { AppProps } from 'next/app'
import NewsRoomTemplate from '../../templates/newsroom/Newsroom'

type NewsRoom = {
  url: string
  data: {
    menuData?: MenuData
    footerData?: {
      footerColumns: FooterColumns[]
    }
    intl?: IntlData
    pageData?: MagazineIndexPageType | NewsRoomPageType
    slug?: string | undefined
  }
}

export const getServerSideProps = async ({ req, preview = false, locale = 'en' }) => {
  if (locale !== 'en') {
    return {
      notFound: true,
    }
  }
  const lang = getNameFromLocale(locale)
  const intl = await getIntl(locale, false)
  const queryParams = { lang }
  const slug = req.url

  const { menuData, pageData, footerData } = await getNewsroomComponentsData(
    {
      query: newsroomQuery,
      queryParams,
    },
    preview,
  )

  const url = new URL(req.headers.referer || `https://${req.headers.host}${req.url}`).toString()
  const newsRoom: NewsRoom = {
    url,
    data: {
      menuData,
      footerData,
      intl,
      pageData,
      slug,
    },
  }

  return {
    props: { ...newsRoom },
  }
}

export default function NewsRoom({ data, url }: NewsRoom) {
  const defaultLocale = defaultLanguage.locale
  const { pageData, slug, intl } = data
  const locale = data?.intl?.locale || defaultLocale
  return <NewsRoomTemplate locale={locale} pageData={pageData as NewsRoomPageType} slug={slug} />
}
NewsRoom.getLayout = (page: AppProps) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { props } = page
  const { data } = props

  // Too hardcoded?
  const slugs = [
    { slug: '/news', lang: 'en_GB' },
    { slug: '/nyheter', lang: 'nb_NO' },
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
