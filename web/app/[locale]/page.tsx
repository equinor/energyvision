import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { toPlainText } from 'next-sanity'
import {
  defaultLanguage,
  domain,
  languages,
  metaTitleSuffix,
} from '@/languageConfig'
import { getQueryFromSlug } from '@/sanity/helpers/queryFromSlug'
import { getPageData } from '@/sanity/lib/fetchData'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import Header from '@/sections/Header/Header'
import HomePage from '@/templates/homepage/HomePage'
import { constructSanityMetadata, getPage } from './(pages)/[...slug]/page'
import Footer from '@/sections/Footer/Footer'
import { sanityFetch } from '@/sanity/lib/sanityFetch'


type Props = {
  params: Promise<{ slug: string; locale: string }>
  searchParams: Promise<{ [key: string]: string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {slug, locale} = await params
  console.log('generateMetadata (default) page, locale', locale)
  const { query, queryParams } = await getQueryFromSlug(undefined, locale)

  const pageData = await sanityFetch({
          query: query,
          params: queryParams,
          stega:false
  })

  return constructSanityMetadata(slug, locale, pageData)
}

export default async function Home({ params }: Props) {
  const { locale, slug } = await params

  console.log('HOME page')

  if (!languages.map(it => it.locale).includes(locale)) notFound()

  const {headerData, pageData, footerData} = await getPage({slug, locale})


  if (!pageData) notFound()

  const template = pageData?.template || null

  if (!template) console.warn('Missing homepage template', pageData?.slug)

  return (
     <>
      <Header {...headerData}/>
      <HomePage {...pageData} />
      <Footer {...footerData} />
      </>
  )
}
