import { GetStaticPaths, GetStaticProps } from 'next'
import * as fs from 'fs'
import { NextSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import getConfig from 'next/config'
import { Layout } from '@components'
import { menuQuery } from '../../../lib/queries/menu'
import { getClient } from '../../../lib/sanity.server'
import { removeHTMLExtension } from '../../../lib/archive/archiveUtils'
import { mapLocaleToLang } from '../../../lib/localization'
import Header from '../../../pageComponents/shared/Header'

import type { MenuData } from '../../../types/types'

import { anchorClick } from '../../../common/helpers/staticPageHelpers'
import { useEffect } from 'react'
import { useState } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// TODO fix the eslint issues
import archivedStyles from '@equinor/energyvision-legacy-css'
import Script from 'next/dist/client/script'
import Head from 'next/head'
import { SkipNavContent } from '@reach/skip-nav'

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
    menuData: MenuData
  }
}

const OldArchivedNewsPage = ({ data }: OldArchivedNewsPageProps): JSX.Element => {
  const [isArchivePage, setIsArchivePage] = useState(true)
  const router = useRouter()
  const { pathname } = router
  useEffect(() => {
    if (isArchivePage && document.getElementById('legacyScript') == null) {
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
  const fullUrlDyn = pathname.indexOf('http') === -1 ? `${publicRuntimeConfig.domain}${pathname}` : pathname
  const fullUrl = fullUrlDyn.replace('[...pagePath]', data?.news?.slug)
  const onLinkClicked = (e: any) => {
    anchorClick(e, router)
  }
  return (
    <>
      {router.isFallback ? (
        <p>Loading…</p>
      ) : (
        // @TODO: SEO stuffs
        // @TODO: Menu
        <>
          <style jsx global>
            {archivedStyles}
          </style>
          <Head>
            {' '}
            <script
              src="https://consent.cookiebot.com/uc.js"
              id="Cookiebot"
              data-cbid="f1327b03-7951-45da-a2fd-9181babc783f"
            />
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
          <SkipNavContent />
          {/* The <div> element has a child <button> element that allows keyboard interaction */}
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div
            className="legacyStyles"
            onClick={onLinkClicked}
            onKeyDown={onLinkClicked}
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

export const getStaticProps: GetStaticProps = async ({ preview = false, params, locale = 'en' }) => {
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

  const menuData = await getClient(preview).fetch(menuQuery, { lang: mapLocaleToLang(locale) })
  return {
    props: {
      data: {
        menuData,
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
