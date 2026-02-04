'use client'
import type { PortableTextBlock } from 'next-sanity'
import type { HTMLAttributes, ReactNode } from 'react'
import { Breadcrumbs } from '@/core/Breadcrumbs/Breadcrumbs'
import Blocks from '@/portableText/Blocks'
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
import { DefaultHero } from './DefaultHero'
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
  isBigTitle?: boolean
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
}

export type HeroBlockProps = {
  nextSectionDesignOptions?: DesignOptions
  breadcrumbs?: any
} & HeroData &
  HTMLAttributes<HTMLElement>
/**
 * Use this as starting block for a section
 * Remove unrelevant suggetions
 * Rename SectionBlockTemplate to relevant section name
 */
export const HeroBlock = ({
  title,
  heroTitle,
  subTitle,
  figure,
  ratio,
  background,
  isBigTitle = false,
  type = HeroTypes.DEFAULT,
  tags,
  magazineTags,
  link,
  heroLink,
  loopingVideo,
  nextSectionDesignOptions,
  breadcrumbs,
  backgroundGradient,
}: HeroBlockProps) => {
  const { bg: nextCompBg, dark: nextCompDark } = getBgAndDarkFromBackground(
    nextSectionDesignOptions,
  )

  const heroProps = {
    figure,
    title,
    subTitle,
    heroTitle,
    //@ts-ignore
    background: colorKeyToUtilityMap[background]?.background,
    nextSectionDesignOptions: nextSectionDesignOptions,
    isBigTitle,
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
  }

  const getHero = () => {
    switch (type) {
      case HeroTypes.FULL_WIDTH_IMAGE:
        return (
          <FullWidthImageHero
            {...heroProps}
            variant={(ratio as FullWidthImageHeroVariant) ?? 'narrow'}
          />
        )
      case HeroTypes.FIFTY_FIFTY:
        return <FiftyFiftyHero {...heroProps} />
      case HeroTypes.BACKGROUND_IMAGE:
        return <TextOnBackgroundImageHero {...heroProps} />
      case HeroTypes.LOOPING_VIDEO:
        //@ts-ignore
        return <LoopingVideoHero {...heroProps} />
      default:
        return <DefaultHero {...heroProps} ratio='2:1' />
    }
  }

  return type !== HeroTypes.NO_HERO ? (
    <section className='mb-8 h-full w-full'>
      {getHero()}
      {breadcrumbs?.enableBreadcrumbs && (
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
      <Blocks value={title} />
    </h1>
  )
}
