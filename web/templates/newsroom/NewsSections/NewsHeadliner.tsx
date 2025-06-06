import { FormattedDate, FormattedTime } from '@core/FormattedDateTime'
import { forwardRef, HTMLAttributes } from 'react'
import { BaseLink } from '@core/Link'
import { Typography } from '@core/Typography'
import Image, { Ratios } from '../../../pageComponents/shared/SanityImage'
import envisTwMerge from '../../../twMerge'
import { NewsRoomNewsItem } from '../../../types/algoliaIndexPage'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import Blocks from '../../../pageComponents/shared/portableText/Blocks'

export type NewsHeadlinerProps = {
  data: NewsRoomNewsItem
  fallbackImage?: SanityImageObject
} & HTMLAttributes<HTMLLIElement>

const NewsHeadliner = forwardRef<HTMLLIElement, NewsHeadlinerProps>(function NewsHeadliner(
  { data, fallbackImage, className = '', ...rest },
  ref,
) {
  const { slug, title, ingress, publishDateTime, heroImage, thumbnailUrl } = data

  return (
    <section ref={ref} {...rest} className={envisTwMerge('', className)}>
      <BaseLink href={slug} className="group flex flex-col gap-2 pb-6">
        {(heroImage?.image?.asset || fallbackImage || thumbnailUrl) && (
          <div className="aspect-video relative max-h-[324px] mb-2">
            {thumbnailUrl ? (
              <img
                className="relative rounded-xs h-full w-full"
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
                  priority
                  aspectRatio={Ratios.NINE_TO_SIXTEEN}
                  sizes="(max-width: 800px) 100vw, 800px"
                  fill
                  className="rounded-xs"
                />
              )
            )}
          </div>
        )}
        {publishDateTime && (
          <div>
            <FormattedDate datetime={publishDateTime} uppercase className="text-2xs font-normal leading-normal" />
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
          <Typography as="h2" variant="md" className="group-hover:underline">
            {title}
          </Typography>
        )}
        {Array.isArray(ingress) ? (
          <Blocks value={ingress} className="text-sm max-w-prose" />
        ) : (
          <Typography variant="body" className="text-sm max-w-prose`">
            {ingress}
          </Typography>
        )}
      </BaseLink>
    </section>
  )
})
export default NewsHeadliner
