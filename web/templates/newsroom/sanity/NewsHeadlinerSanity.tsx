import { FormattedDate } from '@components/FormattedDateTime'
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

const NewsHeadlinerSanity = forwardRef<HTMLLIElement, NewsHeadlinerProps>(function NewsHeadlinerSanity(
  { data, fallbackImage, className = '', ...rest },
  ref,
) {
  const { slug, title, ingress, publishDateTime, heroImage, tags, countryTags } = data

  return (
    <section ref={ref} {...rest} className={envisTwMerge('', className)}>
      <BaseLink href={slug} className="group flex flex-col gap-2 pb-6">
        {(heroImage?.image?.asset || fallbackImage) && (
          <div className="max-h-[212px] aspect-video md:aspect-video relative md:max-h-[324px] mb-2">
            <Image
              //@ts-ignore: TODO Fix SanityImage to take SanityImageObject
              image={heroImage?.image?.asset ? heroImage?.image : fallbackImage}
              fill
              priority
              aspectRatio={Ratios.NINE_TO_SIXTEEN}
              sizes="(max-width: 800px) 100vw, 1440px"
              className="rounded-xs"
              aria-hidden
            />
          </div>
        )}
        {publishDateTime && (
          <FormattedDate datetime={publishDateTime} uppercase className="pt-4 text-2xs font-normal leading-normal" />
        )}
        {title && (
          <Typography as="h2" variant="lg" className="pb-6 group-hover:underline">
            {title}
          </Typography>
        )}
        <div className="pb-2 flex flex-wrap gap-y-4 text-xs divide-x-2 divide-energy-red-100">
          {tags?.map((tag: any, i: number) => {
            return (
              <span
                key={tag.label}
                className=" text-xs inline-block text-grey-70 pl-3 pr-3 first:pl-0 whitespace-nowrap"
              >
                {tag.label}
                {i < tags.length - 1 && <span className="sr-only">,</span>}
              </span>
            )
          })}
          {countryTags?.length > 0 && <span className="sr-only">,</span>}
          {countryTags?.map((country: any, i: number) => {
            return (
              <span key={country.label} className=" inline-block text-grey-70 pl-3 pr-3 first:pl-0 whitespace-nowrap">
                {country.label}
                {i < countryTags.length - 1 && <span className="sr-only">,</span>}
              </span>
            )
          })}
        </div>
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
export default NewsHeadlinerSanity
