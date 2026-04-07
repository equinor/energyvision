'use client'
import type { PortableTextBlock } from 'next-sanity'
import type { HTMLAttributes } from 'react'
import {
  type Figure,
  type Image,
  mapSanityImageRatio,
} from '@/core/Image/Image'
import type { TypographyVariants } from '@/core/Typography'
import { getLayoutPx } from '@/lib/helpers/getCommonUtilities'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import { twMerge } from '@/lib/twMerge/twMerge'
import Blocks from '@/portableText/Blocks'
import { resolveImage } from '@/sanity/lib/utils'

export type TextOnBackgroundImageHeroProps = {
  figure?: Figure
  ingress?: PortableTextBlock[]
  isMagazineRoom?: boolean
  useBrandTheme?: boolean
  useBlurCenter?: boolean
  heroMobileImage?: Image
  backgroundGradient?: 'none' | 'light' | 'dark'
  displayTextVariant?: 'none' | 'base' | 'lg' | 'xl'
  layoutGrid?: 'sm' | 'md' | 'lg'
  alignContentY?: 'top' | 'center' | 'bottom'
} & HTMLAttributes<HTMLElement>

/**
 * Hero type to show either a background image or white background
 * with text over it
 */
export const TextOnBackgroundImageHero = ({
  figure,
  title,
  ingress,
  backgroundGradient,
  isMagazineRoom = false,
  className = '',
  useBrandTheme = false,
  displayTextVariant = 'none',
  layoutGrid = 'lg',
  useBlurCenter,
  heroMobileImage,
  alignContentY = 'center',
}: TextOnBackgroundImageHeroProps) => {
  const { image } = figure || {}

  const isLargerDisplays = useMediaQuery(`(min-width: 800px)`)

  const { url: imageUrl } = resolveImage({
    image,
    aspectRatio: mapSanityImageRatio('10:3'),
    grid: 'full',
    isLargerDisplays,
    useFitMax: true,
  })
  const { url: mobileImageUrl } = resolveImage({
    image: heroMobileImage,
    aspectRatio: mapSanityImageRatio('10:3'),
    grid: 'xs',
    isLargerDisplays,
  })
  const isMobile = useMediaQuery(`(max-width: 800px)`)
  const url = isMobile && mobileImageUrl ? mobileImageUrl : imageUrl

  const typographyVariant = {
    base: 'h2_base',
    lg: 'h2_lg',
    xl: 'h2_xl',
  }

  const contentAligment = {
    top: 'items-start',
    center: 'items-center',
    bottom: 'items-end',
  }

  const ingressElement = ingress && <Blocks value={ingress} variant='body' />
  const titleElement = title && (
    <Blocks
      value={title}
      id='mainTitle'
      group={displayTextVariant !== 'none' ? 'display' : `heading`}
      variant={
        displayTextVariant !== 'none'
          ? (typographyVariant[displayTextVariant] as TypographyVariants)
          : `h1`
      }
      blockClassName={`${isMagazineRoom && ingress ? '' : 'my-0 lg:my-0'}`}
    />
  )

  const px = getLayoutPx(layoutGrid ?? 'lg')

  return (
    <div
      className={twMerge(
        `relative flex py-12 ${contentAligment[alignContentY ?? 'center']} lg:min-h-[clamp(350px,35vh,40vh)] ${
          backgroundGradient === 'dark' ? 'dark' : ''
        } ${figure && imageUrl ? 'bg-center bg-cover bg-no-repeat' : ''} ${px}`,
        className,
      )}
      {...(url && {
        style: {
          backgroundImage: `url(${url})`,
        },
      })}
    >
      <div
        className={`flex max-w-text flex-col ${useBrandTheme ? '*:text-energy-red-100' : ''}`}
      >
        {titleElement}
        {isMagazineRoom && ingressElement}
      </div>
      {useBlurCenter && (
        <div className={`centerBlur absolute inset-0 z-1`}></div>
      )}
      {(backgroundGradient === 'dark' || backgroundGradient === 'light') && (
        <div
          className={`absolute inset-0 z-0 ${backgroundGradient === 'dark' ? 'bg-slate-80/20' : 'bg-white-100/20'}`}
        />
      )}
    </div>
  )
}
