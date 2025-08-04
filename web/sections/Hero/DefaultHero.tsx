import type { ImageWithCaptionData } from '../../types/index'
import DefaulHeroImage from './DefaultHeroImage'
import { PortableTextBlock } from '@portabletext/types'
import { Heading } from '@/core/Typography'

type Props = {
  title?: PortableTextBlock[]
  image?: ImageWithCaptionData
  isBigTitle?: boolean
  bigTitle?: PortableTextBlock[]
  /* Magazine */
  tags?: string[]
}

export const DefaultHero = ({ title, image, isBigTitle, bigTitle, tags }: Props) => {
  return (
    <>
      {isBigTitle && (
        <>
          <div className="mx-auto max-w-viewport pt-10 pr-16 pb-0 pl-layout-sm">
            {title && <Heading value={title} as="h1" variant="xl" />}
          </div>
          <div className="mx-auto py-10 px-layout-sm max-w-viewport">
            {bigTitle && <Heading value={bigTitle} as="h2" variant="3xl" />}
          </div>
        </>
      )}
      {!isBigTitle && (
        <div className="py-10 px-layout-md">
          {title && <Heading className="max-w-[1186px] mx-auto" value={title} as="h1" variant="3xl" />}
        </div>
      )}
      {tags && tags?.length > 0 && (
        <div className="px-layout-md pb-12">
          {tags && tags?.length > 0 && (
            <ul className="flex flex-wrap gap-y-4 divide-x-2 divide-energy-red-100">
              {tags.map((tag: string) => {
                return (
                  <span
                    key={`magazine_tag_key_${tag}`}
                    className="inline-block text-sm font-medium pl-3 pr-3 first:pl-0 lg:text-xs whitespace-nowrap"
                  >
                    {tag}
                  </span>
                )
              })}
            </ul>
          )}
        </div>
      )}

      {image && <DefaulHeroImage className="pt-0 px-layout-sm pb-16 max-w-viewport mx-auto" data={image} />}
    </>
  )
}
