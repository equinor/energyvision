// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
'use client'
import { toPlainText } from 'next-sanity'
import { ErrorBoundary } from 'react-error-boundary'
import { TbFaceIdError } from 'react-icons/tb'
import { Typography } from '@/core/Typography'
import { dataset } from '@/languageConfig'
import AccordionBlock from '@/sections/AccordionBlock/AccordionBlock'
import { AnchorLinkList } from '@/sections/AnchorLinkList'
import BarChartBlock, {
  type BarChartBlockProps,
} from '@/sections/BarChartBlock/BarChartBlock'
import { CampaignBanner } from '@/sections/CampaignBanner'
import CookieDeclaration from '@/sections/CookieDeclaration/CookieDeclaration'
import CardsList from '@/sections/cards/CardsList/CardsList'
import Figure, { type FigureData } from '@/sections/Figure/Figure'
import FullWidthVideo, {
  type FullWidthVideoProps,
} from '@/sections/FullWidthVideo/FullWidthVideo'
import FullWidthImage, {
  type FullWidthImageData,
} from '@/sections/FullwidthImage/FullWidthImage'
import Grid from '@/sections/Grid/Grid'
import { HomePageBanner } from '@/sections/HomePageBanner/HomePageBanner'
import IFrameBlock from '@/sections/IFrameBlock/IFrameBlock'
import IframeCarousel from '@/sections/IframeCarousel/IframeCarousel'
import ImageCarousel from '@/sections/ImageCarousel/ImageCarousel'
import ImageForText from '@/sections/ImageForText/ImageForText'
import KeyNumbers from '@/sections/KeyNumber/KeyNumber'
import LineChartBlock, {
  type LineChartBlockProps,
} from '@/sections/LineChartBlock/LineChartBlock'
import NewsList from '@/sections/NewsList/NewsList'
import PieChartBlock, {
  type PieChartBlockProps,
} from '@/sections/PieChartBlock/PieChartBlock'
import PromoTileArray from '@/sections/PromoTiles/PromoTileArray'
import { PromotionBlockV2 } from '@/sections/promotions/PromotionBlockV2'
import PromotionsBlock, {
  type PromotionsBlockData,
} from '@/sections/promotions/PromotionsBlock'
import QuoteBlock from '@/sections/QuoteBlock/QuoteBlock'
import StockValues, {
  type StockValuesProps,
} from '@/sections/StockValues/StockValues'
import TableBlock, {
  type TableBlockProps,
} from '@/sections/TableBlock/TableBlock'
import TabsBlock, { type TabsBlockProps } from '@/sections/TabsBlock/TabsBlock'
import { getColorForTabsTheme } from '@/sections/TabsBlock/tabThemes'
import TextBlock from '@/sections/TextBlock/TextBlock'
import TextWithIconArray from '@/sections/TextWithIconArray/TextWithIconArray'
import Teaser from '@/sections/teasers/Teaser/Teaser'
import TextTeaser from '@/sections/teasers/TextTeaser/TextTeaser'
import { getColorForTheme } from '@/sections/teasers/TextTeaser/theme'
/* import TwitterEmbed from '@/pageComponents/topicPages/TwitterEmbed' */
import VideoPlayer, {
  type VideoPlayerBlockProps,
} from '@/sections/VideoPlayerBlock/VideoPlayerBlock'
import VideoPlayerCarousel, {
  type VideoPlayerCarouselData,
} from '@/sections/VideoPlayerCarousel/VideoPlayerCarousel'
import {
  type ColorKeyTokens,
  colorKeyToUtilityMap,
} from '@/styles/colorKeyToUtilityMap'
import Form from '@/templates/forms/Form'
import type {
  AccordionData,
  AnchorLinkData,
  AnchorLinkListData,
  Background,
  CallToActionData,
  CampaignBannerData,
  CardsListData,
  CookieDeclarationData,
  DesignOptions,
  FormData,
  GridData,
  IFrameData,
  IframeCarouselData,
  ImageCarouselData,
  ImageForTextData,
  KeyNumbersData,
  MagazinePageSchema,
  NewsListData,
  PromoTileArrayData,
  QuoteData,
  TableData,
  TeaserData,
  TextBlockData,
  TextTeaserData,
  TextWithIconArrayData,
  TopicPageSchema,
} from '@/types'

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
  heroBackground?: Background
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * All pagecontent should only have padding/margin bottom and x axis
 * If needed to apply top spacing do it here
 * E.g. Colored background content need padding top
 * Remember to think about the prev section of condition with top spacing
 * E.g. 2 colored background of same color content, only first need but not second
 */
