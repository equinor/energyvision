import type { SanityImageObject } from '@sanity/image-url'
import NextImage from 'next/image'
import { forwardRef, type HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import FormattedDateTime from '@/core/FormattedDateTime/FormattedDateTime'
import { BaseLink } from '@/core/Link/BaseLink'
import { Typography } from '@/core/Typography'
import { getSmallerThanPxLgSizes, Image } from '../../../core/Image/Image'
import Blocks from '../../../portableText/Blocks'
import type { NewsRoomNewsItem } from '../../../types/algoliaIndexPage'
import { defaultLanguage } from '@/languageConfig'
import { useLocale } from 'next-intl'
import { getLocaleFromIso } from '@/sanity/helpers/localization'

export type NewsHeadlinerProps = {
  data: NewsRoomNewsItem
  fallbackImage?: SanityImageObject
} & HTMLAttributes<HTMLLIElement>

const NewsHeadliner = forwardRef<HTMLLIElement, NewsHeadlinerProps>(
  function NewsHeadliner(
    { data, fallbackImage, className = '', ...rest },
    ref,
  ) {
    const { slug, title, ingress, publishDateTime, heroImage, thumbnailUrl } =
      data
    const lang = useLocale()
    const locale = getLocaleFromIso(lang)
    return (
      <section ref={ref} {...rest} className={twMerge('', className)}>
        <BaseLink href={`${locale!=defaultLanguage.locale? `/${locale}`: ""}${slug}`} className='group flex flex-col gap-2 pb-6'>
          {(heroImage?.image?.asset || fallbackImage || thumbnailUrl) && (
            <div className='relative mb-2 aspect-video max-h-[324px]'>
              {thumbnailUrl ? (
                <NextImage
                  className='relative h-full w-full rounded-2xs object-cover'
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
                    grid='sm'
                    fill
                    className='rounded-2xs'
                  />
                )
              )}
            </div>
          )}
          {publishDateTime && (
            <div className='flex align-center'>
              <FormattedDateTime
                variant='date'
                datetime={publishDateTime}
                uppercase
                className='font-normal text-2xs leading-normal pb-1'
              />
              <span className='mx-2 font-normal leading-normal'>
                |
              </span>
              <FormattedDateTime
                variant='time'
                datetime={publishDateTime}
                className='pb-1 font-normal text-2xs leading-normal'
              />
            </div>
          )}
          {title && (
            <Typography as='h2' variant='md' className='group-hover:underline'>
              {title}
            </Typography>
          )}
          {Array.isArray(ingress) ? (
            <Blocks value={ingress} className='max-w-prose text-sm' />
          ) : (
            <Typography variant='body' className='max-w-prose` text-sm'>
              {ingress}
            </Typography>
          )}
        </BaseLink>
      </section>
    )
  },
)
export default NewsHeadliner
