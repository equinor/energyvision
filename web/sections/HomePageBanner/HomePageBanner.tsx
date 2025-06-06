import { forwardRef } from 'react'
import Image, { Ratios } from '../../pageComponents/shared/SanityImage'
import { useSanityLoader } from '../../lib/hooks/useSanityLoader'
import { getUrlFromAction } from '../../common/helpers'
import { getArrowElement } from '@core/Link/ResourceLink'
import { BaseLink } from '@core/Link'
import { ImageWithAlt } from '../../types'
import { PortableTextBlock } from '@portabletext/types'
import { Heading } from '@core/Typography'

/* type HomePageBanner = {
  title?: PortableTextBlock[]
  image: ImageWithAlt
  attribution: string
  ctaCards: any[]
  colorBackground?: ColorSelectorValue
} */

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
  attribution: string
  ctaCards: any[]
  designOptions: {
    colorTheme?: {
      title: string
      value: number
    }
    backgroundType?: number
  }
  anchor?: string
}

export const HomePageBanner = forwardRef<HTMLDivElement, HomePageBannerProps>(function HomePageBanner(
  { anchor, title, image, attribution, ctaCards, designOptions },
  ref,
) {
  const desktopUrl = useSanityLoader(image, 2560, Ratios.ONE_TO_TWO)
  const { backgroundType, colorTheme } = designOptions
  const { foreground, background } = getColorForHomepageBannerTheme(colorTheme?.value ?? 0)
  const useImage = backgroundType == 1
  console.log('backgroundType', backgroundType)
  console.log('useImage', useImage)

  return (
    <div ref={ref} id={anchor} className={`relative px-layout-md ${!useImage ? background : ''}`}>
      {useImage && (
        <picture className="absolute inset-0">
          <source srcSet={desktopUrl?.src} media="(min-width: 1250px)" />
          <Image maxWidth={810} aspectRatio={3.33} image={image} sizes="100vw" fill priority className="" />
        </picture>
      )}
      <div className="grid grid-cols-1 grid-rows-[max-content_min-content] gap-0 lg:gap-12 pt-16 lg:pt-32 pb-20 max-w-viewport">
        {title && (
          <Heading
            as="h1"
            variant="h1"
            value={title}
            className={`
            text-4xl
            tracking-tighter
            text-balance
            [text-shadow:rgba(255,255,255,0.45)_1px_0px_1px]
            ${useImage ? 'z-10' : ''} 
            lg:ml-20
            max-w-text
            `}
          />
        )}
        {ctaCards?.length && (
          <ul className={`flex flex-col lg:flex-row gap-4 ${useImage ? 'z-10' : ''}`}>
            {ctaCards?.map((ctaCard) => {
              const { id, link, overline } = ctaCard
              const url = getUrlFromAction(link)
              return (
                <li key={id}>
                  <BaseLink
                    className={`${foreground} group h-full lg:max-w-[30vw] rounded-md px-4 py-6 flex flex-col gap-2`}
                    type={link?.type}
                    href={url}
                  >
                    {overline && <div className="text-xs font-medium h-max mb-1">{overline}</div>}
                    <div className="group-hover:underline text-md max-w-[310px] h-max mb-2">{link.label}</div>
                    <div className="mt-auto flex justify-start">{getArrowElement(link?.type, '', 'ml-0 xl:ml-0')}</div>
                  </BaseLink>
                </li>
              )
            })}
          </ul>
        )}
      </div>
      {useImage && attribution && <div>{attribution}</div>}
    </div>
  )
})
