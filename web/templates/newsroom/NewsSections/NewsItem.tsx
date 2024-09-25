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
  search?: any
} & HTMLAttributes<HTMLLIElement>

/* Not a semantic list even tho name implies it, used as other news pages with sections */
const NewsItem = forwardRef<HTMLLIElement, NewsListItemProps>(function NewsItem(
  { data, fallbackImage, search, className = '', ...rest },
  ref,
) {
  const { slug, title, publishDateTime, heroImage, tags, countryTags } = data || {}

  return (
    <section ref={ref} className={envisTwMerge('', className)} {...rest}>
      <BaseLink href={slug} className="group flex justify-between gap-4 lg:gap-6">
        <div className=" max-w-[65%]">
          {publishDateTime && (
            <FormattedDate datetime={publishDateTime} uppercase className="text-2xs font-normal leading-normal pb-1" />
          )}
          {title && (
            <Typography as="h2" variant="base" className="max-w-text text-pretty group-hover:underline">
              {title}
            </Typography>
          )}
          <div className="pt-4 flex gap-3 text-xs">
            {tags?.map((tag: any, i: number) => {
              const isInSearch = search?.topic?.some((tTag: any) => tTag === tag?.label)
              return (
                <span
                  key={tag?.label}
                  className={` ${isInSearch ? 'text-norwegian-woods-100 font-medium' : 'text-grey-60'}`}
                >
                  {tag?.label}
                  {i < tags.length - 1 && <span className="sr-only">,</span>}
                </span>
              )
            })}
            {countryTags?.length > 0 && <span className="sr-only">,</span>}
            {countryTags?.map((country: any, i: number) => {
              const isInSearch = search?.country?.some((cTag: any) => cTag === country?.label)
              return (
                <span
                  key={country?.label}
                  className={`${isInSearch ? 'text-norwegian-woods-100 font-medium' : 'text-grey-60'}`}
                >
                  {country?.label}
                  {i < countryTags.length - 1 && <span className="sr-only">,</span>}
                </span>
              )
            })}
          </div>
        </div>
        <div className="w-[30%] lg:h-full aspect-5/4 lg:aspect-video relative">
          {(heroImage?.image?.asset || fallbackImage) && (
            <Image
              //@ts-ignore: TODO Fix SanityImage to take SanityImageObject
              image={heroImage?.image?.asset ? heroImage?.image : fallbackImage}
              aria-hidden
              aspectRatio={Ratios.NINE_TO_SIXTEEN}
              sizes="(max-width: 800px) 100vw, 800px"
              fill
              className="rounded-xs"
            />
          )}
        </div>
      </BaseLink>
    </section>
  )
})
export default NewsItem
