import { forwardRef } from 'react'
import Image, { Ratios } from '../../pageComponents/shared/SanityImage'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import { useSanityLoader } from '../../lib/hooks/useSanityLoader'
import { getUrlFromAction } from '../../common/helpers'
import { getArrowElement } from '@core/Link/ResourceLink'
import { BaseLink } from '@core/Link'

type HomepageBanner = {
  title?: PortableTextBlock[]
  image: ImageWithAlt
  attribution: string
  ctaCards: any[]
  colorBackground?: ColorSelectorValue
}

type HomepageBannerProps = {
  anchor?: string
} & HomepageBanner

const HomepageBanner = forwardRef<HTMLDivElement, HomepageBannerProps>(function HomepageBanner(
  { anchor, title, image, attribution, ctaCards, colorBackground },
  ref,
) {
  console.log('image', image)
  const desktopUrl = useSanityLoader(image?.image, 2560, Ratios.THREE_TO_TEN)

  return (
    <div ref={ref} id={anchor} className={`relative`}>
      <div className="grid grid-cols-1 grid-rows-2 gap-40">
        {title && <Blocks value={title} />}
        {ctaCards?.length && (
          <ul className="flex flex-col lg:flex-row gap-2">
            {ctaCards?.map((ctaCard) => {
              const { id, link, overline } = ctaCard
              const url = getUrlFromAction(link)
              return (
                <li key={id}>
                  <BaseLink
                    className="bg-white-100 rounded-md px-4 py-6 grid grid-cols-[20%_auto_min-content] gap-2"
                    type={link?.type}
                    href={url}
                  >
                    {overline && <div>{overline}</div>}
                    <div>{link.label}</div>
                    <div>{getArrowElement(link?.type)}</div>
                  </BaseLink>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <div className="absolute inset-0 -z-1">
        <picture>
          <source srcSet={desktopUrl?.src} media="(min-width: 750px)" />
          <Image maxWidth={1024} aspectRatio={Ratios.THREE_TO_FOUR} image={image?.image} sizes="100vw" priority />
        </picture>
      </div>
      {attribution && <div>{attribution}</div>}
    </div>
  )
})

export default HomepageBanner
