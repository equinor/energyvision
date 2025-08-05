import { FormattedDate, FormattedTime } from '@/core/FormattedDateTime'
import { forwardRef, HTMLAttributes } from 'react'
import { BaseLink } from '@/core/Link'
import { Typography } from '@/core/Typography'
import Image, { getPxSmSizes, getSmallerThanPxLgSizes } from '../../../core/SanityImage/SanityImage'
import NextImage from 'next/image'
import envisTwMerge from '../../../twMerge'
import { NewsRoomNewsItem } from '../../../types/algoliaIndexPage'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import Blocks from '../../../portableText/Blocks'

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
          <div className="relative mb-2 aspect-video max-h-[324px]">
            {thumbnailUrl ? (
              <NextImage
                className="relative h-full w-full rounded-2xs object-cover"
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
                  aspectRatio="16:9"
                  sizes={getPxSmSizes()}
                  fill
                  className="rounded-2xs"
                />
              )
            )}
          </div>
        )}
        {publishDateTime && (
          <div>
            <FormattedDate datetime={publishDateTime} uppercase className="text-2xs leading-normal font-normal" />
            <span className="mx-2 pb-1 text-2xs leading-normal font-normal">|</span>
            <FormattedTime datetime={publishDateTime} className="pb-1 text-2xs leading-normal font-normal" />
          </div>
        )}
        {title && (
          <Typography as="h2" variant="md" className="group-hover:underline">
            {title}
          </Typography>
        )}
        {Array.isArray(ingress) ? (
          <Blocks value={ingress} className="max-w-prose text-sm" />
        ) : (
          <Typography variant="body" className="max-w-prose` text-sm">
            {ingress}
          </Typography>
        )}
      </BaseLink>
    </section>
  )
})
export default NewsHeadliner
