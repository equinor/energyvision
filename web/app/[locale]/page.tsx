import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { languages } from '@/languageConfig'
import { sanityFetch } from '@/sanity/lib/sanityFetch'
import { getNameFromIso } from '@/sanity/localization'
import { homePageMetaQuery } from '@/sanity/metaData'
import { constructSanityMetadata, getPage } from '@/sanity/pages/utils'
import Footer from '@/sections/Footer/Footer'
import Header from '@/sections/Header/Header'
import HomePage from '@/templates/homepage/HomePage'

type Props = {
  params: Promise<{ slug: string; locale: string }>
  searchParams: Promise<{ [key: string]: string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  console.log('generateMetadata homepage, locale', locale)

  const metaData = await sanityFetch({
    query: homePageMetaQuery,
    params: {
      lang: getNameFromIso(locale),
    },
    stega: false,
  })

  console.log('Homepage metadata', metaData)
  return constructSanityMetadata('', locale, metaData)
}

export default async function Home({ params }: Props) {
  const { locale, slug } = await params

  console.log('HOME page locale', locale)

  if (!languages.map(it => it.iso).includes(locale)) notFound()

  const { headerData, pageData } = await getPage({
    slug,
    locale,
    tags: ['homePage'],
  })

  if (!pageData) notFound()

  const template = pageData?.template || null

  if (!template) console.warn('Missing homepage template', pageData?.slug)

  return (
    <>
      <Header />
      <HomePage headerData={headerData} {...pageData} />
      <Footer />
    </>
  )
}