const getBackgroundObject = (component: Component) => {
  if (!component?.designOptions || !Object.hasOwn(component, 'designOptions')) {
    //white if no designOptions
    return {
      backgroundUtility: 'white-100',
    }
  }

  if (component?.type === 'tabs') {
    return getColorForTabsTheme(component?.designOptions?.theme?.value)
  }

  return (
    component?.designOptions?.background ||
    getColorForTheme(component?.designOptions?.theme)
  )
}

const cleanBgUtility = (value: string) => value?.replace('bg-', '')

const isWhiteColorBackground = (componentsBO: any, component: Component) => {
  const casesWhichHaveBackgroundButIsWhite = ['cardsList']
  return (
    cleanBgUtility(componentsBO?.backgroundUtility) === 'white-100' ||
    componentsBO?.backgroundColor === 'White' ||
    componentsBO?.background === 'White' ||
    casesWhichHaveBackgroundButIsWhite.includes(component?.type) ||
    !component?.designOptions
  )
}

const isSameColorBackground = (
  currentComponentsBO: any,
  previousComponentsBO: any,
) => {
  if (
    currentComponentsBO?.backgroundUtility &&
    currentComponentsBO?.backgroundUtility !== '' &&
    previousComponentsBO?.backgroundUtility &&
    previousComponentsBO?.backgroundUtility !== ''
  ) {
    return (
      cleanBgUtility(currentComponentsBO?.backgroundUtility) ===
      cleanBgUtility(previousComponentsBO?.backgroundUtility)
    )
  }
  if (
    currentComponentsBO?.backgroundUtility &&
    !previousComponentsBO?.backgroundUtility &&
    previousComponentsBO?.backgroundColor
  ) {
    return (
      colorKeyToUtilityMap[
        currentComponentsBO?.backgroundUtility as keyof ColorKeyTokens
      ]?.backgroundName === previousComponentsBO?.backgroundColor
    )
  }
  if (
    !currentComponentsBO?.backgroundUtility &&
    currentComponentsBO?.backgroundColor &&
    previousComponentsBO?.backgroundUtility
  ) {
    currentComponentsBO?.backgroundColor ===
      colorKeyToUtilityMap[
        previousComponentsBO?.backgroundUtility as keyof ColorKeyTokens
      ]?.backgroundName
  }

  return (
    currentComponentsBO?.backgroundColor ===
    previousComponentsBO?.backgroundColor
  )
}

