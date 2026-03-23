'use client'
import { mapSanityImageRatio } from '@core/SanityImage/SanityImage'
import { Heading, type TypographyVariants } from '@core/Typography'
import type { PortableTextBlock } from '@portabletext/types'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
import type { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { getLayoutPx } from '../../common/helpers/getCommonUtillities'
import { useSanityLoader } from '../../lib/hooks/useSanityLoader'
import type { ImageWithAlt, ImageWithCaptionData } from '../../types'

type TextOnBackgroundImageHeroProps = {
  figure?: ImageWithCaptionData
  heroMobileImage?: ImageWithAlt
  title: PortableTextBlock[]
  background?: string
  backgroundGradient?: 'none' | 'dark' | 'light'
  layoutGrid?: 'sm' | 'md' | 'lg'
  useBrandTheme?: boolean
  useBlurCenter?: boolean
  displayTextVariant?: 'none' | 'base' | 'lg' | 'xl'
} & HTMLAttributes<HTMLElement>

export const TextOnBackgroundImageHero = ({
  figure,
  title,
  backgroundGradient,
  className = '',
  useBrandTheme = false,
  displayTextVariant = 'none',
  layoutGrid = 'lg',
  useBlurCenter,
  heroMobileImage,
}: TextOnBackgroundImageHeroProps) => {
  //@ts-ignore:todo
  const imageProps = useSanityLoader(figure?.image, 2560, mapSanityImageRatio('10:3'))
  //@ts-ignore:todo
  const mobileImageProps = useSanityLoader(heroMobileImage, 2560, mapSanityImageRatio('10:3'))
  const isMobile = useMediaQuery(`(max-width: 800px)`)
  const url = isMobile && mobileImageProps?.src ? mobileImageProps?.src : imageProps?.src

  const px = getLayoutPx(layoutGrid ?? 'lg')

  const typographyVariant = {
    base: 'h2_base',
    lg: 'h2_lg',
    xl: 'h2_xl',
  }

  return (
    <div
      className={twMerge(
        `relative flex items-center lg:min-h-[28vh] ${backgroundGradient === 'dark' ? 'dark' : ''} ${
          figure && imageProps?.src ? 'bg-center bg-cover bg-no-repeat' : ''
        } ${px}`,
        className,
      )}
      {...(url && {
        style: {
          backgroundImage: `url(${url})`,
        },
      })}
    >
      <div
        className={`flex max-w-text flex-col justify-center pt-12 pb-40 md:pt-20 md:pb-26 ${
          useBrandTheme ? '*:text-energy-red-100' : ''
        }`}
      >
        <Heading
          value={title}
          id="mainTitle"
          as="h1"
          group={displayTextVariant !== 'none' ? 'display' : `heading`}
          variant={displayTextVariant !== 'none' ? (typographyVariant[displayTextVariant] as TypographyVariants) : `h1`}
          className={`z-10 w-fit max-w-prose pb-0`}
        />
      </div>
      {useBlurCenter && <div className={`centerBlur absolute inset-0 z-1`}></div>}
      {(backgroundGradient === 'dark' || backgroundGradient === 'light') && (
        <div
          className={`absolute inset-0 z-0 ${backgroundGradient === 'dark' ? 'bg-slate-80/20' : 'bg-white-100/20'}`}
        />
      )}
    </div>
  )
}
