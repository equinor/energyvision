import { forwardRef, HTMLAttributes } from 'react'
import { BaseLink } from '@/core/Link'
import { Typography } from '@/core/Typography'
import NextImage from 'next/image'
import { getSmallerThanPxLgSizes, Image } from '@/core/Image/Image'
import { NewsRoomNewsItem } from '@/types/algoliaIndexPage'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import FormattedDateTime from '@/core/FormattedDateTime/FormattedDateTime'

export type NewsListItemProps = {
  data: NewsRoomNewsItem
  fallbackImage?: SanityImageObject
} & HTMLAttributes<HTMLLIElement>

/* Not a semantic list even tho name implies it, used as other news pages with sections */
const NewsItem = forwardRef<HTMLLIElement, NewsListItemProps>(function NewsItem(
  { data, fallbackImage, className = '' },
  ref,
) {
  const { slug, title, publishDateTime, heroImage, thumbnailUrl } = data || {}
  if (!slug) return null

  return (
    <section ref={ref} className={className}>
      <BaseLink href={slug} className="group flex justify-between gap-4 lg:gap-6">
        <div className="max-w-[65%]">
          {publishDateTime && (
            <div>
              <FormattedDateTime
                variant="date"
                datetime={publishDateTime}
                uppercase
                className="pb-1 text-2xs leading-normal font-normal"
              />
              <span className="mx-2 pb-1 text-2xs leading-normal font-normal">|</span>
              <FormattedDateTime
                variant="time"
                datetime={publishDateTime}
                className="pb-1 text-2xs leading-normal font-normal"
              />
            </div>
          )}
          {title && (
            <Typography as="h2" variant="base" className="max-w-text text-pretty group-hover:underline">
              {title}
            </Typography>
          )}
        </div>
        <div className="relative aspect-5/4 w-[30%] lg:aspect-video lg:h-full">
          {(heroImage?.image?.asset || fallbackImage || thumbnailUrl) && (
            <>
              {thumbnailUrl ? (
                <NextImage
                  className="relative rounded-2xs object-cover"
                  src={thumbnailUrl}
                  alt=""
                  sizes={getSmallerThanPxLgSizes()}
                  role={'presentation'}
                />
              ) : (
                (heroImage?.image?.asset || fallbackImage) && (
                  <Image
                    //@ts-ignore: TODO Fix SanityImage to take SanityImageObject
                    image={heroImage?.image?.asset ? heroImage?.image : fallbackImage}
                    aria-hidden
                    grid="lg"
                    fill
                    className="rounded-2xs"
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
export default NewsItem
