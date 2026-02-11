'use client'
import type { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import type { ImageRatioKeys } from '@/core/Image/Image'
import { Picture } from '@/core/Picture/Picture'
import Blocks from '@/portableText/Blocks'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import type { DesignOptions } from '@/types'
import MagazineTagBar from '../MagazineTags/MagazineTagBar'
import type { HeroData } from './HeroBlock'

export type FullWidthImageHeroVariant = 'default' | 'tall' | 'narrow'

type FullWidthImageHeroProps = {
  variant?: FullWidthImageHeroVariant
  nextSectionDesignOptions?: DesignOptions
} & HeroData &
  HTMLAttributes<HTMLElement>

//Magazine hides caption?
export const FullWidthImageHero = ({
  variant = 'default',
  figure,
  title,
  magazineTags,
  subTitle,
  nextSectionDesignOptions,
  className = '',
}: FullWidthImageHeroProps) => {
  const { bg: nextCompBg, dark: nextCompDark } = getBgAndDarkFromBackground(
    nextSectionDesignOptions,
  )

  const ratioToVariant: Record<FullWidthImageHeroVariant, ImageRatioKeys> = {
    narrow: '10:3',
    tall: '5:4',
    default: '2:1',
  }

  const variantClassName: Record<FullWidthImageHeroVariant, string> = {
    narrow: ``,
    tall: `4xl:h-[67vh] h-auto w-full h-[43vh] md:h-[53vh] lg:h-[65vh]`,
    default: ``,
  }

  return (
    <>
      {figure?.image && (
        <Picture
          image={figure.image}
          desktopAspectRatio={ratioToVariant[variant]}
          figCaptionClassName={`${nextCompBg ? nextCompBg : ''} ${nextCompDark ? nextCompDark : ''}`}
          caption={figure?.caption}
          attribution={figure?.attribution}
          className={twMerge(variantClassName[variant], className)}
        />
      )}
      {magazineTags && magazineTags?.length > 0 && (
        <MagazineTagBar tags={magazineTags} className='mt-0' />
      )}
      <Blocks
        //@ts-ignore
        value={title}
        id='mainTitle'
        asOneElementType
        as='h1'
        className={`px-layout-sm py-4 lg:px-layout-lg lg:pt-6 lg:pb-4 ${nextCompBg} ${
          nextCompDark ? nextCompDark : ''
        }`}
      />
      {subTitle && subTitle}
    </>
  )
}
