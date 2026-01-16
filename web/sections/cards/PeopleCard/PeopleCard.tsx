import { ProfilePageJsonLd } from 'next-seo'
import { forwardRef, type HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import BaseLink from '@/core/Link/BaseLink'
import ResourceLink from '@/core/Link/ResourceLink'
import { Typography } from '@/core/Typography'
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction'
import { urlForImage } from '@/sanity/lib/utils'
import {
  type ColorKeys,
  colorKeyToUtilityMap,
} from '@/styles/colorKeyToUtilityMap'
import { Image } from '../../../core/Image/Image'
import { getLocaleFromName } from '../../../sanity/helpers/localization'
import type { PeopleCardData } from '../../../types/index'

export type PeopleCardProps = {
  data: PeopleCardData
  background?: ColorKeys
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
      background,
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

    const variantClassNames = {
      default: `w-full flex gap-4 lg:gap-8 lg:flex-col `,
      single: `w-full lg:w-fit flex flex-col lg:flex-row gap-8 lg:gap-12`,
    }
    const variantContentClassNames = {
      default: `justify-center items-start lg:items-center *:text-center`,
      single: `justify-center items-center lg:items-start`,
    }

    return (
      <>
        <div
          ref={ref}
          className={twMerge(
            `grid h-full items-center justify-center ${variantClassNames[variant]} focus-visible:envis-outline dark:focus-visible:envis-outline-invert rounded-card px-6 py-8 text-slate-80 focus:outline-hidden dark:text-white-100 ${colorKeyToUtilityMap[background ?? 'gray-20'].background}`,
            className,
          )}
        >
          {image && (
            <Image
              image={image}
              grid='xs'
              aspectRatio='1:1'
              className={`${variant === 'single' ? 'size-64' : 'size-40'}`}
              imageClassName='rounded-full'
            />
          )}
          <div className={`flex flex-col ${variantContentClassNames[variant]}`}>
            <Typography
              as={hasSectionTitle ? 'h3' : 'h2'}
              variant={`${variant === 'single' ? 'md' : 'sm'}`}
              className='mb-4 font-medium'
            >
              {name}
            </Typography>
            {title && (
              <div className='text-pretty text-slate-80 text-sm dark:text-white-100'>
                {title}
              </div>
            )}
            {department && (
              <div className='mt-2 text-pretty text-slate-80 text-sm dark:text-white-100'>
                {department}
              </div>
            )}
            {isLink && cv && cvUrl ? (
              <ResourceLink
                href={cvUrl}
                hrefLang={
                  cv?.type === 'internalUrl'
                    ? getLocaleFromName(cv?.link?.lang)
                    : undefined
                }
                variant='fit'
                className='mt-4'
              >
                {cv?.label}
              </ResourceLink>
            ) : (
              <div className='mt-4 flex flex-col items-center gap-1 text-center'>
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
