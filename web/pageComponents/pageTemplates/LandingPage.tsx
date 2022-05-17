import styled from 'styled-components'
import { NextSeo } from 'next-seo'
import type { LandingPageSchema } from '../../types/types'
import { useRouter } from 'next/router'
import { toPlainText } from '@portabletext/react'
import getOpenGraphImages from '../../common/helpers/getOpenGraphImages'
import IngressText from '../shared/portableText/IngressText'
import TitleText from '../shared/portableText/TitleText'
import ContentGroup from '../landingPages/ContentGroup'
import { getFullUrl } from '../../common/helpers/getFullUrl'
import { metaTitleSuffix } from '../../languages'

const LandingPageLayout = styled.main``

const HeroBanner = styled.div`
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-medium) var(--space-xLarge)
    var(--layout-paddingHorizontal-medium);
`

const StyledHeading = styled(TitleText)`
  max-width: 1186px; /* 1920 - (2 * 367) */
  margin-left: auto;
  margin-right: auto;
`

const Intro = styled.div`
  --max-width: calc(40 * var(--space-medium));
  padding: 0 var(--layout-paddingHorizontal-medium);
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;
  /* While I don't love this, we need to restrict the width of the paragraph */
  & p {
    max-width: var(--layout-maxContent-narrow);
  }
`

const TOCList = styled.div``

type LandingPageProps = {
  data: LandingPageSchema
}

const LandingPage = ({ data }: LandingPageProps) => {
  const { pathname, locale } = useRouter()
  const { slug, title, ingress, subGroups = [] } = data

  const fullUrl = getFullUrl(pathname, slug, locale)

  const pageTitle = title ? toPlainText(title) : ''

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
          images: data?.seoAndSome?.openGraphImage?.asset && getOpenGraphImages(data?.seoAndSome?.openGraphImage),
        }}
      ></NextSeo>
      <LandingPageLayout>
        <HeroBanner>{title && <StyledHeading value={title} level="h1" size="2xl" />}</HeroBanner>
        {ingress && (
          <Intro>
            <IngressText value={ingress} />
          </Intro>
        )}
        <TOCList>
          {subGroups?.map((group) => {
            return <ContentGroup key={group.id} group={group} />
          })}
        </TOCList>
      </LandingPageLayout>
    </>
  )
}

export default LandingPage
