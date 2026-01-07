import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { languages } from '@/languageConfig'
import { getNameFromIso } from '@/sanity/helpers/localization'
import { sanityFetch } from '@/sanity/lib/sanityFetch'
import { constructSanityMetadata, getPage } from '@/sanity/pages/utils'
import { homePageMetaQuery } from '@/sanity/queries/metaData'
import Footer from '@/sections/Footer/Footer'
import Header from '@/sections/Header/Header'
import HomePage from '@/templates/homepage/HomePage'
import { OrganizationJsonLd } from 'next-seo'

type Props = {
  params: Promise<{ slug: string; locale: string }>
  searchParams: Promise<{ [key: string]: string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const metaData = await sanityFetch({
    query: homePageMetaQuery,
    params: {
      lang: getNameFromIso(locale),
    },
    stega: false,
  })

  return constructSanityMetadata('', locale, metaData)
}

export default async function Home({ params }: Props) {
  const { locale, slug } = await params

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
       <OrganizationJsonLd
        name="Equinor ASA"
        url="https://www.equinor.com"
        logo= "https://cdn.eds.equinor.com/logo/equinor-logo-horizontal.svg#red"
        description={pageData?.seoAndSome?.metaDescription}
        sameAs={[
          "https://twitter.com/Equinor",
          "https://facebook.com/Equinor",
          "https://linkedin.com/company/equinor",
          "https://www.instagram.com/equinor/",
          "https://www.youtube.com/equinor"
        ]}
      />
   
      <HomePage headerData={headerData} {...pageData} />
      <Footer />
    </>
  )
}
