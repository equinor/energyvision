import { useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import * as fs from 'fs'
import { NextSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import getConfig from 'next/config'
import { Layout } from '../../../pageComponents/shared/Layout'
import { menuQuery as globalMenuQuery } from '../../../lib/queries/menu'
import { simpleMenuQuery } from '../../../lib/queries/simpleMenu'
import { footerQuery } from '../../../lib/queries/footer'
import { getClient } from '../../../lib/sanity.server'
import { removeHTMLExtension } from '../../../lib/archive/archiveUtils'
import { getNameFromLocale } from '../../../lib/localization'
import { languages, defaultLanguage } from '../../../languages'
import Header from '../../../pageComponents/shared/Header'
import { anchorClick } from '../../../common/helpers/staticPageHelpers'
import Head from 'next/head'
import { SkipNavContent } from '@reach/skip-nav'
import { hasArchivedNews, isGlobal } from '../../../common/helpers/datasetHelpers'
import { getFullUrl } from '../../../common/helpers/getFullUrl'
import { filterDataToSingleItem } from '../../../lib/filterDataToSingleItem'
import archivedNews from '../../../lib/archive/archivedNewsPaths.json'
import type { MenuData, SimpleMenuData } from '../../../types/types'
import { FormattedMessage } from 'react-intl'
import getIntl from '../../../common/helpers/getIntl'
import { PathType } from '../../../common/helpers/getPaths'

const { publicRuntimeConfig } = getConfig()

type PageResponseData = {
  title: string
  description: string
  content: string
  slug: string
}

type OldArchivedNewsPageProps = {
  data: {
    news: PageResponseData
    menuData?: MenuData | SimpleMenuData
  }
}

const OldArchivedNewsPage = ({ data }: OldArchivedNewsPageProps): JSX.Element => {
  const [isArchivePage, setIsArchivePage] = useState(true)
  const router = useRouter()
  const { pathname, locale } = router
  useEffect(() => {
    if (isArchivePage) {
      document.getElementById('legacyScript')?.remove()
      const scriptTag = document.createElement('script')
      scriptTag.src = '/legacy/legacy.minified.js'
      scriptTag.id = 'legacyScript'
      document.body.appendChild(scriptTag)
    }
  })

  if (!router.isFallback && !data.news) {
    setIsArchivePage(false)
    return <ErrorPage statusCode={404} />
  }
  const fullUrl = getFullUrl(pathname, data?.news?.slug, locale)
  const onLinkClicked = (e: React.MouseEvent<HTMLDivElement>) => {
    anchorClick(e, router)
  }

  const onLinkClickedKeyHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.which == 32 || e.which == 13) {
      anchorClick(e, router)
    }
  }
  return (
    <>
      {router.isFallback ? (
        <p>
          <FormattedMessage id="loading" defaultMessage="Loading..." />
        </p>
      ) : (
        // @TODO: SEO stuffs
        // @TODO: Menu
        <>
          <Head>
            <script
              src="https://consent.cookiebot.com/uc.js"
              id="Cookiebot"
              data-cbid="f1327b03-7951-45da-a2fd-9181babc783f"
              async
            />
            {/*  eslint-disable-next-line @next/next/no-css-tags */}
            <link rel="stylesheet" href="/styles/legacy.minified.css" />
          </Head>
          <NextSeo
            title={data?.news?.title}
            description={data?.news?.description}
            openGraph={{
              title: data?.news?.title,
              description: data?.news?.description,
              type: 'article',
              url: fullUrl,
            }}
          />
          {/* The <div> element has a child <button> element that allows keyboard interaction */}
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div
            className="legacyStyles"
            onClick={onLinkClicked}
            onKeyDown={onLinkClickedKeyHandler}
            dangerouslySetInnerHTML={{
              __html: data?.news?.content,
            }}
          />
        </>
        // @TODO: Footer
      )}
    </>
  )
}

// eslint-disable-next-line react/display-name
OldArchivedNewsPage.getLayout = (page: AppProps) => {
  /* The getLayout pattern is a way to preserve state in the layout
  across client side navigation. The downside is that since it's just an
  ordinary function, we can't use the preview subcscription hook out of the box.
  As a consequence, preview for the menu data is not available.

  If this is a problem, we need to see if we are able to find another solution  */

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { props } = page

  const { data } = props
  const slugData =
    data?.archivedItems?.map((data: PathType) => ({
      slug: data['slug'],
      lang: data['locale'] === 'en' ? 'en_GB' : 'nb_NO',
    })) ?? []

  return (
    <Layout intl={data?.intl} footerData={data?.footerData}>
      <>
        <Header slugs={slugData} menuData={data?.menuData} />
        <SkipNavContent />
        {page}
      </>
    </Layout>
  )
}

