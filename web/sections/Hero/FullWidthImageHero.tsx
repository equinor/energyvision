'use client'
import type { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { Image, type ImageRatioKeys } from '@/core/Image/Image'
import Blocks from '@/portableText/Blocks'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import type { DesignOptions } from '@/types'
import type { HeroData } from './HeroBlock'

type FullWidthImageHeroVariant = 'default' | 'tall' | 'narrow'

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
    narrow: `aspect-4/3 lg:aspect-10/3`,
    tall: `4xl:h-[67dvh] h-auto w-full max-md:aspect-4/3 md:h-[53dvh] lg:h-[65dvh]`,
    default: ``,
  }

  return (
    <>
      {figure?.image && (
        <Image
          image={figure.image}
          aspectRatio={ratioToVariant[variant]}
          grid='full'
          figCaptionBackground={nextCompBg}
          figCaptionClassName={`${nextCompDark ? nextCompDark : ''}`}
          caption={figure?.caption}
          attribution={figure?.attribution}
          imageClassName={twMerge(variantClassName[variant], className)}
        />
      )}
      <Blocks
        //@ts-ignore
        value={title}
        id='mainTitle'
        variant='h1'
        blockClassName={`px-layout-lg ${nextCompBg} ${nextCompDark ? nextCompDark : ''}`}
      />
    </>
  )
}
