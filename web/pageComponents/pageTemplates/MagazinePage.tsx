import styled from 'styled-components'
import { NextSeo } from 'next-seo'
import { toPlainText } from '@portabletext/react'
import { useRouter } from 'next/router'
import getOpenGraphImages from '../../common/helpers/getOpenGraphImages'
import MagazineTagBar from '../shared/MagazineTagBar'
import { getFullUrl } from '../../common/helpers/getFullUrl'
import { metaTitleSuffix } from '../../languages'

import { PageContent } from './shared/SharedPageContent'
import { MagazinePageSchema } from '../../types/types'
import { SharedBanner } from './shared/SharedBanner'
import Teaser from '../shared/Teaser'

const MagazinePageLayout = styled.main`
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

type MagazinePageProps = {
  data: MagazinePageSchema
}

const MagazinePage = ({ data }: MagazinePageProps) => {
  const router = useRouter()
  const { pathname, locale } = useRouter()

  const slug = data?.slug
  const fullUrl = getFullUrl(pathname, slug, locale)
  const parentSlug = fullUrl.substring(fullUrl.indexOf('/'), fullUrl.lastIndexOf('/'))
  const pageTitle = data?.title ? toPlainText(data?.title) : ''
  const magazineTags = data?.magazineTags
  const tags = magazineTags?.map((it) => {
    return {
      label: it,
      active: false,
    }
  })

  const { hideFooterComponent, footerComponent } = data

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
      <MagazinePageLayout>
        <SharedBanner data={data} />
        {tags && (
          <MagazineTagBar
            tags={tags}
            defaultActive
            href={parentSlug}
            onClick={(tagValue) => {
              router.push({
                pathname: parentSlug,
                query: {
                  tag: tagValue === 'ALL' ? '' : tagValue,
                },
              })
            }}
          />
        )}
        <PageContent data={data} />
        {!hideFooterComponent && footerComponent?.data && <Teaser data={footerComponent.data} />}
      </MagazinePageLayout>
    </>
  )
}

export default MagazinePage
