import styled from 'styled-components'
import { NextSeo } from 'next-seo'
import { toPlainText } from '@portabletext/react'
import { useRouter } from 'next/router'
import getOpenGraphImages from '../../common/helpers/getOpenGraphImages'
import { getFullUrl } from '../../common/helpers/getFullUrl'
import { metaTitleSuffix } from '../../languages'

import { PageContent } from './shared/SharedPageContent'
import { TopicPageSchema } from '../../types/types'
import { SharedBanner } from './shared/SharedBanner'

const TopicPageLayout = styled.main`
  /* The neverending spacing story... If two sections with the same background colour
  follows each other we want less spacing */
  .background-one + .background-one,
  .background-two + .background-two,
  .background-three + .background-three,
  .background-four + .background-four,
  .background-five + .background-five,
  .background-none + .background-none,
  .background-image + .background-none {
    /* The teaser component uses an article element, so lets avoid that.
    Would be more robust if we add a container for the padding :/ */
    > section,
    > figure,
    > div:first-child {
      /*  padding-top: calc(var(--space-3xLarge) / 2); */
      padding-top: 0;
    }
  }
`

type TopicPageProps = {
  data: TopicPageSchema
}

const TopicPage = ({ data }: TopicPageProps) => {
  const { pathname, locale } = useRouter()
  const slug = data?.slug
  const fullUrl = getFullUrl(pathname, slug, locale)
  const pageTitle = data?.title ? toPlainText(data?.title) : ''

  const ogImage = data?.seoAndSome?.openGraphImage?.asset ? data?.seoAndSome?.openGraphImage : data?.heroImage?.image
  return (
    <>
      <NextSeo
        title={`${data?.seoAndSome?.documentTitle || pageTitle} - ${metaTitleSuffix}`}
        description={data?.seoAndSome?.metaDescription}
        openGraph={{
          title: pageTitle,
          description: data?.seoAndSome?.metaDescription,
          type: 'website',
          url: fullUrl,
          images: getOpenGraphImages(ogImage),
        }}
      ></NextSeo>
      <TopicPageLayout>
        <SharedBanner data={data} />
        <PageContent data={data} />
      </TopicPageLayout>
    </>
  )
}

export default TopicPage
