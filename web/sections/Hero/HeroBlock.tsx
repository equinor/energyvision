'use client'
import { type PortableTextBlock, toPlainText } from 'next-sanity'
import type { HTMLAttributes, ReactNode } from 'react'
import { Breadcrumbs } from '@/core/Breadcrumbs/Breadcrumbs'
import {
  type ColorKeys,
  colorKeyToUtilityMap,
  getBgAndDarkFromBackground,
} from '@/styles/colorKeyToUtilityMap'
import type {
  BackgroundColours,
  DesignOptions,
  ImageWithCaptionData,
  LinkData,
} from '@/types'
import type { MagazineTag } from '../MagazineTags/MagazineTagBar'
import { FiftyFiftyHero } from './FiftyFiftyHero'
import {
  FullWidthImageHero,
  type FullWidthImageHeroVariant,
} from './FullWidthImageHero'
import { type LoopingVideoData, LoopingVideoHero } from './LoopingVideoHero'
import { TextOnBackgroundImageHero } from './TextOnBackgroundImageHero'

export enum HeroTypes {
  DEFAULT = 'default',
  FIFTY_FIFTY = 'fiftyFifty',
  FULL_WIDTH_IMAGE = 'fullWidthImage',
  LOOPING_VIDEO = 'loopingVideo',
  NO_HERO = 'noHero',
  BACKGROUND_IMAGE = 'backgroundImage',
}

export type HeroData = {
  figure?: ImageWithCaptionData
  /**Page title */
  title?: PortableTextBlock[]
  /* For new or magazine published information */
  subTitle?: ReactNode
  /** 50/50 Text/image */
  /* Magazine */
  tags?: string[]
  /* Magazine promoted tagline */
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
  backgroundBlur?: boolean
}

export type HeroBlockProps = {
  nextSectionDesignOptions?: DesignOptions
  breadcrumbs?: any
  isMagazineRoom?: boolean
  //To add custom styling to the outer container of the hero type
  className?: string
} & HeroData &
  HTMLAttributes<HTMLElement>

export const HeroBlock = ({
  title,
  heroTitle,
  subTitle,
  ingress,
  figure,
  ratio,
  background,
  type = HeroTypes.DEFAULT,
  tags,
  magazineTags,
  link,
  heroLink,
  loopingVideo,
  nextSectionDesignOptions,
  breadcrumbs,
  backgroundGradient,
  backgroundBlur,
  isMagazineRoom = false,
  className = '',
}: HeroBlockProps) => {
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

  const heroProps = {
    figure,
    title,
    subTitle,
    heroTitle,
    ingress,
    //@ts-ignore
    background: colorKeyToUtilityMap[background]?.background,
    nextSectionDesignOptions: nextSectionDesignOptions,
    ...(tags && { tags }),
    ...(magazineTags && { magazineTags }),
    ...((link || (heroLink && type === HeroTypes.FIFTY_FIFTY)) && {
      link: heroLink ?? link,
    }),
    ...(type === HeroTypes.LOOPING_VIDEO && {
      video: loopingVideo,
    }),
    //figCaptionClassName: 'lg:px-layout-lg',
    backgroundGradient,
    backgroundBlur,
    ...(HeroTypes.FULL_WIDTH_IMAGE &&
      breadcrumbs?.enableBreadcrumbs && {
        breadcrumbsComponent: breadcrumbsElement,
      }),
    className,
  }

  const getHero = () => {
    switch (type) {
      case HeroTypes.FULL_WIDTH_IMAGE:
        return (
          <FullWidthImageHero
            {...heroProps}
            // reduce pb when breadscrumbs
            className={`${breadcrumbs?.enableBreadcrumbs ? 'pb-2' : ''}`}
            variant={(ratio as FullWidthImageHeroVariant) ?? 'narrow'}
          />
        )
      case HeroTypes.FIFTY_FIFTY:
        return (
          <FiftyFiftyHero
            {...heroProps}
            className={`${breadcrumbs?.enableBreadcrumbs ? 'mb-2' : 'mb-4 lg:mb-6'}`}
          />
        )
      case HeroTypes.BACKGROUND_IMAGE:
        return (
          <TextOnBackgroundImageHero
            {...heroProps}
            isMagazineRoom={isMagazineRoom}
          />
        )
      case HeroTypes.LOOPING_VIDEO:
        return (
          //@ts-ignore
          <LoopingVideoHero
            {...heroProps}
            // reduce pb when breadscrumbs
            className={`${breadcrumbs?.enableBreadcrumbs ? 'pb-2' : ''}`}
          />
        )
      default:
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
            className={`${nextCompDark ? nextCompDark : ''} ${type === HeroTypes.DEFAULT && (heroProps?.figure?.caption || heroProps?.figure?.attribution) ? 'pt-2' : ''}`}
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