const fetchArchiveData = async (pagePathArray: string[], pagePath: string, locale: string): Promise<Response> => {
  if (pagePath.includes('.')) return Promise.reject()

  const archiveSeverURL = publicRuntimeConfig.archiveStorageURL

  if (pagePathArray.length > 1 && pagePathArray[0] !== 'crudeoilassays') {
    /** Check if the required page is old archived AEM page or not
     * because AEM also has archived pages which has 'archive' the page path */
    return await fetch(`${archiveSeverURL}/${locale}/news/archive/${pagePath}.json`)
  }

  return await fetch(`${archiveSeverURL}/${locale}/news/${pagePath}.json`)
}

const parseResponse = async (response: Response) => {
  try {
    const data = await response.json()
    return data
  } catch (error) {
    console.error('An error occured while parsing archive news data', error)
    return null
  }
}

type FallbackToAnotherLanguageType = Promise<
  | {
      redirect: {
        permanent: boolean
        destination: string
      }
    }
  | {
      notFound: true
    }
>

const fallbackToAnotherLanguage = async (
  pagePathArray: string[],
  pagePath: string,
  locale: string,
): FallbackToAnotherLanguageType => {
  const otherLanguages = languages.filter((lang) => lang.locale !== locale)
  const otherLocales = otherLanguages.map((lang) => lang.locale)
  const responses = await Promise.all(
    otherLocales.map(async (locale) => ({
      locale: locale,
      res: await fetchArchiveData(pagePathArray, pagePath, locale),
    })),
  )
  const response = responses && responses.find((e) => e.res.status === 200)
  if (response) {
    console.log(`Archived page does not exist with request locale: ${locale}`)
    console.log(`Redirecting to existing path: /${response.locale}/news/archive/${pagePath}`)
    return {
      redirect: {
        permanent: true,
        destination: `/${response.locale}/news/archive/${pagePath}`,
      },
    }
  } else {
    return { notFound: true }
  }
}

export const getStaticProps: GetStaticProps = async ({ preview = false, params, locale = defaultLanguage.locale }) => {
  if (!hasArchivedNews) return { notFound: true }

  const pagePathArray = params?.pagePath as string[]
  const pagePath = pagePathArray.join('/')

  const archivedItems = archivedNews.filter((e) => e.slug === `/news/archive/${pagePath}`)
  if (archivedItems.length === 0) return { notFound: true }

  const response = await fetchArchiveData(pagePathArray, pagePath, locale)

  if (response.status === 404) return fallbackToAnotherLanguage(pagePathArray, pagePath, locale)

  const pageData = await parseResponse(response)
  const menuQuery = isGlobal ? globalMenuQuery : simpleMenuQuery
  const menuDataWithDrafts = await getClient(preview).fetch(menuQuery, { lang: getNameFromLocale(locale) })
  const footerDataWithDrafts = await getClient(preview).fetch(footerQuery, { lang: getNameFromLocale(locale) })
  const intl = await getIntl(locale, preview)

  const menuData = filterDataToSingleItem(menuDataWithDrafts, preview)
  const footerData = filterDataToSingleItem(footerDataWithDrafts, preview)

  return {
    props: {
      data: {
        menuData,
        footerData,
        archivedItems,
        news: {
          ...pageData,
          slug: pagePath,
        },
        intl,
      },
    },

    notFound: !pageData,
    revalidate: 1800,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: string[] = []

  const newsPagesList = fs
    .readFileSync(process.cwd() + `/lib/archive/news2016To2018.txt`)
    .toString()
    .replace(/\r/g, '')
    .split(/\n/)

  newsPagesList.map((pagePath: string) => {
    const pageName = removeHTMLExtension(pagePath.substr(pagePath.lastIndexOf('/') + 1))
    paths.push(pageName)
  })

  // Only static generate a couple of the pages for testing purposes
  const slicedPaths = paths.slice(0, 9)

  return {
    paths: slicedPaths.map((pagePath: string) => ({ params: { pagePath: [pagePath] } })),
    fallback: true,
  }
}

export default OldArchivedNewsPage
