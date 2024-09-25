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
  search?: any
} & HTMLAttributes<HTMLLIElement>

const NewsHeadliner = forwardRef<HTMLLIElement, NewsHeadlinerProps>(function NewsHeadliner(
  { data, fallbackImage, className = '', search, ...rest },
  ref,
) {
  const { slug, title, ingress, publishDateTime, heroImage, tags, countryTags } = data
  console.log('tags', tags)
  return (
    <section ref={ref} {...rest} className={envisTwMerge('', className)}>
      <BaseLink href={slug} className="group flex flex-col gap-2 pb-6">
        {(heroImage?.image?.asset || fallbackImage) && (
          <div className="aspect-video relative max-h-[324px] mb-2">
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
          <FormattedDate datetime={publishDateTime} uppercase className="text-2xs font-normal leading-normal" />
        )}
        {title && (
          <Typography as="h2" variant="md" className="group-hover:underline">
            {title}
          </Typography>
        )}
        {ingress && (
          <Blocks value={ingress} className="text-sm max-w-prose" />
          /*           <Typography variant="body" className="text-sm max-w-prose`">
            {ingress}
          </Typography> */
        )}
        <div className="pt-8 flex gap-3 text-xs">
          {tags?.map((tag: any, i: number) => {
            const isInSearch = search?.topic?.some((tTag: any) => tTag === tag.label)
            return (
              <span
                key={tag.label}
                className={` ${isInSearch ? 'text-norwegian-woods-100 font-medium' : 'text-grey-60'}`}
              >
                {tag.label}
                {i < tags.length - 1 && <span className="sr-only">,</span>}
              </span>
            )
          })}
          {countryTags?.length > 0 && <span className="sr-only">,</span>}
          {countryTags?.map((country: any, i: number) => {
            const isInSearch = search?.country?.some((cTag: any) => cTag === country.label)
            return (
              <span
                key={country.label}
                className={`${isInSearch ? 'text-norwegian-woods-100 font-medium' : 'text-grey-60'}`}
              >
                {country.label}
                {i < countryTags.length - 1 && <span className="sr-only">,</span>}
              </span>
            )
          })}
        </div>
      </BaseLink>
    </section>
  )
})
export default NewsHeadliner
