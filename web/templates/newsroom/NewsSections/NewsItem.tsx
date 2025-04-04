import { FormattedDate, FormattedTime } from '@core/FormattedDateTime'
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
  const { slug, title, publishDateTime, heroImage, thumbnailUrl } = data || {}
  if (!slug) return null

  return (
    <section ref={ref} className={envisTwMerge('', className)} {...rest}>
      <BaseLink href={slug} className="group flex justify-between gap-4 lg:gap-6">
        <div className="max-w-[65%]">
          {publishDateTime && (
            <div>
              <FormattedDate
                datetime={publishDateTime}
                uppercase
                className="text-2xs font-normal leading-normal pb-1"
              />
              <span className="mx-2 text-2xs font-normal leading-normal pb-1">|</span>
              <FormattedTime
                small
                timezone
                datetime={publishDateTime}
                className="text-2xs font-normal leading-normal pb-1"
              />
            </div>
          )}
          {title && (
            <Typography as="h2" variant="base" className="max-w-text text-pretty group-hover:underline">
              {title}
            </Typography>
          )}
        </div>
        <div className="w-[30%] lg:h-full aspect-5/4 lg:aspect-video relative">
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
export default NewsItem