const applyPaddingTopIfApplicable = (
  currentComponent: Component,
  prevComponent: Component,
): string => {
  if (currentComponent?.type === 'anchorLink') {
    return
  }
  /*   console.log(
    `Current: ${currentComponent?.type}:${Array.isArray(currentComponent?.title) ? toPlainText(currentComponent?.title) : currentComponent?.title}`,
  )
  console.log(
    `Previous component ${prevComponent?.type}:${Array.isArray(prevComponent?.title) ? toPlainText(prevComponent?.title) : prevComponent?.title}`,
  ) */

  const currentBackgroundObject = getBackgroundObject(currentComponent)
  const previousBackgroundObject = getBackgroundObject(prevComponent)
  /*   console.log('currentBackgroundObject', currentBackgroundObject)
  console.log('previousBackgroundObject', previousCompreviousBackgroundObjectponentsDO) */

  const specialCases = [
    'teaser',
    'fullWidthImage',
    'fullWidthVideo',
    'backgroundImage',
    'campaignBanner',
  ]

  const currentIsWhiteColorBackground = isWhiteColorBackground(
    currentBackgroundObject,
    currentComponent,
  )
  const previousIsWhiteColorBackground = isWhiteColorBackground(
    previousBackgroundObject,
    prevComponent,
  )
  /* 
  console.log('currentIsWhiteColorBackground', currentIsWhiteColorBackground)
  console.log('previousIsWhiteColorBackground', previousIsWhiteColorBackground)*/

  const previousComponentIsASpecialCaseAndNeedPT =
    specialCases.includes(prevComponent?.type) ||
    specialCases.includes(previousBackgroundObject?.type)

  if (
    currentIsWhiteColorBackground &&
    previousIsWhiteColorBackground &&
    !previousComponentIsASpecialCaseAndNeedPT
  ) {
    return ''
  }

  if (prevComponent?.type === 'homepageBanner') {
    return prevComponent?.designOptions?.backgroundType === '0'
      ? 'lg:pt-20'
      : 'pt-20'
  }

  const previousIsSameColorAsCurrent = isSameColorBackground(
    currentBackgroundObject,
    previousBackgroundObject,
  )
  /*   console.log('previousIsSameColorAsCurrent', previousIsSameColorAsCurrent) */
  if (
    previousIsSameColorAsCurrent &&
    !previousComponentIsASpecialCaseAndNeedPT
  ) {
    return ''
  }

  return 'pt-20'
}

