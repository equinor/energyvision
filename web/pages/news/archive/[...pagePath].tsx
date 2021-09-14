import { GetStaticPaths, GetStaticProps } from 'next'
import * as fs from 'fs'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import getConfig from 'next/config'
import { removeHTMLExtension } from '../../../lib/archive/archiveUtils'
import { Menu } from '../../../pageComponents/shared/menu/Menu'

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
  }
}

const OldArchivedNewsPage = ({ data }: OldArchivedNewsPageProps): JSX.Element => {
  const router = useRouter()
  const { pathname } = router
  if (!router.isFallback && !data.news) {
    return <ErrorPage statusCode={404} />
  }

  const fullUrlDyn = pathname.indexOf('http') === -1 ? `${publicRuntimeConfig.domain}${pathname}` : pathname
  const fullUrl = fullUrlDyn.replace('[...pagePath]', data?.news?.slug)

  return (
    <>
      {router.isFallback ? (
        <p>Loading…</p>
      ) : (
        // @TODO: SEO stuffs
        // @TODO: Menu
        <>
          <Menu />
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
          <div
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

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const pagePathArray = params?.pagePath as string[]
  const pagePath = pagePathArray.join('/')
  const archiveSeverURL = publicRuntimeConfig.archiveStorageURL
  /** Check if the required page is old archived AEM page or not
   * because AEM also has archived pages which has 'archive' the page path */
  let response
  if (pagePathArray.length > 1) response = await fetch(`${archiveSeverURL}/${locale}/news/archive/${pagePath}.json`)
  else response = await fetch(`${archiveSeverURL}/${locale}/news/${pagePath}.json`)

  let pageData
  try {
    pageData = await response.json()
  } catch (err) {
    console.log('error', err)
    pageData = null
  }

  return {
    props: {
      data: {
        news: {
          ...pageData,
          slug: pagePath,
        },
      },
    },
    revalidate: 1,
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
