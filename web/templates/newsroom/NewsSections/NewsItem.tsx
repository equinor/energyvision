'use client'
import type { SanityImageObject } from '@sanity/image-url'
import NextImage from 'next/image'
import { useLocale } from 'next-intl'
import { forwardRef, type HTMLAttributes } from 'react'
import FormattedDateTime from '@/core/FormattedDateTime/FormattedDateTime'
import { Image } from '@/core/Image/Image'
import { getSmallerThanPxLgSizes } from '@/core/Image/imageUtilities'
import { BaseLink } from '@/core/Link/BaseLink'
import { Typography } from '@/core/Typography'
import { defaultLanguage } from '@/languageConfig'
import { getLocaleFromIso } from '@/sanity/helpers/localization'
import type { NewsRoomNewsItem } from '@/types/algoliaIndexPage'

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
  const lang = useLocale()
  const locale = getLocaleFromIso(lang)

  if (!slug) return null

  return (
    <section ref={ref} className={className}>
      <BaseLink
        href={`${locale !== defaultLanguage.locale ? `/${locale}` : ''}${slug}`}
        className='group flex justify-between gap-4 lg:gap-6'
      >
        <div className='max-w-[65%]'>
          {publishDateTime && (
            <div className='flex align-center'>
              <FormattedDateTime
                variant='date'
                datetime={publishDateTime}
                uppercase
                className='pb-1 font-normal text-2xs leading-normal'
              />
              <span className='mx-2 font-normal leading-normal'>|</span>
              <FormattedDateTime
                variant='time'
                datetime={publishDateTime}
                className='pb-1 font-normal text-2xs leading-normal'
              />
            </div>
          )}
          {title && (
            <Typography
              as='h2'
              variant='base'
              className='group-hover:underline'
            >
              {title}
            </Typography>
          )}
        </div>
        <div className='relative aspect-5/4 w-[30%] lg:aspect-video lg:h-full'>
          {(heroImage?.image?.asset || fallbackImage || thumbnailUrl) &&
            (thumbnailUrl ? (
              <NextImage
                className='relative rounded-2xs object-cover'
                src={thumbnailUrl}
                alt=''
                sizes={getSmallerThanPxLgSizes()}
                role={'presentation'}
              />
            ) : (
              (heroImage?.image?.asset || fallbackImage) && (
                <Image
                  //@ts-ignore: TODO Fix SanityImage to take SanityImageObject
                  image={
                    heroImage?.image?.asset ? heroImage?.image : fallbackImage
                  }
                  aria-hidden
                  grid='xs'
                  fill
                  className='rounded-2xs'
                />
              )
            ))}
        </div>
      </BaseLink>
    </section>
  )
})
export default NewsItem
