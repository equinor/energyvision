import { forwardRef } from 'react'
import Image, { Ratios } from '../../pageComponents/shared/SanityImage'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import { useSanityLoader } from '../../lib/hooks/useSanityLoader'
import { getUrlFromAction } from '../../common/helpers'
import { getArrowElement } from '@core/Link/ResourceLink'
import { BaseLink } from '@core/Link'
import { ImageBackground } from '../../types'
import { PortableTextBlock } from '@portabletext/types'
import { Heading } from '@core/Typography'

/* type HomePageBanner = {
  title?: PortableTextBlock[]
  image: ImageWithAlt
  attribution: string
  ctaCards: any[]
  colorBackground?: ColorSelectorValue
} */

type HomePageBannerProps = {
  title?: PortableTextBlock[]
  image: ImageBackground
  attribution: string
  ctaCards: any[]
  colorBackground?: ColorSelectorValue
  anchor?: string
}

export const HomePageBanner = forwardRef<HTMLDivElement, HomePageBannerProps>(function HomePageBanner(
  { anchor, title, image, attribution, ctaCards, colorBackground },
  ref,
) {
  const desktopUrl = useSanityLoader(image?.image, 2560, Ratios.ONE_TO_TWO)
  console.log('image', image)
  return (
    <div ref={ref} id={anchor} className={`relative px-layout-md`}>
      <picture className="absolute inset-0">
        <source srcSet={desktopUrl?.src} media="(min-width: 1250px)" />
        <Image maxWidth={810} aspectRatio={3.33} image={image?.image} sizes="100vw" fill priority className="" />
      </picture>
      <div className="grid grid-cols-1 grid-rows-[max-content_min-content] gap-12 pt-44 pb-16 max-w-viewport">
        {title && (
          <Heading
            as="h1"
            variant="h2"
            value={title}
            className="[text-shadow:rgba(255,255,255,0.45)_1px_0px_1px] text-balance z-10 mx-4 max-w-text"
          />
        )}
        {ctaCards?.length && (
          <ul className="flex flex-col lg:flex-row gap-4 z-10">
            {ctaCards?.map((ctaCard) => {
              const { id, link, overline } = ctaCard
              const url = getUrlFromAction(link)
              return (
                <li key={id}>
                  <BaseLink
                    className="group h-full bg-white-100 lg:max-w-[30vw] rounded-md px-4 py-6 flex flex-col gap-2"
                    type={link?.type}
                    href={url}
                  >
                    {overline && <div className="text-xs font-medium h-max mb-1">{overline}</div>}
                    <div className="group-hover:underline text-md max-w-[310px] h-max mb-2">{link.label}</div>
                    <div className="mt-auto flex justify-start">{getArrowElement(link?.type, 'xl:ml-0', 'xl:m-0')}</div>
                  </BaseLink>
                </li>
              )
            })}
          </ul>
        )}
      </div>
      {attribution && <div>{attribution}</div>}
    </div>
  )
})
