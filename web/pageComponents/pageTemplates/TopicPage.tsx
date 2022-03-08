import styled from 'styled-components'
import { NextSeo } from 'next-seo'
import type { PageSchema } from '../../types/types'
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
import RemitTable from '../shared/RemitTable'
import Promotion from '../topicPages/Promotion'
import Table from '../topicPages/Table'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { TitleBlockRenderer } from '../../common/serializers'
import { blocksToText } from '../../common/helpers/blocksToText'
import SubscribeForm from '../shared/SubscribeForm'
import CookieDeclaration from '../topicPages/CookieDeclaration'
import { getFullUrl } from '../../common/helpers/getFullUrl'

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
  RemitTableData,
  SubscribeFormData,
  TableData,
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
  .background-none + .background-none {
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

const StyledHeading = styled(TitleBlockRenderer)`
  max-width: 1186px; /* 1920 - (2 * 367) */
  margin-left: auto;
  margin-right: auto;
`

const ImageWrapper = styled.div`
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
  | RemitTableData
  | PromotionData
  | SubscribeFormData
  | TableData

const TopicPage = ({ data }: TopicPageProps) => {
  const { pathname } = useRouter()
  const slug = data?.slug

  const fullUrl = getFullUrl(pathname, slug)

  const pageTitle = data?.title ? blocksToText(data.title) : ''

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
      case 'remitTable':
        return <RemitTable key={c.id} />
      case 'promotion':
        return <Promotion key={c.id} data={c as PromotionData} />
      case 'subscribeForm':
        return <SubscribeForm key={c.id} data={c as SubscribeFormData} />
      case 'table':
        return <Table key={c.id} data={c as TableData} />
      case 'cookieDeclaration':
        return <CookieDeclaration key={c.id} />
      default:
        return null
    }
  })
  return (
    <>
      <NextSeo
        title={data?.seoAndSome?.documentTitle || pageTitle}
        description={data?.seoAndSome?.metaDescription}
        openGraph={{
          title: pageTitle,
          description: data?.seoAndSome?.metaDescription,
          type: 'website',
          url: fullUrl,
          /* @TODO: Add fallback image */
          // eslint-disable-next-line
          // @ts-ignore: Why does ts hates because I moved this line from another file
          images: getOpenGraphImages(data?.seoAndSome?.openGraphImage),
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      ></NextSeo>
      <TopicPageLayout>
        <HeroBanner>
          {data?.title && (
            <SimpleBlockContent
              blocks={data?.title}
              serializers={{
                types: {
                  block: (props) => <StyledHeading level="h1" size="2xl" {...props} />,
                },
              }}
            />
          )}
        </HeroBanner>
        <ImageWrapper>{data?.heroImage && <HeroImage data={data?.heroImage} />}</ImageWrapper>
        {content}
      </TopicPageLayout>
    </>
  )
}

export default TopicPage
