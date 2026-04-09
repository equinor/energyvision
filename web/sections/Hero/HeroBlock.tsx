'use client'
import { toPlainText } from 'next-sanity'
import type { HTMLAttributes } from 'react'
import { Breadcrumbs } from '@/core/Breadcrumbs/Breadcrumbs'

import {
  colorKeyToUtilityMap,
  getBgAndDarkFromBackground,
} from '@/styles/colorKeyToUtilityMap'
import type { DesignOptions } from '@/types'
import { DefaultHero, type DefaultHeroProps } from './DefaultHero'
import { FiftyFiftyHero, type FiftyFiftyHeroProps } from './FiftyFiftyHero'
import {
  FullWidthImageHero,
  type FullWidthImageHeroProps,
} from './FullWidthImageHero'
import {
  LoopingVideoHero,
  type LoopingVideoHeroProps,
} from './LoopingVideoHero'
import {
  TextOnBackgroundImageHero,
  type TextOnBackgroundImageHeroProps,
} from './TextOnBackgroundImageHero'

export enum HeroTypes {
  DEFAULT = 'default',
  FIFTY_FIFTY = 'fiftyFifty',
  FULL_WIDTH_IMAGE = 'fullWidthImage',
  LOOPING_VIDEO = 'loopingVideo',
  NO_HERO = 'noHero',
  BACKGROUND_IMAGE = 'backgroundImage',
}

/* export type HeroData = {
  figure?: Figure
  title?: PortableTextBlock[]
  subTitle?: ReactNode
  tags?: string[]
  magazineTags?: MagazineTag[]
  heroTitle?: PortableTextBlock[] | string
  ingress?: PortableTextBlock[]
  link?: LinkData
  heroLink?: LinkData
  type?: HeroTypes
  ratio?: string
  background?: ColorKeys
  loopingVideo?: LoopingVideoData
  hideImageCaption?: boolean
  captionBg?: BackgroundColours
  backgroundGradient?: string
} */

export type HeroData = {
  type?: HeroTypes
} & TextOnBackgroundImageHeroProps &
  LoopingVideoHeroProps &
  FullWidthImageHeroProps &
  FiftyFiftyHeroProps &
  DefaultHeroProps

export type HeroBlockProps = {
  nextSectionDesignOptions?: DesignOptions
  breadcrumbs?: any
  isMagazineRoom?: boolean
  //To add custom styling to the outer container of the hero type
  className?: string
  heroData: HeroData
} & HTMLAttributes<HTMLElement>

export const HeroBlock = ({
  heroData,
  nextSectionDesignOptions,
  breadcrumbs,
  isMagazineRoom = false,
  className = '',
}: HeroBlockProps) => {
  const {
    type = HeroTypes.DEFAULT,
    title,
    subTitle,
    ingress,
    figure,
    ratio,
    background,
    magazineTags,
    link,
    heroLink,
    video,
    backgroundGradient,
    useBrandTheme,
    useBlurCenter,
    displayTextVariant,
  } = heroData

  const { bg: nextCompBg, dark: nextCompDark } = getBgAndDarkFromBackground(
    nextSectionDesignOptions,
  )

  const breadcrumbsElement = (
    <Breadcrumbs
      //@ts-ignore
      background={type !== HeroTypes.DEFAULT ? nextCompBg : undefined}
      currentSlug={breadcrumbs?.currentSlug}
      useCustomBreadcrumbs={breadcrumbs?.useCustomBreadcrumbs}
      defaultBreadcrumbs={breadcrumbs?.defaultBreadcrumbs}
      customBreadcrumbs={breadcrumbs?.customBreadcrumbs}
      className={`${nextCompDark ? nextCompDark : ''} ${type === HeroTypes.DEFAULT && (figure?.caption || figure?.attribution) ? 'pt-2' : ''}`}
    />
  )
  const heroTypesThatHaveBreadcrumbsBelow = [
    HeroTypes.FIFTY_FIFTY,
    HeroTypes.DEFAULT,
    HeroTypes.BACKGROUND_IMAGE,
  ]

  const commonProps = {
    figure,
    title,
    ingress,
    //@ts-ignore
    background: colorKeyToUtilityMap[background]?.background,
    nextSectionDesignOptions: nextSectionDesignOptions,
    ...(magazineTags && { magazineTags }),
    ...((link || (heroLink && type === HeroTypes.FIFTY_FIFTY)) && {
      link: heroLink ?? link,
    }),
    className,
  }

  const getHero = () => {
    switch (type) {
      case HeroTypes.FULL_WIDTH_IMAGE:
        return (
          <FullWidthImageHero
            {...commonProps}
            displayTextVariant={displayTextVariant}
            subTitle={subTitle}
            {...(breadcrumbs?.enableBreadcrumbs && {
              breadcrumbsComponent: breadcrumbsElement,
            })}
            // reduce pb when breadscrumbs
            className={`${breadcrumbs?.enableBreadcrumbs ? 'pb-2' : ''}`}
            variant={ratio ?? 'narrow'}
          />
        )
      case HeroTypes.FIFTY_FIFTY:
        return (
          <FiftyFiftyHero
            {...commonProps}
            displayTextVariant={displayTextVariant}
            className={`${breadcrumbs?.enableBreadcrumbs ? 'mb-2' : 'mb-4 lg:mb-6'}`}
          />
        )
      case HeroTypes.BACKGROUND_IMAGE:
        return (
          <TextOnBackgroundImageHero
            {...commonProps}
            displayTextVariant={displayTextVariant}
            backgroundGradient={backgroundGradient}
            useBlurCenter={useBlurCenter}
            useBrandTheme={useBrandTheme}
            isMagazineRoom={isMagazineRoom}
          />
        )
      case HeroTypes.LOOPING_VIDEO:
        return (
          //@ts-ignore
          <LoopingVideoHero
            {...commonProps}
            video={video}
            // reduce pb when breadscrumbs
            className={`${breadcrumbs?.enableBreadcrumbs ? 'pb-2' : ''}`}
          />
        )
      default:
        return (
          <DefaultHero
            {...commonProps}
            subTitle={subTitle}
            // reduce pb when breadscrumbs
            className={`${breadcrumbs?.enableBreadcrumbs ? 'pb-2' : ''}`}
          />
        )
    }
  }

  return type !== HeroTypes.NO_HERO ? (
    <section className='h-full w-full'>
      {getHero()}
      {breadcrumbs?.enableBreadcrumbs &&
        heroTypesThatHaveBreadcrumbsBelow.includes(type) && (
          <Breadcrumbs
            //@ts-ignore
            background={type !== HeroTypes.DEFAULT ? nextCompBg : undefined}
            currentSlug={breadcrumbs.currentSlug}
            useCustomBreadcrumbs={breadcrumbs?.useCustomBreadcrumbs}
            defaultBreadcrumbs={breadcrumbs?.defaultBreadcrumbs}
            customBreadcrumbs={breadcrumbs?.customBreadcrumbs}
            className={`${nextCompDark ? nextCompDark : ''} ${type === HeroTypes.DEFAULT && (figure?.caption || figure?.attribution) ? 'pt-2' : ''}`}
          />
        )}
    </section>
  ) : (
    <h1 id='mainTitle' className='sr-only'>
      {/** @ts-ignore */}
      {toPlainText(title)}
    </h1>
  )
}
