import styled from 'styled-components'
import { NextSeo } from 'next-seo'
import { toPlainText } from '@portabletext/react'
import { useRouter } from 'next/router'
import getOpenGraphImages from '../../common/helpers/getOpenGraphImages'
import HeroImage from '../shared/Hero/HeroImage'
import MagazineTagBar from '../shared/MagazineTagBar'
import Teaser from '../shared/Teaser'
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
import TwitterEmbed from '../topicPages/TwitterEmbed'
import Video from '../topicPages/Video'
import { getFullUrl } from '../../common/helpers/getFullUrl'
import { metaTitleSuffix } from '../../languages'
import {
  AnchorLinkData,
  PageSchema,
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
  TwitterEmbedData,
  VideoData,
  CookieDeclarationData,
} from '../../types/types'
import { Flags } from '../../common/helpers/datasetHelpers'
import { FullImageHero } from '../shared/Hero/FullImageHero'
import { DefaultHero } from '../shared/Hero/DefaultHero'
import { FiftyFiftyHero } from '../shared/Hero/FiftyFiftyHero'

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

const HeroBanner = styled.div`
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-medium);
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
  | TwitterEmbedData
  | AnchorLinkData
  | VideoData
  | CookieDeclarationData

const TopicPage = ({ data }: TopicPageProps) => {
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

  const content = (data?.content || []).map((c: ComponentProps, index) => {
    const prevComponent = data?.content?.[index - 1]
    const anchorReference =
      (prevComponent as unknown as ComponentProps)?.type === 'anchorLink'
        ? (prevComponent as unknown as AnchorLinkData)?.anchorReference
        : undefined

    switch (c.type) {
      case 'teaser':
        return <Teaser key={c.id} data={c as TeaserData} anchor={anchorReference} />
      case 'textBlock':
        return <TextBlock key={c.id} data={c as TextBlockData} anchor={anchorReference} />
      case 'fullWidthImage':
        return <FullWidthImage key={c.id} data={c as FullWidthImageData} anchor={anchorReference} />
      case 'figure':
        return <Figure key={c.id} data={c as FigureData} anchor={anchorReference} />
      case 'textWithIconArray':
        return <TextWithIconArray key={c.id} data={c as TextWithIconArrayData} anchor={anchorReference} />
      case 'pullQuote':
        return <PageQuote key={c.id} data={c as QuoteData} anchor={anchorReference} />
      case 'accordion':
        return <AccordionBlock key={c.id} data={c as AccordionData} anchor={anchorReference} />
      case 'promoTileArray':
        return <PromoTileArray key={c.id} data={c as PromoTileArrayData} anchor={anchorReference} />
      case 'iframe':
        return <IFrame key={c.id} data={c as IFrameData} anchor={anchorReference} />
      case 'promotion':
        return <Promotion key={c.id} data={c as PromotionData} anchor={anchorReference} />
      case 'form':
        return <Form key={c.id} data={c as FormData} anchor={anchorReference} />
      case 'table':
        return <Table key={c.id} data={c as TableData} anchor={anchorReference} />
      case 'cookieDeclaration':
        return <CookieDeclaration key={c.id} data={c as CookieDeclarationData} anchor={anchorReference} />
      case 'newsList':
        return <NewsList key={c.id} data={c as unknown as NewsListData} anchor={anchorReference} />
      case 'stockValuesApi':
        return <StockValues key={c.id} data={c as StockValuesData} anchor={anchorReference} />
      case 'twitterEmbed':
        return <TwitterEmbed key={c.id} data={c as TwitterEmbedData} anchor={anchorReference} />
      case 'video':
        return <Video key={c.id} data={c as VideoData} anchor={anchorReference} />
      default:
        return null
    }
  })

  const Hero = () => {
    if (!data.title) return null

    if (data?.hero.type === 'fullWidthImage') {
      return <FullImageHero title={data.title} ratio={data.hero.ratio as string} heroImage={data.heroImage} />
    } else if (data?.hero.type === 'fiftyFifty') {
      return (
        <FiftyFiftyHero
          heroTitle={data.hero.heroTitle}
          heroIngress={data.hero.heroIngress}
          heroLink={data.hero.heroLink}
          background={data.background}
          image={data.heroImage.image}
          title={data.title}
        />
      )
    } else {
      return <DefaultHero title={data.title} image={data.heroImage} />
    }
  }

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
        {Flags.IS_DEV ? (
          <Hero />
        ) : (
          <>
            <HeroBanner>{data?.title && <StyledHeading value={data?.title} level="h1" size="2xl" />}</HeroBanner>
            <ImageWrapper>{data?.heroImage && <HeroImage data={data?.heroImage} />}</ImageWrapper>
          </>
        )}
        {tags && (
          <MagazineTagBar
            tags={tags}
            href={parentSlug}
            defaultActive
            onClick={(tagValue) => {
              router.push(encodeURI(`${parentSlug}?tag=${tagValue}`))
            }}
          />
        )}
        {content}
      </TopicPageLayout>
    </>
  )
}

export default TopicPage
