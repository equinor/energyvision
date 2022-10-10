import { NextSeo } from 'next-seo'
import { ImageWithAlt } from '../../types/types'
import { metaTitleSuffix } from '../../languages'
import getOpenGraphImages from '../../common/helpers/getOpenGraphImages'
import { toPlainText } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'
import { getFullUrl } from '../../common/helpers/getFullUrl'
import { useRouter } from 'next/router'

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
  const router = useRouter()
  const fullUrl = () => {
    if (!slug || !router) return undefined
    else {
      const { pathname, locale } = router
      return getFullUrl(pathname, slug, locale)
    }
  }

  return (
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
  )
}
export default Seo
