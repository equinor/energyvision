import Teaser from '../../shared/Teaser'
import TextBlock from '../../topicPages/TextBlock'
import FullWidthImage from '../../topicPages/FullWidthImage'
import FullWidthVideo from '../../topicPages/FullWidthVideo'
import Figure from '../../topicPages/Figure'
import TextWithIconArray from '../../topicPages/TextWithIconArray'
import PageQuote from '../../topicPages/PageQuote'
import AccordionBlock from '../../topicPages/Accordion/AccordionBlock'
import PromoTileArray from '../../topicPages/PromoTileArray'
import IFrame from '../../topicPages/IFrame'
import Promotion from '../../topicPages/Promotion'
import Form from '../../topicPages/Form/Form'
import Table from '../../topicPages/Table'
import NewsList from '../../topicPages/NewsList'
import StockValues from '../../topicPages/StockValues'
import CookieDeclaration from '../../topicPages/CookieDeclaration'
import TwitterEmbed from '../../topicPages/TwitterEmbed'
import ImageCarousel from '../../shared/ImageCarousel/ImageCarousel'
import IframeCarousel from '../../shared/IframeCarousel/IframeCarousel'
import VideoPlayer from '../../shared/VideoPlayer'
import VideoPlayerCarousel from '../../shared/VideoPlayerCarousel'
import TextTeaser from '../../shared/textTeaser/TextTeaser'
import KeyNumbers from '../../topicPages/KeyNumbers/KeyNumbers'
import CardsList from '../../../sections/cards/CardsList/CardsList'
import {
  AnchorLinkData,
  TopicPageSchema,
  MagazinePageSchema,
  TeaserData,
  TextBlockData,
  FullWidthImageData,
  FullWidthVideoData,
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
  CookieDeclarationData,
  ImageCarouselData,
  IframeCarouselData,
  VideoPlayerData,
  VideoPlayerCarouselData,
  TextTeaserData,
  KeyNumbersData,
  CardsListData,
  GridData,
  CampaignBannerData,
} from '../../../types/types'
import Grid from '@sections/Grid/Grid'
import { CampaignBanner } from '@sections/CampaignBanner'

// How could we do this for several different component types?
export type ComponentProps =
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
  | VideoPlayerData
  | VideoPlayerCarouselData
  | CookieDeclarationData
  | TextTeaserData
  | KeyNumbersData

type PageContentProps = { data: TopicPageSchema | MagazinePageSchema }

/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * All pagecontent should only have padding/margin bottom and x axis
 * If needed to apply top spacing do it here
 * E.g. Colored background content need padding top
 * Remember to think about the prev section of condition with top spacing
 * E.g. 2 colored background of same color content, only first need but not second
 */
const applyPaddingTopIfApplicable = (currentComponent: ComponentProps, prevComponent: ComponentProps): string => {
  //@ts-ignore
  const currentComponentsDO = currentComponent?.designOptions?.background
  //@ts-ignore
  const previousComponentsDO = prevComponent?.designOptions?.background

  //Cardslist uses the background for the cards not the block background
  const casesWhichHaveBackgroundButIsWhite = ['cardsList']
  const currentIsWhiteColorBackground =
    currentComponentsDO?.backgroundUtility === 'white-100' ||
    currentComponentsDO?.backgroundColor === 'White' ||
    //@ts-ignore
    casesWhichHaveBackgroundButIsWhite.includes(currentComponent?.type) ||
    //@ts-ignore
    !currentComponent?.designOptions

  const previousIsWhiteColorBackground =
    previousComponentsDO?.backgroundUtility === 'white-100' ||
    previousComponentsDO?.backgroundColor === 'White' ||
    //@ts-ignore
    !prevComponent?.designOptions

  const isCurrentColoredBackgroundAndNotWhite =
    (currentComponentsDO?.type === 'backgroundColor' || currentComponentsDO?.backgroundColor) &&
    !currentIsWhiteColorBackground

  const previousIsColorContainerAndNotWhite =
    (previousComponentsDO?.type === 'backgroundColor' || previousComponentsDO?.backgroundColor) &&
    !previousIsWhiteColorBackground

  const previousIsSameColorAsCurrent =
    (currentComponentsDO?.backgroundUtility &&
      previousComponentsDO?.backgroundUtility &&
      currentComponentsDO?.backgroundUtility === previousComponentsDO?.backgroundUtility) ??
    currentComponentsDO?.backgroundColor === previousComponentsDO?.backgroundColor

  const specialCases = ['teaser', 'fullWidthImage', 'fullWidthVideo']
  //@ts-ignore
  const previousComponentIsASpecialCaseAndNeedPT = specialCases.includes(prevComponent?.type)

  if (
    (isCurrentColoredBackgroundAndNotWhite && !previousIsSameColorAsCurrent) ||
    (currentIsWhiteColorBackground && previousIsColorContainerAndNotWhite) ||
    previousComponentIsASpecialCaseAndNeedPT
  ) {
    return 'pt-16'
  }
  return ''
}

