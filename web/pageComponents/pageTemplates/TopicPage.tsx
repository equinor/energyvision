import styled from 'styled-components'
import { NextSeo } from 'next-seo'
import { toPlainText } from '@portabletext/react'
import { useRouter } from 'next/router'
import getOpenGraphImages from '../../common/helpers/getOpenGraphImages'
import HeroImage from '../shared/HeroImage'
import Teaser from '../topicPages/Teaser'
import TextBlock from '../topicPages/TextBlock'
import FullWidthImage from '../topicPages/FullWidthImage'
import Figure from '../topicPages/Figure'
import TextWithIconArray from '../topicPages/TextWithIconArray'
import PageQuote from '../topicPages/PageQuote'
import AccordionBlock from '../topicPages/Accordion/AccordionBlock'
import PromoTileArray from '../topicPages/PromoTileArray'
import IFrame from '../topicPages/IFrame'
import Promotion from '../topicPages/Promotion'
import Form from '../topicPages/Form/Form'
import Table from '../topicPages/Table'
import NewsList from '../topicPages/NewsList'
import StockValues from '../topicPages/StockValues'
import TitleText from '../shared/portableText/TitleText'
import CookieDeclaration from '../topicPages/CookieDeclaration'
import { getFullUrl } from '../../common/helpers/getFullUrl'
import { metaTitleSuffix } from '../../languages'
import type { PageSchema } from '../../types/types'

import {
  TeaserData,
  TextBlockData,
  FullWidthImageData,
  FigureData,
  TextWithIconArrayData,
  CallToActionData,
  QuoteData,
  AccordionData,
  PromoTileArrayData,
  IFrameData,
  PromotionData,
  FormData,
  TableData,
  NewsListData,
  StockValuesData,
} from '../../types/types'

const TopicPageLayout = styled.main`
  --banner-paddingHorizontal: clamp(16px, calc(-69.1942px + 22.7184vw), 367px);
  /* @TODO: Find a good value here */
  --banner-paddingVertical: clamp(16px, calc(-38.3689px + 14.4984vw), 250px);

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

const HeroBanner = styled.div`
  padding: var(--banner-paddingVertical) var(--layout-paddingHorizontal-medium) var(--space-xLarge)
    var(--layout-paddingHorizontal-medium);
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-large);
`

const StyledHeading = styled(TitleText)`
  max-width: 1186px; /* 1920 - (2 * 367) */
  margin-left: auto;
  margin-right: auto;
`

const ImageWrapper = styled.div.attrs(() => ({
  className: 'background-image',
}))`
  padding: 0 var(--layout-paddingHorizontal-small) var(--space-3xLarge) var(--layout-paddingHorizontal-small);
  max-width: 1920px;
  margin-left: auto;
  margin-right: auto;

  & > figure {
    margin: 0;
  }
`

type TopicPageProps = {
  data: PageSchema
}

// How could we do this for several different component types?
type ComponentProps =
  | TeaserData
  | TextBlockData
  | FullWidthImageData
  | FigureData
  | TextWithIconArrayData
  | CallToActionData
  | QuoteData
  | AccordionData
  | PromoTileArrayData
  | IFrameData
  | PromotionData
  | FormData
  | TableData
  | StockValuesData

const TopicPage = ({ data }: TopicPageProps) => {
  const { pathname, locale } = useRouter()
  const slug = data?.slug

  const fullUrl = getFullUrl(pathname, slug, locale)

  const pageTitle = data?.title ? toPlainText(data?.title) : ''

  const content = (data?.content || []).map((c: ComponentProps) => {
    switch (c.type) {
      case 'teaser':
        return <Teaser key={c.id} data={c as TeaserData} />
      case 'textBlock':
        return <TextBlock key={c.id} data={c as TextBlockData} />
      case 'fullWidthImage':
        return <FullWidthImage key={c.id} data={c as FullWidthImageData} />
      case 'figure':
        return <Figure key={c.id} data={c as FigureData} />
      case 'textWithIconArray':
        return <TextWithIconArray key={c.id} data={c as TextWithIconArrayData} />
      case 'pullQuote':
        return <PageQuote key={c.id} data={c as QuoteData} />
      case 'accordion':
        return <AccordionBlock key={c.id} data={c as AccordionData} />
      case 'promoTileArray':
        return <PromoTileArray key={c.id} data={c as PromoTileArrayData} />
      case 'iframe':
        return <IFrame key={c.id} data={c as IFrameData} />
      case 'promotion':
        return <Promotion key={c.id} data={c as PromotionData} />
      case 'form':
        return <Form key={c.id} data={c as FormData} />
      case 'table':
        return <Table key={c.id} data={c as TableData} />
      case 'cookieDeclaration':
        return <CookieDeclaration key={c.id} />
      case 'newsList':
        return <NewsList key={c.id} data={c as unknown as NewsListData} />
      case 'stockValuesApi':
        return <StockValues key={c.id} data={c as StockValuesData} />
      default:
        return null
    }
  })

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
        <HeroBanner>{data?.title && <StyledHeading value={data?.title} level="h1" size="2xl" />}</HeroBanner>
        <ImageWrapper>{data?.heroImage && <HeroImage data={data?.heroImage} />}</ImageWrapper>
        {content}
      </TopicPageLayout>
    </>
  )
}

export default TopicPage
