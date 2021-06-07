//import NewsArchiveHead from './NewsArchiveHead'
import { GetStaticPaths, GetStaticProps } from 'next'
import * as fs from 'fs'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import getConfig from 'next/config'

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

  if (!router.isFallback && !data.news) {
    return <ErrorPage statusCode={404} />
  }

  const { pathname } = useRouter()
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
          <NextSeo
            title={data?.news?.title}
            description={data?.news?.description}
            openGraph={{
              title: data?.news?.title,
              description: data?.news?.description,
              type: 'article',
              url: fullUrl,
            }}
          ></NextSeo>
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

//const archiveServerHostname = 'http://localhost:3010'

// @TODO: Language
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pagePathArray = params?.pagePath as string[]
  const pagePath = pagePathArray.join('/')

  // @TODO: I don't understand the archive or not part of the url
  // const response = await fetch(`${archiveServerHostname}/en/news/archive/${pagePath}.json`)

  // const response = await fetch(`${archiveServerHostname}/en/news/${pagePath}.json`)
  const response = await fetch(`https://envis-legacy.azureedge.net/equinor-archive-content/en/news/${pagePath}.json`)
  let pageData
  try {
    pageData = await response.json()
  } catch (err) {
    console.log('error', err)
    pageData = null
  }

  console.log(pageData)
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

const removeHTMLExtension = (path: string): string => {
  return path.replace('.html', '')
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: string[] = []

  const newsPagesList = fs
    .readFileSync(process.cwd() + `/pages/news/archive/resources/news2016To2018.txt`)
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
