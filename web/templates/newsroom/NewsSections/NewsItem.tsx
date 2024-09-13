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
const NewsItem = forwardRef<HTMLLIElement, NewsListItemProps>(function NewsItem(
  { data, fallbackImage, className = '', ...rest },
  ref,
) {
  const { slug, pageTitle, publishDateTime, heroImage } = data || {}

  return (
    <section ref={ref} className={envisTwMerge('', className)} {...rest}>
      <BaseLink href={slug} className="group flex justify-between gap-4 lg:gap-6">
        <div className="max-w-[65%]">
          {publishDateTime && (
            <FormattedDate datetime={publishDateTime} uppercase className="text-xs font-normal leading-normal pb-1" />
          )}
          {pageTitle && (
            <Typography as="h2" variant="base" className="max-w-text text-pretty group-hover:underline">
              {pageTitle}
            </Typography>
          )}
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
