'use client'
import type { PortableTextBlock } from '@portabletext/types'
import { forwardRef } from 'react'
import {
  getObjectPositionForImage,
  Image,
  type ObjectPositions,
} from '@/core/Image/Image'
import { BaseLink } from '@/core/Link'
import { getArrowElement } from '@/core/Link/ResourceLink'
import { Typography } from '@/core/Typography'
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import Blocks from '@/portableText/Blocks'
import type { ImageWithAlt, LinkData } from '@/types'

export type HomePageBannerThemeColors = {
  background?: string
  foreground?: string
  dark?: boolean
}
//Keep in sync with studio/schemas/objects/homepageBanner/getColorForHomePageBannerTheme
export const getColorForHomepageBannerTheme = (
  pattern?: number,
): HomePageBannerThemeColors => {
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
    backgroundPosition?: ObjectPositions
    theme?: {
      title: string
      value: number
    }
    backgroundType?: number
  }
  anchor?: string
}

export const HomePageBanner = forwardRef<HTMLDivElement, HomePageBannerProps>(
  function HomePageBanner(
    {
      anchor,
      title,
      rightAlignTitle,
      useWhiteTitle = false,
      image,
      ctaCards,
      designOptions,
    },
    ref,
  ) {
    const {
      backgroundType,
      theme,
      useGradient = false,
      backgroundPosition,
    } = designOptions
    const { foreground, background } = getColorForHomepageBannerTheme(
      theme?.value ?? 0,
    )
    const useImage = String(backgroundType) === String(0)

    const isMobile = useMediaQuery(`(max-width: 1024px)`)
    let gradient = rightAlignTitle
      ? 'lg:homepage-banner-white-right-gradient'
      : 'lg:homepage-banner-white-left-gradient'
    if (useWhiteTitle) {
      gradient = rightAlignTitle
        ? 'lg:homepage-banner-black-right-gradient'
        : 'lg:homepage-banner-black-left-gradient'
    }

    const headingElement = (
      <Blocks
        variant='h2'
        //@ts-ignore:todo
        value={title}
        blockClassName={`h-fit w-full px-layout-md text-3xl tracking-tighter text-pretty backdrop-blur-[1.1px] max-lg:pt-6 lg:px-0 lg:text-4xl ${rightAlignTitle ? 'lg:mr-20 lg:ml-auto' : 'lg:mr-auto lg:ml-20'} ${useWhiteTitle ? 'text-white-100' : ''} ${useImage ? 'lg:z-10' : ''} max-w-text`}
      />
    )

    return (
      <div
        ref={ref}
        id={anchor}
        className={`relative ${!useImage ? background : ''}`}
      >
        {useImage && (
          <picture
            className={`absolute inset-0 flex h-auto w-full max-lg:aspect-video`}
          >
            {useGradient && (
              <div
                className={`absolute inset-0 z-1 ${useGradient ? gradient : ''}`}
              />
            )}
            <Image
              grid='full'
              loading='eager'
              image={image}
              fill
              imageClassName={`${getObjectPositionForImage(backgroundPosition ?? 'center_center')}`}
            />
          </picture>
        )}
        <div
          className={`mx-auto grid grid-cols-1 grid-rows-[max-content_min-content] gap-4 pl-sm lg:gap-12 lg:px-layout-sm ${useImage ? '-mt-12 lg:pt-40' : 'pt-16'} pb-2 lg:pt-32 lg:pb-14`}
        >
          {title && ((useImage && !isMobile) || !useImage) && headingElement}
          {ctaCards?.length && (
            <ul
              className={`flex w-full snap-x gap-4 overflow-x-auto ${useImage ? 'z-10' : ''}`}
            >
              {ctaCards?.map(ctaCard => {
                const { id, link, overline } = ctaCard
                if (!link) return null
                const url = getUrlFromAction(link)
                if (!url) return null
                return (
                  <li key={id} className='m-1'>
                    <BaseLink
                      className={`min-w-[260px] max-w-[400px] ${foreground} group flex h-full flex-col gap-2 rounded-md px-4 py-6 shadow-card active:shadow-card-interact`}
                      type={link?.type}
                      href={url}
                    >
                      {overline && (
                        <Typography
                          variant='eyebrow'
                          className='mb-1 h-max normal-case'
                        >
                          {overline}
                        </Typography>
                      )}
                      <div className='mb-2 h-max w-4/5 text-md group-hover:underline'>
                        {link.label}
                      </div>
                      <div className='mt-auto flex justify-start'>
                        {getArrowElement(
                          link.type ?? 'internalUrl',
                          '',
                          'ml-0 xl:ml-0',
                        )}
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
  },
)
