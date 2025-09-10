import IframeCarousel from '@/sections/IframeCarousel/IframeCarousel'
import TextTeaser from '@/sections/teasers/TextTeaser/TextTeaser'
import KeyNumbers from '@/sections/KeyNumber/KeyNumber'
import CardsList from '@/sections/cards/CardsList/CardsList'
import {
  AnchorLinkData,
  TopicPageSchema,
  MagazinePageSchema,
  TeaserData,
  TextBlockData,
  TextWithIconArrayData,
  CallToActionData,
  QuoteData,
  AccordionData,
  PromoTileArrayData,
  IFrameData,
  FormData,
  TableData,
  NewsListData,
  StockValuesData,
  TwitterEmbedData,
  CookieDeclarationData,
  ImageCarouselData,
  IframeCarouselData,
  TextTeaserData,
  KeyNumbersData,
  CardsListData,
  GridData,
  CampaignBannerData,
  DesignOptions,
  AnchorLinkListData,
  ImageForTextData,
} from '@/types'
import { getColorForTheme } from '@/sections/teasers/TextTeaser/theme'
import Grid from '@/sections/Grid/Grid'
import { CampaignBanner } from '@/sections/CampaignBanner'
import { BackgroundContainerProps } from '@/core/Backgrounds'
import VideoPlayerCarousel, { VideoPlayerCarouselData } from '@/sections/VideoPlayerCarousel/VideoPlayerCarousel'
import ImageCarousel from '@/sections/ImageCarousel/ImageCarousel'
import { AnchorLinkList } from '@/sections/AnchorLinkList'
import ImageForText from '@/sections/ImageForText/ImageForText'
import TextWithIconArray from '@/sections/TextWithIconArray/TextWithIconArray'
import AccordionBlock from '@/sections/AccordionBlock/AccordionBlock'
import TabsBlock, { TabsBlockProps } from '@/sections/TabsBlock/TabsBlock'
import { getColorForTabsTheme } from '@/sections/TabsBlock/tabThemes'
import { ColorKeyTokens, colorKeyToUtilityMap } from '@/styles/colorKeyToUtilityMap'
import Form from '@/templates/forms/Form'
import IFrameBlock from '@/sections/IFrameBlock/IFrameBlock'
import Teaser from '@/sections/teasers/Teaser/Teaser'
import TextBlock from '@/sections/TextBlock/TextBlock'
import FullWidthImage, { FullWidthImageData } from '@/sections/FullwidthImage/FullWidthImage'
import FullWidthVideo, { FullWidthVideoProps } from '@/sections/FullWidthVideo/FullWidthVideo'
import Figure, { FigureData } from '@/pageComponents/topicPages/Figure'
import PageQuote from '@/pageComponents/topicPages/PageQuote'
import PromoTileArray from '@/sections/PromoTiles/PromoTileArray'
import CookieDeclaration from '@/pageComponents/topicPages/CookieDeclaration'
import NewsList from '@/pageComponents/topicPages/NewsList'
import StockValues from '@/pageComponents/topicPages/StockValues'
import TwitterEmbed from '@/pageComponents/topicPages/TwitterEmbed'
import VideoPlayer, { VideoPlayerBlockProps } from '@/sections/VideoPlayerBlock/VideoPlayerBlock'
import { HomePageBanner } from '@/sections/HomePageBanner/HomePageBanner'
import TableBlock, { TableBlockProps } from '@/sections/TableBlock/TableBlock'
import PromotionsBlock, { PromotionsBlockData } from '@/sections/promotions/PromotionsBlock'

// How could we do this for several different component types?
export type ComponentSections =
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
  | PromotionsBlockData
  | FormData
  | TableData
  | StockValuesData
  | TwitterEmbedData
  | AnchorLinkData
  | VideoPlayerCarouselData
  | CookieDeclarationData
  | TextTeaserData
  | KeyNumbersData
  | TabsBlockProps
  | TableBlockProps

//To be removed when all types are moved to relevant component and these common are in every section component
type Component = {
  id?: string
  type?: string
  designOptions?: DesignOptions
} & ComponentSections

