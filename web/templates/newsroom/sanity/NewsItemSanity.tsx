import { FormattedDate } from '@components/FormattedDateTime'
import { forwardRef, HTMLAttributes } from 'react'
import { BaseLink } from '@core/Link'
import { Typography } from '@core/Typography'
import Image, { Ratios } from '../../../pageComponents/shared/SanityImage'
import envisTwMerge from '../../../twMerge'
import { NewsRoomNewsItem } from '../../../types/algoliaIndexPage'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'

export type NewsListItemProps = {
  data: NewsRoomNewsItem
  fallbackImage?: SanityImageObject
} & HTMLAttributes<HTMLLIElement>

/* Not a semantic list even tho name implies it, used as other news pages with sections */
const NewsItemSanity = forwardRef<HTMLLIElement, NewsListItemProps>(function NewsItemSanity(
  { data, fallbackImage, className = '', ...rest },
  ref,
) {
  const { slug, title, publishDateTime, heroImage, thumbnailUrl, tags, countryTags } = data || {}

  return (
    <section ref={ref} className={envisTwMerge('md:border-b md:border-grey-30', className)} {...rest}>
      <BaseLink
        href={slug}
        className="h-full group flex flex-col-reverse md:grid md:grid-cols-[60%_30%] md:justify-between gap-4 lg:gap-6"
      >
        <div className="flex flex-col py-2 md:py-6">
          {publishDateTime && (
            <FormattedDate datetime={publishDateTime} uppercase className="text-2xs font-normal leading-normal pb-1" />
          )}
          {title && (
            <Typography as="h2" variant="base" className="text-base pb-6  max-w-text text-pretty group-hover:underline">
              {title}
            </Typography>
          )}
          <div className="pb-4 flex flex-wrap gap-y-4 text-xs divide-x-2 divide-energy-red-100">
            {tags?.map((tag: any, i: number) => {
              return (
                <span key={tag?.label} className={`inline-block text-grey-70 pl-3 pr-3 first:pl-0 whitespace-nowrap`}>
                  {tag?.label}
                  {i < tags.length - 1 && <span className="sr-only">,</span>}
                </span>
              )
            })}
            {countryTags?.length > 0 && <span className="sr-only">,</span>}
            {countryTags?.map((country: any, i: number) => {
              return (
                <span key={country?.label} className="inline-block text-grey-70 pl-3 pr-3 first:pl-0 whitespace-nowrap">
                  {country?.label}
                  {i < countryTags.length - 1 && <span className="sr-only">,</span>}
                </span>
              )
            })}
          </div>
        </div>
        <div className="w-full max-md:max-h-[212px] h-full aspect-video md:aspect-auto relative object-cover">
          {(heroImage?.image?.asset || fallbackImage || thumbnailUrl) && (
            <>
              {thumbnailUrl ? (
                <img
                  className="relative rounded-xs"
                  src={thumbnailUrl}
                  alt=""
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 800px) 100vw, 800px"
                  role={'presentation'}
                />
              ) : (
                (heroImage?.image?.asset || fallbackImage) && (
                  <Image
                    //@ts-ignore: TODO Fix SanityImage to take SanityImageObject
                    image={heroImage?.image?.asset ? heroImage?.image : fallbackImage}
                    aria-hidden
                    aspectRatio={Ratios.NINE_TO_SIXTEEN}
                    sizes="(max-width: 800px) 100vw, 800px"
                    fill
                    className="rounded-xs"
                  />
                )
              )}
            </>
          )}
        </div>
      </BaseLink>
    </section>
  )
})
export default NewsItemSanity
