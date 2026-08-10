import { ProfilePageJsonLd } from 'next-seo'
import { forwardRef, type HTMLAttributes } from 'react'
import BaseLink from '@/core/Link/BaseLink'
import ResourceLink from '@/core/Link/ResourceLink'
import { Typography } from '@/core/Typography'
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction'
import { twMerge } from '@/lib/twMerge/twMerge'
import { urlForImage } from '@/sanity/lib/utils'
import { Image } from '../../../core/Image/Image'
import type { PeopleCardData } from '../../../types/index'

export type PeopleCardProps = {
  data: PeopleCardData
  //background?: ColorKeys
  hasSectionTitle: boolean
  variant?: 'default' | 'single'
} & HTMLAttributes<HTMLDivElement>

/**
 * People Card component.
 * Remember to wrap in ul and li if in a list.
 * */
const PeopleCard = forwardRef<HTMLDivElement, PeopleCardProps>(
  function PeopleCard(
    {
      data,
      //background,
      className = '',
      variant = 'default',
      hasSectionTitle = true,
    },
    ref,
  ) {
    const {
      name,
      image,
      title,
      department,
      isLink,
      phone,
      email,
      cv,
      enableStructuredMarkup,
    } = data

    const cvUrl = cv ? getUrlFromAction(cv) : ''
    const linkClassNames =
      'text-norwegian-woods-100 no-underline hover:underline text-sm'

    return (
      <>
        <div
          ref={ref}
          className={twMerge(
            `focus-visible:envis-outline dark:focus-visible:envis-outline-invert flex h-full w-full items-center justify-start rounded-sm bg-white-100 px-6 py-8 text-slate-80 shadow-card focus:outline-hidden dark:text-white-100`,
            variant === 'default' &&
              'items-start gap-4 lg:flex-col lg:items-center lg:gap-8',
            variant === 'single' &&
              'flex-col gap-8 lg:w-fit lg:flex-row lg:gap-12',
            className,
          )}
        >
          {image && (
            <div className='aspect-square w-24 shrink-0 self-start overflow-hidden rounded-full sm:w-28 lg:w-32 lg:self-center'>
              <Image
                image={image}
                fill
                grid='xs'
                aspectRatio='1:1'
                keepRatioOnMobile
                className='h-full w-full'
                imageClassName='h-full w-full object-cover'
              />
            </div>
          )}
          <div
            className={twMerge(
              `flex flex-col items-start justify-center gap-3`,
              variant === 'default' &&
                'lg:items-center lg:justify-center lg:*:text-center',
              variant === 'single' && 'lg:items-start',
            )}
          >
            <Typography
              as={hasSectionTitle ? 'h3' : 'h2'}
              variant={`${variant === 'single' ? 'md' : 'sm'}`}
              className='font-medium'
            >
              {name}
            </Typography>
            {title && (
              <div className='text-balance text-slate-80 text-sm dark:text-white-100'>
                {title}
              </div>
            )}
            {department && (
              <div className='text-balance text-slate-80 text-sm dark:text-white-100'>
                {department}
              </div>
            )}
            {isLink && cv && cvUrl ? (
              <ResourceLink
                href={cvUrl}
                hrefLang={
                  cv?.type === 'internalUrl'
                    ? link?.lang
                    : undefined
                }
                variant='fit'
                className='m-0 mt-2 p-0'
              >
                {cv?.label}
              </ResourceLink>
            ) : (
              <div
                className={twMerge(
                  `flex flex-col gap-1`,
                  variant === 'default' && 'tems-start lg:lg:items-center',
                  variant === 'single' && 'items-center',
                )}
              >
                {email && (
                  <BaseLink href={`mailto:${email}`} className={linkClassNames}>
                    {email}
                  </BaseLink>
                )}
                {phone && (
                  <BaseLink href={`tel:${phone}`} className={linkClassNames}>
                    {phone}
                  </BaseLink>
                )}
              </div>
            )}
          </div>
        </div>
        {enableStructuredMarkup && (
          <ProfilePageJsonLd
            mainEntity={{
              name: name,
              ...(image && { image: urlForImage(image)?.toString() }),
            }}
          />
        )}
      </>
    )
  },
)
export default PeopleCard