/*eslint-enable @typescript-eslint/ban-ts-comment */

export const PageContent = ({ data }: PageContentProps) => {
  const content = (data?.content || []).map((c: ComponentProps, index) => {
    const prevComponent = data?.content?.[index - 1]
    const anchorReference =
      (prevComponent as unknown as ComponentProps)?.type === 'anchorLink'
        ? (prevComponent as unknown as AnchorLinkData)?.anchorReference
        : undefined

    //Returns pt-12 when applicable or empty string
    const topSpacingClassName = applyPaddingTopIfApplicable(c, data?.content?.[index - 1] as unknown as ComponentProps)

    switch (c.type) {
      case 'teaser':
        return <Teaser key={c.id} data={c as TeaserData} anchor={anchorReference} />
      case 'textTeaser':
        return (
          <TextTeaser key={c.id} data={c as TextTeaserData} anchor={anchorReference} className={topSpacingClassName} />
        )
      case 'textBlock':
        return (
          <TextBlock key={c.id} data={c as TextBlockData} anchor={anchorReference} className={topSpacingClassName} />
        )
      case 'fullWidthImage':
        return <FullWidthImage key={c.id} data={c as FullWidthImageData} anchor={anchorReference} />
      case 'fullWidthVideo':
        return <FullWidthVideo key={c.id} data={c as FullWidthVideoData} anchor={anchorReference} />
      case 'figure':
        return <Figure key={c.id} data={c as FigureData} anchor={anchorReference} className={topSpacingClassName} />
      case 'textWithIconArray':
        return (
          <TextWithIconArray
            key={c.id}
            data={c as TextWithIconArrayData}
            anchor={anchorReference}
            className={topSpacingClassName}
          />
        )
      case 'pullQuote':
        return <PageQuote key={c.id} data={c as QuoteData} anchor={anchorReference} className={topSpacingClassName} />
      case 'accordion':
        return (
          <AccordionBlock
            key={c.id}
            data={c as AccordionData}
            anchor={anchorReference}
            className={topSpacingClassName}
          />
        )
      case 'promoTileArray':
        return (
          <PromoTileArray
            key={c.id}
            data={c as PromoTileArrayData}
            anchor={anchorReference}
            className={topSpacingClassName}
          />
        )
      case 'iframe':
        return <IFrame key={c.id} data={c as IFrameData} anchor={anchorReference} className={topSpacingClassName} />
      case 'promotion':
        return (
          <Promotion key={c.id} data={c as PromotionData} anchor={anchorReference} className={topSpacingClassName} />
        )
      case 'form':
        return <Form key={c.id} data={c as FormData} anchor={anchorReference} className={topSpacingClassName} />
      case 'table':
        return <Table key={c.id} data={c as TableData} anchor={anchorReference} className={topSpacingClassName} />
      case 'cookieDeclaration':
        return (
          <CookieDeclaration
            key={c.id}
            data={c as CookieDeclarationData}
            anchor={anchorReference}
            className={topSpacingClassName}
          />
        )
      case 'newsList':
        return (
          <NewsList
            key={c.id}
            data={c as unknown as NewsListData}
            anchor={anchorReference}
            className={topSpacingClassName}
          />
        )
      case 'stockValuesApi':
        return (
          <StockValues
            key={c.id}
            data={c as StockValuesData}
            anchor={anchorReference}
            className={topSpacingClassName}
          />
        )
      case 'twitterEmbed':
        return (
          <TwitterEmbed
            key={c.id}
            data={c as TwitterEmbedData}
            anchor={anchorReference}
            className={topSpacingClassName}
          />
        )
      case 'imageCarousel':
        return (
          <ImageCarousel
            key={c.id}
            data={c as ImageCarouselData}
            anchor={anchorReference}
            className={topSpacingClassName}
          />
        )
      case 'iframeCarousel':
        return (
          <IframeCarousel
            key={c.id}
            data={c as IframeCarouselData}
            anchor={anchorReference}
            className={topSpacingClassName}
          />
        )
      case 'videoPlayer':
        return (
          <VideoPlayer
            key={c.id}
            data={c as VideoPlayerData}
            anchor={anchorReference}
            className={topSpacingClassName}
          />
        )
      case 'videoPlayerCarousel':
        return (
          <VideoPlayerCarousel
            key={c.id}
            data={c as VideoPlayerCarouselData}
            anchor={anchorReference}
            className={topSpacingClassName}
          />
        )
      case 'keyNumbers':
        return (
          <KeyNumbers key={c.id} data={c as KeyNumbersData} anchor={anchorReference} className={topSpacingClassName} />
        )
      case 'cardsList':
        return (
          <CardsList key={c.id} data={c as CardsListData} anchor={anchorReference} className={topSpacingClassName} />
        )
      case 'grid':
        return <Grid key={c.id} data={c as GridData} anchor={anchorReference} className={topSpacingClassName} />
      case 'campaignBanner':
        return <CampaignBanner key={c.id} data={c as CampaignBannerData} />
      default:
        return null
    }
  })
  return <>{content}</>
}