export type PageContentProps = {
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
const getBackgroundOptions = (component: Component) => {
  //@ts-ignore:Too many types
  if (!component?.designOptions || !Object.hasOwn(component, 'designOptions')) {
    //Return white default if no designOptions
    return {
      backgroundUtility: 'white-100',
    }
  }
  //@ts-ignore
  if (component?.type === 'tabs') {
    //@ts-ignore:so many types
    return getColorForTabsTheme(component?.designOptions?.theme?.value)
  }
  //@ts-ignore:so many types
  return component?.designOptions?.background || getColorForTheme(component?.designOptions?.theme)
}

const cleanBgUtility = (value: string) => value?.replace('bg-', '')

const isWhiteColorBackground = (componentsDO: any, component: Component) => {
  const casesWhichHaveBackgroundButIsWhite = ['cardsList']
  return (
    cleanBgUtility(componentsDO?.backgroundUtility) === 'white-100' ||
    componentsDO?.backgroundColor === 'White' ||
    componentsDO?.background === 'White' ||
    //@ts-ignore
    casesWhichHaveBackgroundButIsWhite.includes(component?.type) ||
    //@ts-ignore
    !component?.designOptions
  )
}

const isSameColorBackground = (currentComponentsDO: any, previousComponentsDO: any) => {
  if (
    currentComponentsDO?.backgroundUtility &&
    currentComponentsDO?.backgroundUtility !== '' &&
    previousComponentsDO?.backgroundUtility &&
    previousComponentsDO?.backgroundUtility !== ''
  ) {
    return (
      cleanBgUtility(currentComponentsDO?.backgroundUtility) === cleanBgUtility(previousComponentsDO?.backgroundUtility)
    )
  }
  if (
    currentComponentsDO?.backgroundUtility &&
    !previousComponentsDO?.backgroundUtility &&
    previousComponentsDO?.backgroundColor
  ) {
    return (
      colorKeyToUtilityMap[currentComponentsDO?.backgroundUtility as keyof ColorKeyTokens]?.backgroundName ===
      previousComponentsDO?.backgroundColor
    )
  }
  if (
    !currentComponentsDO?.backgroundUtility &&
    currentComponentsDO?.backgroundColor &&
    previousComponentsDO?.backgroundUtility
  ) {
    currentComponentsDO?.backgroundColor ===
      colorKeyToUtilityMap[previousComponentsDO?.backgroundUtility as keyof ColorKeyTokens]?.backgroundName
  }

  return currentComponentsDO?.backgroundColor === previousComponentsDO?.backgroundColor
}

const applyPaddingTopIfApplicable = (currentComponent: Component, prevComponent: Component): string => {
  const currentComponentsDO = getBackgroundOptions(currentComponent)
  const previousComponentsDO = getBackgroundOptions(prevComponent)
  const specialCases = ['teaser', 'fullWidthImage', 'fullWidthVideo', 'backgroundImage', 'campaignBanner']

  const currentIsWhiteColorBackground = isWhiteColorBackground(currentComponentsDO, currentComponent)
  const previousIsWhiteColorBackground = isWhiteColorBackground(previousComponentsDO, prevComponent)

  const previousComponentIsASpecialCaseAndNeedPT =
    //@ts-ignore: too many types
    specialCases.includes(prevComponent?.type) || specialCases.includes(previousComponentsDO?.type)

  if (currentIsWhiteColorBackground && previousIsWhiteColorBackground && !previousComponentIsASpecialCaseAndNeedPT) {
    return ''
  }

  //@ts-ignore: too many types
  if (prevComponent?.type === 'homepageBanner') {
    //@ts-ignore: too many types
    return prevComponent?.designOptions?.backgroundType === '0' ? 'lg:pt-20' : 'pt-20'
  }

  const previousIsSameColorAsCurrent = isSameColorBackground(currentComponentsDO, previousComponentsDO)
  if (previousIsSameColorAsCurrent && !previousComponentIsASpecialCaseAndNeedPT) {
    return ''
  }

  return 'pt-20'
}

/*eslint-enable @typescript-eslint/ban-ts-comment */

export const PageContent = ({ data, titleBackground }: PageContentProps) => {
  const content = (data?.content || []).map((c: Component, index) => {
    const prevComponent = data?.content?.[index - 1]
    const anchorReference =
      //@ts-ignore:so many types
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
          } as Component)
        : (data?.content?.[previousComponentIndex] as unknown as Component)

    const topSpacingClassName = applyPaddingTopIfApplicable(c, previousComponentToCompare)
    const spacingClassName = `${topSpacingClassName} pb-page-content`
    //@ts-ignore:so many types
    switch (c.type) {
      case 'teaser':
        return <Teaser key={c.id} data={c as TeaserData} anchor={anchorReference} />
      case 'textTeaser':
        return (
          <TextTeaser key={c.id} data={c as TextTeaserData} anchor={anchorReference} className={spacingClassName} />
        )
      case 'textBlock':
        return <TextBlock key={c.id} data={c as TextBlockData} anchor={anchorReference} className={spacingClassName} />
      case 'fullWidthImage':
        return <FullWidthImage key={c.id} data={c as FullWidthImageData} anchor={anchorReference} />
      case 'fullWidthVideo':
        return <FullWidthVideo key={c.id} {...(c as FullWidthVideoProps)} anchor={anchorReference} />
      case 'figure':
        return <Figure key={c.id} data={c as FigureData} anchor={anchorReference} className={spacingClassName} />
      case 'textWithIconArray':
        return (
          <TextWithIconArray
            key={c.id}
            data={c as TextWithIconArrayData}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
      case 'pullQuote':
        return <PageQuote key={c.id} data={c as QuoteData} anchor={anchorReference} className={spacingClassName} />
      case 'accordion':
        return (
          <AccordionBlock key={c.id} data={c as AccordionData} anchor={anchorReference} className={spacingClassName} />
        )
      case 'promoTileArray':
        return (
          <PromoTileArray
            key={c.id}
            data={c as PromoTileArrayData}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
      case 'iframe':
        return <IFrameBlock key={c.id} data={c as IFrameData} anchor={anchorReference} className={spacingClassName} />
      case 'promotion':
        return (
          <PromotionsBlock
            key={c.id}
            data={c as PromotionsBlockData}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
      case 'form':
        return <Form key={c.id} data={c as FormData} anchor={anchorReference} className={spacingClassName} />
      case 'table':
        return <>To be updated to new table</> //<Table key={c.id} data={c as TableData} anchor={anchorReference} className={spacingClassName} />
      case 'cookieDeclaration':
        return (
          <CookieDeclaration
            key={c.id}
            data={c as CookieDeclarationData}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
      case 'newsList':
        return (
          <NewsList
            key={c.id}
            data={c as unknown as NewsListData}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
      case 'stockValuesApi':
        return (
          <StockValues key={c.id} data={c as StockValuesData} anchor={anchorReference} className={spacingClassName} />
        )
      case 'twitterEmbed':
        return (
          <TwitterEmbed key={c.id} data={c as TwitterEmbedData} anchor={anchorReference} className={spacingClassName} />
        )
      case 'imageCarousel':
        return (
          <ImageCarousel
            key={c.id}
            data={c as ImageCarouselData}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
      case 'iframeCarousel':
        return (
          <IframeCarousel
            key={c.id}
            data={c as IframeCarouselData}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
      case 'videoPlayer':
        return (
          <VideoPlayer
            key={c.id}
            {...(c as VideoPlayerBlockProps)}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
      case 'videoPlayerCarousel':
        return (
          <VideoPlayerCarousel
            key={c.id}
            data={c as VideoPlayerCarouselData}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
      case 'keyNumbers':
        return (
          <KeyNumbers key={c.id} data={c as KeyNumbersData} anchor={anchorReference} className={spacingClassName} />
        )
      case 'cardsList':
        return <CardsList key={c.id} data={c as CardsListData} anchor={anchorReference} className={spacingClassName} />
      case 'grid':
        return <Grid key={c.id} data={c as GridData} anchor={anchorReference} className={spacingClassName} />
      case 'campaignBanner':
        return <CampaignBanner key={c.id} data={c as CampaignBannerData} />
      case 'anchorLinkList':
        return (
          <AnchorLinkList
            key={c.id}
            data={c as AnchorLinkListData}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
      case 'imageForText':
        return <ImageForText key={c.id} data={c as ImageForTextData} />
      case 'tabs':
        return <TabsBlock key={c.id} {...(c as any)} className={spacingClassName} />
      /* Remove from here and move to Homepage Template PageContent */
      case 'homepageBanner':
        return <HomePageBanner key={c.id} {...(c as any)} />
      case 'tableV2':
        return (
          <TableBlock
            variant="default"
            key={c.id}
            {...(c as any)}
            anchor={anchorReference}
            className={topSpacingClassName}
          />
        )
      case 'importTable':
        return (
          <TableBlock
            variant="import"
            key={c.id}
            {...(c as any)}
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
