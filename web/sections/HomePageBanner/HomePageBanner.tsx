import { forwardRef } from 'react'
import Image, { getSmallerThanPxLgSizes, ImageRatios } from '../../core/SanityImage/SanityImage'
import { useSanityLoader } from '../../lib/hooks/useSanityLoader'
import { getUrlFromAction } from '../../common/helpers'
import { getArrowElement } from '@core/Link/ResourceLink'
import { BaseLink } from '@core/Link'
import { ImageWithAlt, LinkData } from '../../types'
import { PortableTextBlock } from '@portabletext/types'
import { Heading } from '@core/Typography'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'

export type HomePageBannerThemeColors = {
  background?: string
  foreground?: string
  dark?: boolean
}
//Keep in sync with sanityv3/schemas/objects/homepageBanner/getColorForHomePageBannerTheme
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
    <Heading
      as="h1"
      variant="h1"
      //@ts-ignore: TYPE
      value={title}
      className={`
        max-lg:pt-6
        px-layout-sm
        lg:px-0
        w-full
        h-fit
        text-3xl
        lg:text-4xl
        tracking-tighter
        text-pretty
        backdrop-blur-[1.1px]
        ${rightAlignTitle ? 'lg:ml-auto lg:mr-20' : 'lg:mr-auto lg:ml-20'}
          ${useWhiteTitle ? 'text-white-100' : ''}
        ${useImage ? 'lg:z-10' : ''} 
        max-w-text
            `}
    />
  )

  return (
    <div ref={ref} id={anchor} className={`relative ${!useImage ? background : ''}`}>
      {useImage && (
        <picture className={`relative flex w-full h-auto max-lg:aspect-video lg:absolute inset-0`}>
          {useGradient && <div className={`z-[1] absolute inset-0 ${useGradient ? gradient : ''}`} />}
          <source srcSet={desktopUrl?.src} media="(min-width: 1024px)" />
          <Image maxWidth={810} sizes={getSmallerThanPxLgSizes()} aspectRatio={'16:9'} image={image} fill priority />
        </picture>
      )}
      <div
        className={`
          mx-auto
          pl-sm 
          lg:px-layout-sm
          grid 
          grid-cols-1
          grid-rows-[max-content_min-content] 
          gap-4 
          lg:gap-12
          ${useImage ? '-mt-12 lg:pt-40 ' : 'pt-16'} 
          lg:pt-32 
          pb-2
          lg:pb-14 
          max-w-viewport`}
      >
        {title && ((useImage && !isMobile) || !useImage) && headingElement}
        {ctaCards?.length && (
          <ul className={`w-full flex overflow-x-auto snap-x gap-4 ${useImage ? 'z-10' : ''}`}>
            {ctaCards?.map((ctaCard) => {
              const { id, link, overline } = ctaCard
              if (!link) return null
              const url = getUrlFromAction(link)
              if (!url) return null
              return (
                <li key={id} className="m-1">
                  <BaseLink
                    className={`min-w-[260px] max-w-[400px] ${foreground} shadow-card active:shadow-card-interact group h-full rounded-md px-4 py-6 flex flex-col gap-2`}
                    type={link?.type}
                    href={url}
                  >
                    {overline && <div className="text-xs font-medium h-max mb-1">{overline}</div>}
                    <div className="group-hover:underline text-md w-4/5 h-max mb-2">{link.label}</div>
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