export const PageContent = ({ data, heroBackground }: PageContentProps) => {
  const mapSection = (
    index: number,
    c: any,
    anchorReference: string,
    spacingClassName: string,
  ) => {
    switch (c.type) {
      case 'teaser':
        return (
          <Teaser key={c.id} data={c as TeaserData} anchor={anchorReference} />
        )
      case 'textTeaser':
        return (
          <TextTeaser
            key={c.id}
            data={c as TextTeaserData}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
      case 'textBlock':
        return (
          <TextBlock
            key={c.id}
            data={c as TextBlockData}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
      case 'fullWidthImage':
        return (
          <FullWidthImage
            key={c.id}
            data={c as FullWidthImageData}
            anchor={anchorReference}
          />
        )
      case 'fullWidthVideo':
        return (
          <FullWidthVideo
            key={c.id}
            {...(c as FullWidthVideoProps)}
            anchor={anchorReference}
          />
        )
      case 'figure':
        return (
          <Figure
            key={c.id}
            data={c as FigureData}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
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
        return (
          <QuoteBlock
            key={c.id}
            data={c as QuoteData}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
      case 'accordion':
        return (
          <AccordionBlock
            key={c.id}
            data={c as AccordionData}
            anchor={anchorReference}
            className={spacingClassName}
          />
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
        return (
          <IFrameBlock
            key={c.id}
            data={c as IFrameData}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
      case 'promotion':
        return (
          <PromotionsBlock
            key={c.id}
            data={c as PromotionsBlockData}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
      case 'promoteEvents':
        return (
          <PromotionsBlock
            key={c.id}
            variant='promoteEvents'
            data={c as PromotionsBlockData}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
      case 'promoteNews':
        return (
          <PromotionsBlock
            key={c.id}
            variant='promoteNews'
            data={c as PromotionsBlockData}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
      //spread!
      case 'promotePeople':
        return (
          <PromotionsBlock
            key={c.id}
            variant='promotePeople'
            data={c as PromotionsBlockData}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
      case 'promoteMagazine':
        return (
          <PromotionsBlock
            key={c.id}
            variant='promoteMagazine'
            data={c as PromotionsBlockData}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
      case 'promoteTopics':
        return (
          <PromotionsBlock
            key={c.id}
            variant='promoteTopics'
            data={c as PromotionsBlockData}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
      case 'form':
        return (
          <Form
            key={c.id}
            data={c as FormData}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
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
          <StockValues
            key={c.id}
            {...(c as StockValuesProps)}
            anchor={anchorReference}
            className={spacingClassName}
          />
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
          <KeyNumbers
            key={c.id}
            data={c as KeyNumbersData}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
      case 'cardsList':
        return (
          <CardsList
            key={c.id}
            data={c as CardsListData}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
      case 'grid':
        return (
          <Grid
            key={c.id}
            data={c as GridData}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
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
        return (
          <TabsBlock key={c.id} {...(c as any)} className={spacingClassName} />
        )
      /* Remove from here and move to Homepage Template PageContent */
      case 'homepageBanner':
        return (
          <HomePageBanner
            key={c.id}
            {...(c as any)}
            nextCompBg={
              data?.content?.[index + 1]?.designOptions?.background
                ?.backgroundUtility
            }
          />
        )
      case 'tableV2':
        return (
          <TableBlock
            variant='default'
            key={c.id}
            {...(c as any)}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
      case 'importTable':
        return (
          <TableBlock
            variant='import'
            key={c.id}
            {...(c as any)}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
      case 'pieChartBlock':
        return (
          <PieChartBlock
            key={c.id}
            {...(c as PieChartBlockProps)}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
      case 'barChartBlock':
        return (
          <BarChartBlock
            key={c.id}
            {...(c as BarChartBlockProps)}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
      case 'lineChartBlock':
        return (
          <LineChartBlock
            key={c.id}
            {...(c as LineChartBlockProps)}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
      case 'promoteExternalLinkV2':
      case 'promoteTopicsV2':
        return (
          <PromotionBlockV2
            key={c.id}
            {...(c as any)}
            anchor={anchorReference}
            className={spacingClassName}
          />
        )
      default:
        return null
    }
  }
  const content = (data?.content || []).map((c: Component, index) => {
    const prevComponent = data?.content?.[index - 1]
    const anchorReference =
      (prevComponent as unknown as ComponentProps)?.type === 'anchorLink'
        ? (prevComponent as unknown as AnchorLinkData)?.anchorReference
        : undefined

    //Returns pt-20 when applicable or empty string
    const previousComponentIndex =
      prevComponent?.type === 'anchorLink' ? index - 2 : index - 1

    const previousComponentToCompare =
      index === 0
        ? ({
            type: 'pageTitle',
            designOptions: { background: heroBackground },
          } as Component)
        : (data?.content?.[previousComponentIndex] as unknown as Component)

    const topSpacingClassName = applyPaddingTopIfApplicable(
      c,
      previousComponentToCompare,
    )
    /*     console.log(
      `Applying top spacing: ${topSpacingClassName} to ${c?.type} with title ${Array.isArray(c?.title) ? toPlainText(c?.title) : c?.title}`,
    ) */
    const spacingClassName = `${topSpacingClassName} pb-page-content`

    return (
      <ErrorBoundary
        key={c.id}
        fallbackRender={({ error }) => {
          console.error(
            `Error in component ${c.type}: ${c?.title ? toPlainText(c.title) : ''}`,
            error,
          )
          return (
            <div
              role='alert'
              className={`mx-layout-sm mb-page-content flex flex-col items-center gap-8 rounded-card bg-gray-20 px-6 py-8 lg:mx-layout-lg`}
            >
              <TbFaceIdError size={64} />
              <Typography as='h2' variant='h3' className='text-center'>
                Sorry,
                {dataset === 'global-development'
                  ? ` error in component ${c.type}: ${c?.title ? toPlainText(c.title) : ''}`
                  : ` this section could not be shown`}
              </Typography>
            </div>
          )
        }}
      >
        {mapSection(index, c, anchorReference, spacingClassName)}
      </ErrorBoundary>
    )
  })
  return content
}
