import Teaser from '../../shared/Teaser'
import TextBlock from '../../topicPages/TextBlock'
import FullWidthImage from '../../topicPages/FullWidthImage'
import FullWidthVideo from '../../topicPages/FullWidthVideo'
import Figure from '../../topicPages/Figure'
import TextWithIconArray from '../../topicPages/TextWithIconArray'
import PageQuote from '../../topicPages/PageQuote'
import AccordionBlock from '../../topicPages/Accordion/AccordionBlock'
import PromoTileArray from '../../../sections/PromoTiles/PromoTileArray'
import IFrame from '../../topicPages/IFrame'
import Promotion from '../../topicPages/Promotion'
import Form from '../../topicPages/Form/Form'
import Table from '../../topicPages/Table'
import NewsList from '../../topicPages/NewsList'
import StockValues from '../../topicPages/StockValues'
import CookieDeclaration from '../../topicPages/CookieDeclaration'
import TwitterEmbed from '../../topicPages/TwitterEmbed'
import IframeCarousel from '@sections/IframeCarousel/IframeCarousel'
import VideoPlayer from '../../shared/VideoPlayer'
import TextTeaser from '../../shared/textTeaser/TextTeaser'
import KeyNumbers from '../../../sections/KeyNumber/KeyNumber'
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
  DesignOptions,
  AnchorLinkListData,
  CollapsibleTextBlocksData,
} from '../../../types/index'
import { getColorForTheme } from '../../shared/textTeaser/theme'
import Grid from '@sections/Grid/Grid'
import { CampaignBanner } from '@sections/CampaignBanner'
import { BackgroundContainerProps } from '@components/Backgrounds'
import VideoPlayerCarousel from '@sections/VideoPlayerCarousel/VideoPlayerCarousel'
import ImageCarousel from '@sections/ImageCarousel/ImageCarousel'
import { AnchorLinkList } from '@sections/AnchorLinkList'
import { CollapsibleTextBlocks } from '@sections/CollapsibleTextBlocks'

type DefaultComponent = {
  id?: string
  type?: string
  designOptions?: DesignOptions
}
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
  | DefaultComponent

type PageContentProps = {
  data: TopicPageSchema | MagazinePageSchema
  titleBackground?: BackgroundContainerProps
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * All pagecontent should only have padding/margin bottom and x axis
 * If needed to apply top spacing do it here
 * E.g. Colored background content need padding top
 * Remember to think about the prev section of condition with top spacing
 * E.g. 2 colored background of same color content, only first need but not second
 */
const getBackgroundOptions = (component: ComponentProps) => {
  //@ts-ignore
  return component?.designOptions?.background || getColorForTheme(component?.designOptions?.theme)
}

const isWhiteColorBackground = (componentsDO: any, component: ComponentProps) => {
  const casesWhichHaveBackgroundButIsWhite = ['cardsList']
  return (
    componentsDO?.backgroundUtility === 'white-100' ||
    componentsDO?.backgroundColor === 'White' ||
    componentsDO?.background === 'White' ||
    //@ts-ignore
    casesWhichHaveBackgroundButIsWhite.includes(component?.type) ||
    //@ts-ignore
    !component?.designOptions
  )
}

const isColoredBackgroundAndNotWhite = (componentsDO: any, isWhiteColor: boolean) => {
  return (
    ((componentsDO?.type === 'backgroundColor' || componentsDO?.backgroundColor || componentsDO?.background) &&
      !isWhiteColor) ||
    componentsDO?.type === 'backgroundImage' ||
    componentsDO?.backgroundImage?.image
  )
}

const isSameColorBackground = (currentComponentsDO: any, previousComponentsDO: any) => {
  if (
    currentComponentsDO?.backgroundUtility &&
    currentComponentsDO?.backgroundUtility !== '' &&
    previousComponentsDO?.backgroundUtility &&
    previousComponentsDO?.backgroundUtility !== ''
  ) {
    return currentComponentsDO?.backgroundUtility === previousComponentsDO?.backgroundUtility
  }
  return currentComponentsDO?.backgroundColor === previousComponentsDO?.backgroundColor
}

const applyPaddingTopIfApplicable = (currentComponent: ComponentProps, prevComponent: ComponentProps): string => {
  const currentComponentsDO = getBackgroundOptions(currentComponent)
  const previousComponentsDO = getBackgroundOptions(prevComponent)

  const currentIsWhiteColorBackground = isWhiteColorBackground(currentComponentsDO, currentComponent)
  const previousIsWhiteColorBackground = isWhiteColorBackground(previousComponentsDO, prevComponent)

  const isCurrentColoredBackgroundAndNotWhite = isColoredBackgroundAndNotWhite(
    currentComponentsDO,
    currentIsWhiteColorBackground,
  )
  const previousIsColorContainerAndNotWhite = isColoredBackgroundAndNotWhite(
    previousComponentsDO,
    previousIsWhiteColorBackground,
  )

  const previousIsSameColorAsCurrent = isSameColorBackground(currentComponentsDO, previousComponentsDO)

  const specialCases = ['teaser', 'fullWidthImage', 'fullWidthVideo']
  //@ts-ignore
  const previousComponentIsASpecialCaseAndNeedPT = specialCases.includes(prevComponent?.type)

  if (
    (isCurrentColoredBackgroundAndNotWhite && !previousIsSameColorAsCurrent) ||
    (currentIsWhiteColorBackground && previousIsColorContainerAndNotWhite) ||
    previousComponentIsASpecialCaseAndNeedPT
  ) {
    return 'pt-20'
  }
  return ''
}

/*eslint-enable @typescript-eslint/ban-ts-comment */

export const PageContent = ({ data, titleBackground }: PageContentProps) => {
  const content = (data?.content || []).map((c: ComponentProps, index) => {
    const prevComponent = data?.content?.[index - 1]
    const anchorReference =
      (prevComponent as unknown as ComponentProps)?.type === 'anchorLink'
        ? (prevComponent as unknown as AnchorLinkData)?.anchorReference
        : undefined

    //Returns pt-20 when applicable or empty string
    const previousComponentIndex = prevComponent?.type === 'anchorLink' ? index - 2 : index - 1

    const previousComponentToCompare =
      index === 0
        ? ({
            type: 'pageTitle',
            designOptions: {
              background: titleBackground?.background,
            },
          } as DefaultComponent)
        : (data?.content?.[previousComponentIndex] as unknown as ComponentProps)

    const topSpacingClassName = applyPaddingTopIfApplicable(c, previousComponentToCompare)

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
      case 'anchorLinkList':
        return (
          <AnchorLinkList
            key={c.id}
            data={c as AnchorLinkListData}
            anchor={anchorReference}
            className={topSpacingClassName}
          />
        )
      case 'collapsibleTextBlocks':
        return (
          <CollapsibleTextBlocks
            key={c.id}
            data={c as CollapsibleTextBlocksData}
            anchor={anchorReference}
            className={topSpacingClassName}
          />
        )
      default:
        return null
    }
  })
  return <>{content}</>
}
