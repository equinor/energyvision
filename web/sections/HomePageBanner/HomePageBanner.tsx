'use client'
import { forwardRef } from 'react'
import Image, { getSmallerThanPxLgSizes, ImageRatios } from '../../core/SanityImage/SanityImage'
import { useSanityLoader } from '../../sanity/hooks/useSanityLoader'
import { getUrlFromAction } from '../../common/helpers'
import { getArrowElement } from '@/core/Link/ResourceLink'
import { BaseLink } from '@/core/Link'
import { ImageWithAlt, LinkData } from '../../types'
import { PortableTextBlock } from '@portabletext/types'
import { Typography } from '@/core/Typography'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
import Blocks from '@/portableText/Blocks'

export type HomePageBannerThemeColors = {
  background?: string
  foreground?: string
  dark?: boolean
}
//Keep in sync with studio/schemas/objects/homepageBanner/getColorForHomePageBannerTheme
export const getColorForHomepageBannerTheme = (pattern?: number): HomePageBannerThemeColors => {
  switch (pattern) {
    //White
    case 1:
      return {
        background: 'bg-white-100',
        foreground: 'bg-moss-green-60',
      }
    //Blue
    case 2:
      return {
        background: 'bg-mist-blue-100',
        foreground: 'bg-white-100',
      }
    //Green
    case 0:
    default:
      return {
        background: 'bg-moss-green-60',
        foreground: 'bg-white-100',
      }
  }
}

type HomePageBannerProps = {
  title?: PortableTextBlock[]
  image: ImageWithAlt
  ctaCards: {
    id: string
    overline?: string
    link?: LinkData
  }[]
  rightAlignTitle?: boolean
  useWhiteTitle?: boolean
  designOptions: {
    useGradient?: boolean
    theme?: {
      title: string
      value: number
    }
    backgroundType?: number
  }
  anchor?: string
}

export const HomePageBanner = forwardRef<HTMLDivElement, HomePageBannerProps>(function HomePageBanner(
  { anchor, title, rightAlignTitle, useWhiteTitle = false, image, ctaCards, designOptions },
  ref,
) {
  const desktopUrl = useSanityLoader(image, 2560, ImageRatios['16:9'])
  // 4:3 for small screens and 10:3 for large screens
  const { backgroundType, theme, useGradient = false } = designOptions
  const { foreground, background } = getColorForHomepageBannerTheme(theme?.value ?? 0)
  const useImage = backgroundType == 0
  const isMobile = useMediaQuery(`(max-width: 1024px)`)
  let gradient = rightAlignTitle ? 'lg:homepage-banner-white-right-gradient' : 'lg:homepage-banner-white-left-gradient'
  if (useWhiteTitle) {
    gradient = rightAlignTitle ? 'lg:homepage-banner-black-right-gradient' : 'lg:homepage-banner-black-left-gradient'
  }

  const headingElement = (
    <Blocks
      variant="h2"
      //@ts-ignore:todo
      value={title}
      blockClassName={`h-fit w-full px-layout-md text-3xl tracking-tighter text-pretty backdrop-blur-[1.1px] max-lg:pt-6 lg:px-0 lg:text-4xl ${rightAlignTitle ? 'lg:mr-20 lg:ml-auto' : 'lg:mr-auto lg:ml-20'} ${useWhiteTitle ? 'text-white-100' : ''} ${useImage ? 'lg:z-10' : ''} max-w-text`}
    />
  )

  return (
    <div ref={ref} id={anchor} className={`relative ${!useImage ? background : ''}`}>
      {useImage && (
        <picture className={`relative inset-0 flex h-auto w-full max-lg:aspect-video lg:absolute`}>
          {useGradient && <div className={`absolute inset-0 z-[1] ${useGradient ? gradient : ''}`} />}
          <source srcSet={desktopUrl?.src} media="(min-width: 1024px)" />
          <Image maxWidth={810} sizes={getSmallerThanPxLgSizes()} aspectRatio={'16:9'} image={image} fill priority />
        </picture>
      )}
      <div
        className={`pl-sm mx-auto grid grid-cols-1 grid-rows-[max-content_min-content] gap-4 lg:gap-12 lg:px-layout-sm ${useImage ? '-mt-12 lg:pt-40' : 'pt-16'} pb-2 lg:pt-32 lg:pb-14`}
      >
        {title && ((useImage && !isMobile) || !useImage) && headingElement}
        {ctaCards?.length && (
          <ul className={`flex w-full snap-x gap-4 overflow-x-auto ${useImage ? 'z-10' : ''}`}>
            {ctaCards?.map((ctaCard) => {
              const { id, link, overline } = ctaCard
              if (!link) return null
              const url = getUrlFromAction(link)
              if (!url) return null
              return (
                <li key={id} className="m-1">
                  <BaseLink
                    className={`max-w-[400px] min-w-[260px] ${foreground} group flex h-full flex-col gap-2 rounded-md px-4 py-6 shadow-card active:shadow-card-interact`}
                    type={link?.type}
                    href={url}
                  >
                    {overline && (
                      <Typography variant="eyebrow" className="mb-1 h-max normal-case">
                        {overline}
                      </Typography>
                    )}
                    <div className="mb-2 h-max w-4/5 text-md group-hover:underline">{link.label}</div>
                    <div className="mt-auto flex justify-start">
                      {getArrowElement(link.type ?? 'internalUrl', '', 'ml-0 xl:ml-0')}
                    </div>
                  </BaseLink>
                </li>
              )
            })}
          </ul>
        )}
        {title && useImage && isMobile && headingElement}
      </div>
    </div>
  )
})
