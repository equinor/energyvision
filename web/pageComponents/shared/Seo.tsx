import { toPlainText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { useRouter } from 'next/compat/router'
import { WebPageJsonLd } from 'next-seo'
import { getFullUrl } from '@/lib/helpers/getFullUrl'
import type { ImageWithAlt } from '../../types/index'

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
  const { pageTitle, slug } = props
  /*   const ogImage = seoAndSome?.openGraphImage?.asset
    ? seoAndSome?.openGraphImage
    : heroImage */
  const title = pageTitle ? toPlainText(pageTitle) : ''
  const router = useRouter()
  const fullUrl = () => {
    if (!slug || !router) return undefined
    const { pathname, locale } = router
    return getFullUrl(pathname, slug, locale)
  }

  return (
    <WebPageJsonLd
      id={fullUrl() || ''}
      description={title}
      publisher={{
        '@type': 'Organization',
        name: 'Equinor',
      }}
    />
  )
}
export default Seo
