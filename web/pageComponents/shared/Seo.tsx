'use client'
import { NextSeo, WebPageJsonLd } from 'next-seo'
import { ImageWithAlt } from '../../types/index'
import { metaTitleSuffix } from '../../languages'
import getOpenGraphImages from '../../common/helpers/getOpenGraphImages'
import { toPlainText } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'
import { getFullUrl } from '../../common/helpers/getFullUrl'
import { usePathname } from 'next/navigation'
import { useCurrentLocale } from 'next-i18n-router/client'
import { i18nConfig } from '../../i18nConfig'

type SeoProps = {
  seoAndSome?: {
    documentTitle?: string
    metaDescription?: string
    openGraphImage?: ImageWithAlt
  }
  heroImage?: ImageWithAlt
  pageTitle?: PortableTextBlock[]
  slug?: string
}
const Seo = (props: SeoProps) => {
  const { seoAndSome, heroImage, pageTitle, slug } = props
  const ogImage = seoAndSome?.openGraphImage?.asset ? seoAndSome?.openGraphImage : heroImage
  const title = pageTitle ? toPlainText(pageTitle) : ''
  const pathname = usePathname()
  const locale = useCurrentLocale(i18nConfig)
  if (!slug) return undefined
  const fullUrl = () => getFullUrl(pathname || '', slug, locale)

  return (
    <>
      {`${seoAndSome?.documentTitle || title} - ${metaTitleSuffix}`}
      <NextSeo
        title={`${seoAndSome?.documentTitle || title} - ${metaTitleSuffix}`}
        description={seoAndSome?.metaDescription}
        openGraph={{
          title: title,
          description: seoAndSome?.metaDescription,
          type: 'website',
          url: fullUrl(),
          images: ogImage ? getOpenGraphImages(ogImage) : undefined,
        }}
      ></NextSeo>
      <WebPageJsonLd
        id={fullUrl() || ''}
        description={title}
        publisher={{
          '@type': 'Organization',
          name: 'Equinor',
        }}
      />
    </>
  )
}
export default Seo
